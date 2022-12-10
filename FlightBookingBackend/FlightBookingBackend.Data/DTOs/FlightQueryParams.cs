using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightBookingBackend.Data.DTOs
{
    public class FlightQueryParams
    {
        public string FlyingFrom { get; set; }
        public string FlyingTo { get; set; }
        public string LayoverNumber { get; set; }
    }
}