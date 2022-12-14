using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data.Models;

namespace FlightBookingBackend.Data.Interfaces
{
    public interface IUserRepository
    {
        public Task<bool> CheckUsernameAsync(string username);
        public void Create(User user);
        public Task<User> GetUserByIdAsync(int id);
        public Task<User> GetUserByUsernameAsync(string username);
        public IQueryable<User> GetUserByFirstNameAndLastNameAsync(string firstName, string lastName);
        public Task<List<User>> GetAllUsersByAdminAsync();
        public void AddHubConnectionIdToUser(User user);

    }
}