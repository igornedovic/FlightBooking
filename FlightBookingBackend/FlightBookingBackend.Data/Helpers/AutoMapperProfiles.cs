using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FlightBookingBackend.Data.DTOs;
using FlightBookingBackend.Data.Models;

namespace FlightBookingBackend.Data.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserCreateDto, User>();
            CreateMap<User, UserReadDto>();

            CreateMap<City, CityReadDto>();

            CreateMap<FlightCreateDto, Flight>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src =>
                    (FlightStatus)Enum.Parse(typeof(FlightStatus), src.Status)));

            CreateMap<Flight, FlightReadDto>()
                .ForMember(dest => dest.FlyingFromName, opt => opt.MapFrom(src =>
                    src.FlyingFrom.Name))
                .ForMember(dest => dest.FlyingToName, opt => opt.MapFrom(src =>
                    src.FlyingTo.Name));

            CreateMap<ReservationCreateDto, Reservation>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src =>
                    (ReservationStatus)Enum.Parse(typeof(ReservationStatus), src.Status)));

            CreateMap<Reservation, ReservationReadDto>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src =>
                    src.User.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src =>
                    src.User.LastName))
                .ForMember(dest => dest.FlyingFromName, opt => opt.MapFrom(src =>
                    src.Flight.FlyingFrom.Name))
                .ForMember(dest => dest.FlyingToName, opt => opt.MapFrom(src =>
                    src.Flight.FlyingTo.Name))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src =>
                    src.Flight.Date));
        }
    }
}