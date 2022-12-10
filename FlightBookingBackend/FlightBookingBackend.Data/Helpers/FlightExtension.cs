using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightBookingBackend.Data.Models;

namespace FlightBookingBackend.Data.Helpers
{
    public static class FlightExtension
    {
        public static IQueryable<Flight> Search(this IQueryable<Flight> query, string flyingFrom, 
            string flyingTo)
        {
            if (string.IsNullOrEmpty(flyingFrom) || string.IsNullOrEmpty(flyingTo))
            {
                return query;
            }

            var flyingFromCity = flyingFrom.Trim().ToLower();
            var flyingToCity = flyingTo.Trim().ToLower();

            return query.Where(f => f.FlyingFrom.Name == flyingFromCity && f.FlyingTo.Name == flyingToCity);
        }

        public static IQueryable<Flight> Filter(this IQueryable<Flight> query, string layover)
        {
            bool successful = int.TryParse(layover, out int layoverNumber);

            if (!successful)
            {
                return query;
            }

            return query.Where(f => f.LayoverNumber == layoverNumber);
        }
    }
}