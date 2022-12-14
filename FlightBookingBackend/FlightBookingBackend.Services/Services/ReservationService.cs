using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FlightBookingBackend.Data.DTOs;
using FlightBookingBackend.Data.Interfaces;
using FlightBookingBackend.Data.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<List<ReservationReadDto>> GetReservationsAsync()
        {
            var query = _unitOfWork.ReservationRepository.GetReservations();

            return await _mapper.ProjectTo<ReservationReadDto>(query).ToListAsync();
        }

        public async Task<List<ReservationReadDto>> GetReservationsByUserAsync(int userId)
        {
            var query = _unitOfWork.ReservationRepository.GetReservationsByUser(userId);

            return await _mapper.ProjectTo<ReservationReadDto>(query).ToListAsync();
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

        public async Task<string> ChangeReservationStatusAsync(int id, string newStatus)
        {
            var reservationToChange = await _unitOfWork.ReservationRepository.GetReservationByIdAsync(id);

            if (reservationToChange == null)
            {
                return null;
            }

            reservationToChange.Status = (ReservationStatus)Enum.Parse(typeof(ReservationStatus), newStatus);

            _unitOfWork.ReservationRepository.ChangeReservationStatus(reservationToChange);

            if (await _unitOfWork.CommitAsync())
            {
                return newStatus;
            }

            return null;
        }
    }
}