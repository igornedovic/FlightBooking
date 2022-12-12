using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlightBookingBackend.Data.DTOs
{
    public class ReservationCreateDto
    {
        [Required]
        public int NumberOfSeats { get; set; }
        [Required]
        public string Status { get; set; } = "Pending";
        [Required]
        public int UserId { get; set; }
        [Required]
        public int FlightId { get; set; }
    }
}