using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightBookingBackend.Data.Models
{
    public enum ReservationStatus
    {
        Pending,
        Rejected,
        Accepted
    }
    public class Reservation
    {
        public int ReservationId { get; set; }
        public int NumberOfSeats { get; set; }
        public ReservationStatus Status { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int FlightId { get; set; }
        public Flight Flight { get; set; }
    }
}