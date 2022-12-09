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
        }

    }
}
