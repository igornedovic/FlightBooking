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
    public class FlightsController : ControllerBase
    {
        private readonly IFlightService _flightService;
        public FlightsController(IFlightService flightService)
        {
            _flightService = flightService;
        }

        // GET api/flights
        [HttpGet]
        public async Task<ActionResult<List<FlightReadDto>>> GetAllFlights()
        {
            var flights = await _flightService.GetAllFlightsAsync();

            if (flights == null || flights.Count == 0) return NotFound("No existing flights found!");

            return Ok(flights);
        }

        // POST api/flights
        [HttpPost]
        public async Task<ActionResult<FlightReadDto>> AddFlight(FlightCreateDto flightCreateDto)
        {
            var newFlight = await _flightService.AddFlightAsync(flightCreateDto);

            if (newFlight == null) return BadRequest("Failed to add a new flight!");

            return Ok(newFlight);
        }

        // PUT api/flights/{id}/cancel
        [HttpPut("{id}/cancel")]
        public async Task<ActionResult> UpdateStatus(int id)
        {
            if (await _flightService.ChangeFlightStatusToCancelAsync(id))
                return Ok("Successfully changed flight status!");

            return BadRequest("Failed to change flight status!");
        }
    }
}