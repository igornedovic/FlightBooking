using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlightBookingBackend.Data.DTOs
{
    public class FlightCreateDto
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public int NumberOfSeats { get; set; }
        [Required]
        public int LayoverNumber { get; set; }
        [Required]
        public string Status { get; set; } = "Active";
        [Required]
        public int FlyingFromId { get; set; }
        [Required]
        public int FlyingToId { get; set; }
    }
}