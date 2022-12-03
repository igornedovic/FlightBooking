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
    }
}