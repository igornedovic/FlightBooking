using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data;
using FlightBookingBackend.Data.Interfaces;
using FlightBookingBackend.Services.Repositories;

namespace FlightBookingBackend.Services.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly FlightBookingDbContext _context;

        public UnitOfWork(FlightBookingDbContext context)
        {
            _context = context;
            UserRepository = new UserRepository(_context);
            CityRepository = new CityRepository(_context);
            FlightRepository = new FlightRepository(_context);
        }
        public IUserRepository UserRepository { get; set; }
        public ICityRepository CityRepository { get; set; }
        public IFlightRepository FlightRepository { get; set; }

        public async Task<bool> CommitAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}