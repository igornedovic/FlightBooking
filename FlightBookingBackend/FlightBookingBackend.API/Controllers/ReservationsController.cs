using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data.DTOs;
using FlightBookingBackend.Data.Interfaces;
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
        public async Task<ActionResult<List<ReservationReadDto>>> GetReservations()
        {
            var reservations = await _reservationService.GetReservationsAsync();

            if (reservations == null || reservations.Count == 0) 
                return NotFound("No existing reservations found!");

            return Ok(reservations);
        }

        // POST api/reservations
        [HttpPost]
        public async Task<ActionResult<ReservationReadDto>> AddReservation(
            ReservationCreateDto reservationCreateDto)
        {
            var newReservation = await _reservationService.AddReservationAsync(reservationCreateDto);

            if (newReservation == null) return BadRequest("Failed to add a new reservation!");

            return Ok(newReservation);
        }

        // PUT api/reservations/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStatus(int id, NewStatusDto newStatusDto)
        {
            if (await _reservationService.ChangeReservationStatusAsync(id, newStatusDto.NewStatus))
                return Ok("Successfully changed reservation status!");
            
            return BadRequest("Failed to change reservation status!");
        }
    }
}