using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data.DTOs;
using FlightBookingBackend.Data.Interfaces;
using FlightBookingBackend.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlightBookingBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserService _userService;
        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        // POST api/account/register
        [HttpPost("register")]
        [Authorize(Roles = Roles.Administrator)] 
        public async Task<ActionResult<UserReadDto>> Register(UserCreateDto userCreateDto)
        {
            if (await _userService.CheckUsernameAsync(userCreateDto.Username))
            {
                return BadRequest("This username already exists!");
            }

            var registeredUser = await _userService.RegisterAsync(userCreateDto);

            if (registeredUser == null)
            {
                return BadRequest("Failed to register a new user!");
            }

            return Ok(registeredUser);
        }

        // POST api/account/login
        [HttpPost("login")]
        public async Task<ActionResult<UserReadDto>> Login(LoginDto loginDto)
        {
            var loggedInUser = await _userService.LoginAsync(loginDto.Username, loginDto.Password);

            if (loggedInUser == null)
            {
                return Unauthorized("Wrong credentials: Invalid username or password!");
            }

            return Ok(loggedInUser);
        }

    }
}