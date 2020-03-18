using JuvenilesCAC.API.Models;
using System;
using System.Collections.Generic;

namespace JuvenilesCAC.API.Dtos
{
    public class PlayerForDetailedDto
    {
        public int Id { get; set; }
        public string Surname { get; set; }
        public string Names { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int Age { get; set; }
        public DateTime? DateOfJoin { get; set; }
        public double? Height { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}