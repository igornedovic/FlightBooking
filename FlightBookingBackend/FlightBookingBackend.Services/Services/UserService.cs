using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using FlightBookingBackend.Data.DTOs;
using FlightBookingBackend.Data.Interfaces;
using FlightBookingBackend.Data.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FlightBookingBackend.Services.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public UserService(IUnitOfWork unitOfWork, IMapper mapper, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;
        }

        public async Task<bool> CheckUsernameAsync(string username)
        {
            return await _unitOfWork.UserRepository.CheckUsernameAsync(username);
        }

        public async Task<UserReadDto> RegisterAsync(UserCreateDto userCreateDto)
        {
            using var hmac = new HMACSHA512();

            var user = _mapper.Map<User>(userCreateDto);

            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userCreateDto.Password));
            user.PasswordSalt = hmac.Key;

            _unitOfWork.UserRepository.Create(user);

            if (await _unitOfWork.CommitAsync())
            {
                return _mapper.Map<UserReadDto>(user);
            }

            return null;
        }

        public async Task<UserReadDto> LoginAsync(string username, string password)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            if (user == null)
            {
                return null;
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return null;
            }

            var token = CreateToken(user);

            var loggedInUser = _mapper.Map<UserReadDto>(user);
            loggedInUser.Token = token;

            return loggedInUser;
        }

        private string CreateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_config["Secret:Key"]);
  
            Claim[] claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims, JwtBearerDefaults.AuthenticationScheme),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public async Task<List<UserReadDto>> GetAllUsersByAdminAsync()
        {
            var users = await _unitOfWork.UserRepository.GetAllUsersByAdminAsync();

            if (users == null) return null;

            return _mapper.Map<List<UserReadDto>>(users);
        }
    }
}