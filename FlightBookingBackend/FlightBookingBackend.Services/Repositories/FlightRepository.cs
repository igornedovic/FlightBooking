using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data;
using FlightBookingBackend.Data.DTOs;
using FlightBookingBackend.Data.Helpers;
using FlightBookingBackend.Data.Interfaces;
using FlightBookingBackend.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace FlightBookingBackend.Services.Repositories
{
    public class FlightRepository : IFlightRepository
    {
        private readonly FlightBookingDbContext _context;
        public FlightRepository(FlightBookingDbContext context)
        {
            _context = context;
        }

        public IQueryable<Flight> GetSearchAndFilterQuery(FlightQueryParams queryParams)
        {
            return _context.Flights.Include(f => f.FlyingFrom)
                                   .Include(f => f.FlyingTo)
                                   .Where(f => f.NumberOfSeats > 0)
                                   .Search(queryParams.FlyingFrom, queryParams.FlyingTo)
                                   .Filter(queryParams.LayoverNumber);
        }

        public async Task<List<Flight>> GetFlightsAsync(IQueryable<Flight> query)
        {
            return await query.ToListAsync();
        }

        public async Task<Flight> GetFlightByIdAsync(int id)
        {
            return await _context.Flights.Include(f => f.FlyingFrom)
                                         .Include(f => f.FlyingTo)
                                         .SingleOrDefaultAsync(f => f.FlightId == id);
        }

        public void AddFlight(Flight flight)
        {
            _context.Add(flight);
        }

        public void ChangeFlightStatusToCancel(Flight flightToCancel)
        {
            _context.Update(flightToCancel);
        }
    }
}