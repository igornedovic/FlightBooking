using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data.Models;

namespace FlightBookingBackend.Data.Interfaces
{
    public interface IFlightRepository
    {
        public Task<List<Flight>> GetAllFlightsAsync();
        public Task<Flight> GetFlightByIdAsync(int id);
        public void AddFlight(Flight flight);
        public void ChangeFlightStatusToCancel(Flight flightToCancel);
    }
}