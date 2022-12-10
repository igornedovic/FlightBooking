using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data.DTOs;

namespace FlightBookingBackend.Data.Interfaces
{
    public interface IFlightService
    {
        public Task<List<FlightReadDto>> GetFlightsAsync(FlightQueryParams queryParams);
        public Task<FlightReadDto> AddFlightAsync(FlightCreateDto flightCreateDto);
        public Task<bool> ChangeFlightStatusToCancelAsync(int id);
    }
}