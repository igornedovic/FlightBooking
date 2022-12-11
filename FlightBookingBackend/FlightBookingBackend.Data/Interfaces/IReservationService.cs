using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data.DTOs;

namespace FlightBookingBackend.Data.Interfaces
{
    public interface IReservationService
    {
        public Task<List<ReservationReadDto>> GetReservationsAsync();
        public Task<ReservationReadDto> AddReservationAsync(ReservationCreateDto reservationCreateDto);
    }
}