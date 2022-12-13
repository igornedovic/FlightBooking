using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data;
using FlightBookingBackend.Data.Interfaces;
using FlightBookingBackend.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace FlightBookingBackend.Services.Repositories
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly FlightBookingDbContext _context;
        public ReservationRepository(FlightBookingDbContext context)
        {
            _context = context;
        }

        public IQueryable<Reservation> GetReservations()
        {
            return _context.Reservations.Include(r => r.User)
                                        .Include(r => r.Flight)
                                        .ThenInclude(f => f.FlyingFrom)
                                        .Include(r => r.Flight)
                                        .ThenInclude(f => f.FlyingTo);

        }

        public IQueryable<Reservation> GetReservationsByUser(int userId)
        {
            return _context.Reservations.Include(r => r.User)
                            .Include(r => r.Flight)
                            .ThenInclude(f => f.FlyingFrom)
                            .Include(r => r.Flight)
                            .ThenInclude(f => f.FlyingTo)
                            .Where(r => r.UserId == userId);
        }

        public async Task<Reservation> GetReservationByIdAsync(int id)
        {
            return await _context.Reservations.FirstOrDefaultAsync(r => r.ReservationId == id);
        }

        public void AddReservation(Reservation reservation)
        {
            _context.Add(reservation);
        }

        public void ChangeReservationStatus(Reservation reservationToChange)
        {
            _context.Update(reservationToChange);
        }
    }
}