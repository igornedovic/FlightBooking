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
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationService _reservationService;
        public ReservationsController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        // GET api/reservations
        [HttpGet]
        [Authorize(Roles = Roles.Agent)]
        public async Task<ActionResult<List<ReservationReadDto>>> GetReservations()
        {
            var reservations = await _reservationService.GetReservationsAsync();

            if (reservations == null || reservations.Count == 0)
                return NotFound("No existing reservations found!");

            return Ok(reservations);
        }

        // POST api/reservations
        [HttpPost]
        [Authorize(Roles = Roles.Visitor)]
        public async Task<ActionResult<ReservationReadDto>> AddReservation(
            ReservationCreateDto reservationCreateDto)
        {
            var newReservation = await _reservationService.AddReservationAsync(reservationCreateDto);

            if (newReservation == null) return BadRequest("Failed to add a new reservation!");

            return Ok(newReservation);
        }

        // PUT api/reservations/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = Roles.Agent)]
        public async Task<ActionResult> UpdateStatus(int id, NewStatusDto newStatusDto, int flightId, int numberOfSeats)
        {
            var newStatus = await _reservationService
                        .ChangeReservationStatusAsync(id, newStatusDto.NewStatus, flightId, numberOfSeats);
                                        
            if (newStatus == null)
                return BadRequest("Failed to change reservation status!");
            
            return Ok("Successfully changed reservation status!");
        }
    }
}