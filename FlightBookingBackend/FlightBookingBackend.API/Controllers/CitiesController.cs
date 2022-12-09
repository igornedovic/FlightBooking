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
    public class CitiesController : ControllerBase
    {
        private readonly ICityService _cityService;
        public CitiesController(ICityService cityService)
        {
            _cityService = cityService;           
        }

        // GET api/cities
        [HttpGet]
        public async Task<ActionResult<List<CityReadDto>>> GetAllCities()
        {
            var cities = await _cityService.GetAllCitiesAsync();

            if (cities == null || cities.Count == 0) return NotFound("No cities found!");

            return Ok(cities);
        }
    }
}