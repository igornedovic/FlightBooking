using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FlightBookingBackend.Data.DTOs;
using FlightBookingBackend.Data.Interfaces;

namespace FlightBookingBackend.Services.Services
{
    public class CityService : ICityService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CityService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;  
        }
        public async Task<List<CityReadDto>> GetAllCitiesAsync()
        {
            var cities = await _unitOfWork.CityRepository.GetAllCitiesAsync();

            if (cities == null) return null;

            return _mapper.Map<List<CityReadDto>>(cities);
        }
    }
}