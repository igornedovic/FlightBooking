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

        // POST api/flights
        public async Task<ActionResult<FlightReadDto>> AddFlight(FlightCreateDto flightCreateDto)
        {
            var newFlight = await _flightService.AddFlightAsync(flightCreateDto);

            if (newFlight == null) return BadRequest("Failed to add a new flight");

            return Ok(newFlight);
        }
    }
}