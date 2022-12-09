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
    public class CityRepository : ICityRepository
    {
        private readonly FlightBookingDbContext _context;
        public CityRepository(FlightBookingDbContext context)
        {
            _context = context;
            
        }
        public async Task<List<City>> GetAllCitiesAsync()
        {
            return await _context.Cities.ToListAsync();
        }
    }
}