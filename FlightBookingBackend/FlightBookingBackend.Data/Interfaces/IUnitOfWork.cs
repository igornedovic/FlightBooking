using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightBookingBackend.Data.Interfaces
{
    public interface IUnitOfWork
    {
        public IUserRepository UserRepository { get; set; }
        public ICityRepository CityRepository { get; set; }
        public IFlightRepository FlightRepository { get; set; }
        public IReservationRepository ReservationRepository { get; set; }
        public Task<bool> CommitAsync();
    }
}