using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FlightBookingBackend.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace FlightBookingBackend.Data
{
    public class FlightBookingDbContext : DbContext
    {
        public FlightBookingDbContext(DbContextOptions<FlightBookingDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // optionsBuilder.LogTo(Console.WriteLine);
            // optionsBuilder.EnableSensitiveDataLogging(true);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().Property(u => u.Username).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.PasswordHash).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.PasswordSalt).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Role).IsRequired();

            modelBuilder.Entity<City>().Property(c => c.Name).IsRequired();

            modelBuilder.Entity<Flight>().Property(f => f.Date).IsRequired();
            modelBuilder.Entity<Flight>().Property(f => f.NumberOfSeats).IsRequired();
            modelBuilder.Entity<Flight>().Property(f => f.LayoverNumber).IsRequired();
            modelBuilder.Entity<Flight>().Property(f => f.Status)
                .HasConversion(f => f.ToString(), t => (FlightStatus)Enum.Parse(typeof(FlightStatus), t));
            modelBuilder.Entity<Flight>().HasOne(f => f.FlyingFrom).WithMany()
                .HasForeignKey(f => f.FlyingFromId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Flight>().HasOne(f => f.FlyingTo).WithMany()
                .HasForeignKey(f => f.FlyingToId).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Reservation>().Property(r => r.NumberOfSeats).IsRequired();
            modelBuilder.Entity<Reservation>().Property(r => r.Status)
                .HasConversion(r => r.ToString(), t => (ReservationStatus)Enum.Parse(typeof(ReservationStatus), t));
            modelBuilder.Entity<Reservation>().HasOne(r => r.User).WithMany()
                .HasForeignKey(r => r.UserId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Reservation>().HasOne(r => r.Flight).WithMany()
                .HasForeignKey(r => r.FlightId).OnDelete(DeleteBehavior.Restrict);
        }

    }
}
