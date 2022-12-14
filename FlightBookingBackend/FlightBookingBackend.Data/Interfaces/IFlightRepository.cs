using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data.DTOs;
using FlightBookingBackend.Data.Models;

namespace FlightBookingBackend.Data.Interfaces
{
    public interface IFlightRepository
    {
        public IQueryable<Flight> GetSearchAndFilterQuery(FlightQueryParams queryParams);
        public Task<List<Flight>> GetFlightsAsync(IQueryable<Flight> query);
        public Task<Flight> GetFlightByIdAsync(int id);
        public void AddFlight(Flight flight);
        public void ChangeFlightStatusToCancel(Flight flightToCancel);
        public void UpdateFlightTotalNumberOfSeats(Flight flightToUpdate);
    }
}