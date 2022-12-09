using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightBookingBackend.Data.DTOs
{
    public class FlightReadDto
    {
        public int FlightId { get; set; }
        public DateTime Date { get; set; }
        public int NumberOfSeats { get; set; }
        public int LayoverNumber { get; set; }
        public string Status { get; set; }
        public string FlyingFromName { get; set; }
        public string FlyingToName { get; set; }
    }
}