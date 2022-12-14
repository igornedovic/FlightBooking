using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlightBookingBackend.Data.DTOs
{
    public class ReservationReadDto
    {
        [Required]
        public int ReservationId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string FlyingFromName { get; set; }
        [Required]
        public string FlyingToName { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string FlightStatus { get; set; }
        [Required]
        public int NumberOfSeats { get; set; }
        [Required]
        public string Status { get; set; }
        public int FlightId {get; set;}
    }
}