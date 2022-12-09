using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data;
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

        public async Task<List<Flight>> GetAllFlightsAsync()
        {
            return await _context.Flights.Include(f => f.FlyingFrom)
                                         .Include(f => f.FlyingTo)
                                         .ToListAsync();
        }

        public void AddFlight(Flight flight)
        {
            _context.Add(flight);
        }
    }
}