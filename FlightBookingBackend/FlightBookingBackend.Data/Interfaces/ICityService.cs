using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data.DTOs;

namespace FlightBookingBackend.Data.Interfaces
{
    public interface ICityService
    {
        public Task<List<CityReadDto>> GetAllCities();
    }
}