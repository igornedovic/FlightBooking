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
        }
    }
}