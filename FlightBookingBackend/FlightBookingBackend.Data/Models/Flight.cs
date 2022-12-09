using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightBookingBackend.Data.Models
{
    public enum FlightStatus
    {
        Cancelled,
        Active,   
    }

    public class Flight
    {
        public int FlightId { get; set; }
        public DateTime Date { get; set; }
        public int NumberOfSeats { get; set; }
        public int LayoverNumber { get; set; }
        public FlightStatus Status { get; set; }
        public int FlyingFromId { get; set; }
        public City FlyingFrom { get; set; }
        public int FlyingToId { get; set; }
        public City FlyingTo { get; set; }
    }
}