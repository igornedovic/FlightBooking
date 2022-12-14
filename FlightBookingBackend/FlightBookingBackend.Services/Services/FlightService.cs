using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FlightBookingBackend.Data.DTOs;
using FlightBookingBackend.Data.Interfaces;
using FlightBookingBackend.Data.Models;

namespace FlightBookingBackend.Services.Services
{
    public class FlightService : IFlightService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public FlightService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<FlightReadDto>> GetFlightsAsync(FlightQueryParams queryParams)
        {
            var query = _unitOfWork.FlightRepository.GetSearchAndFilterQuery(queryParams);

            var flights = await _unitOfWork.FlightRepository.GetFlightsAsync(query);

            if (flights == null)
            {
                return null;
            }

            return _mapper.Map<List<FlightReadDto>>(flights);
        }

        public async Task<FlightReadDto> AddFlightAsync(FlightCreateDto flightCreateDto)
        {
            var flight = _mapper.Map<Flight>(flightCreateDto);

            var flyingFromCity = await _unitOfWork.CityRepository.GetCityByIdAsync(flight.FlyingFromId);
            var flyingToCity = await _unitOfWork.CityRepository.GetCityByIdAsync(flight.FlyingToId);

            if (flyingFromCity == null || flyingToCity == null)
            {
                return null;
            }

            flight.FlyingFrom = flyingFromCity;
            flight.FlyingTo = flyingToCity;

            _unitOfWork.FlightRepository.AddFlight(flight);

            if (await _unitOfWork.CommitAsync())
            {
                return _mapper.Map<FlightReadDto>(flight);
            }

            return null;
        }

        public async Task<bool> ChangeFlightStatusToCancelAsync(int id)
        {
            var flightToCancel = await _unitOfWork.FlightRepository.GetFlightByIdAsync(id);

            if (flightToCancel == null)
            {
                return false;
            }

            flightToCancel.Status = FlightStatus.Cancelled;

            _unitOfWork.FlightRepository.ChangeFlightStatusToCancel(flightToCancel);

            if (await _unitOfWork.CommitAsync())
            {
                return true;
            }

            return false;
        }
    }
}