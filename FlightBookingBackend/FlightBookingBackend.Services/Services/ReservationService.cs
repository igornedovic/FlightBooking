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
    public class ReservationService : IReservationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ReservationService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<ReservationReadDto> AddReservationAsync(ReservationCreateDto reservationCreateDto)
        {
            var reservation = _mapper.Map<Reservation>(reservationCreateDto);

            var reservationUser = await _unitOfWork.UserRepository.GetUserByIdAsync(reservation.UserId);
            var reservationFlight = await _unitOfWork.FlightRepository.GetFlightByIdAsync(reservation.FlightId);

            if (reservationUser == null || reservationFlight == null)
            {
                return null;
            }

            reservation.User = reservationUser;
            reservation.Flight = reservationFlight;

            _unitOfWork.ReservationRepository.AddReservation(reservation);

            if (await _unitOfWork.CommitAsync())
            {
                return _mapper.Map<ReservationReadDto>(reservation);
            }

            return null;
        }
    }
}