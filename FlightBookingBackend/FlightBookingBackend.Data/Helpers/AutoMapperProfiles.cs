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
        }
    }
}