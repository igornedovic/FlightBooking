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
        private readonly IReservationService _reservationService;
        public AccountController(IUserService userService, IReservationService reservationService)
        {
            _userService = userService;
            _reservationService = reservationService;
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

        // GET api/account/users
        [HttpGet("users")]
        [Authorize(Roles = Roles.Administrator)]
        public async Task<ActionResult<List<UserReadDto>>> GetAllUsersByAdmin()
        {
            var users = await _userService.GetAllUsersByAdminAsync();

            if (users == null || users.Count == 0) return NotFound("No existing users found!");

            return Ok(users);
        }

        // GET api/account/users/{userId}/reservations
        [HttpGet("users/{userId}/reservations")]
        [Authorize(Roles = Roles.Visitor)]
        public async Task<ActionResult<List<ReservationReadDto>>> GetReservationsByUser(int userId)
        {
            var reservations = await _reservationService.GetReservationsByUserAsync(userId);

            if (reservations == null || reservations.Count == 0)
                return NotFound("No existing reservations found for a given user!");

            return Ok(reservations);
        }

    }
}