using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data.DTOs;

namespace FlightBookingBackend.Data.Interfaces
{
    public interface IUserService
    {
        public Task<UserReadDto> RegisterAsync(UserCreateDto userCreateDto);
        public Task<bool> CheckUsernameAsync(string username);
        public Task<UserReadDto> LoginAsync(string username, string password);
        public Task<List<UserReadDto>> GetAllUsersByAdminAsync();
        public Task<bool> AddHubConnectionId(int userId, string connectionId);
        public Task<ConnectionIdDto> GetHubConnectionId(string firstName, string lastName);
    }
}