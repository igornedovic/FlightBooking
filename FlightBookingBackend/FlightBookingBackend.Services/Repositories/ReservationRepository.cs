using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data;
using FlightBookingBackend.Data.Interfaces;
using FlightBookingBackend.Data.Models;

namespace FlightBookingBackend.Services.Repositories
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly FlightBookingDbContext _context;
        public ReservationRepository(FlightBookingDbContext context)
        {
            _context = context;           
        }
        public void AddReservation(Reservation reservation)
        {
            _context.Add(reservation);
        }
    }
}