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

        // POST api/reservations
        [HttpPost]
        public async Task<ActionResult<ReservationReadDto>> AddReservation(
            ReservationCreateDto reservationCreateDto)
        {
            var newReservation = await _reservationService.AddReservationAsync(reservationCreateDto);

            if (newReservation == null) return BadRequest("Failed to add a new reservation!");

            return Ok(newReservation);
        }

    }
}