using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data.Models;

namespace FlightBookingBackend.Data.Interfaces
{
    public interface IReservationRepository
    {
        public IQueryable<Reservation> GetReservations();
        public IQueryable<Reservation> GetReservationsByUser(int userId);
        public void AddReservation(Reservation reservation);
    }
}