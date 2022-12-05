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
    public class UserRepository : IUserRepository
    {
        private readonly FlightBookingDbContext _context;

        public UserRepository(FlightBookingDbContext context)
        {
            _context = context;
        }
        public async Task<bool> CheckUsernameAsync(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username);

            if (user == null) return false;

            return true;
        }

        public void Create(User user)
        {
            _context.Add(user);

        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Username == username);
        }

        public async Task<List<User>> GetAllUsersByAdminAsync()
        {
            return await _context.Users.Where(u => u.Role != Roles.Administrator).ToListAsync();
        }
    }
}