using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data.Models;

namespace FlightBookingBackend.Data.Interfaces
{
    public interface IFlightRepository
    {
        public void AddFlight(Flight flight);
    }
}