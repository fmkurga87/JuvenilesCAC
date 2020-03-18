using System.Linq;
using AutoMapper;
using JuvenilesCAC.API.Models;
using JuvenilesCAC.API.Dtos;

namespace JuvenilesCAC.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Player, PlayerForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                        opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.Main).Url))
                .ForMember(dest => dest.Age, opt => 
                        opt.MapFrom(src => src.DateOfBirth.HasValue ? src.DateOfBirth.Value.CalculateAge() : 0));
            CreateMap<Player, PlayerForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                        opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.Main).Url))
                .ForMember(dest => dest.Age, opt => 
                        opt.MapFrom(src => src.DateOfBirth.HasValue ? src.DateOfBirth.Value.CalculateAge() : 0));
            CreateMap<Photo, PhotoForDetailedDto>();
        }
        
    }
}