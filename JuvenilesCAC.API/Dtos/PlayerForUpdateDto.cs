using System;

namespace JuvenilesCAC.API.Dtos
{
    public class PlayerForUpdateDto
    {
        public string Surname { get; set; }
        public string Names { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? DateOfJoin { get; set; }
        public double? Height { get; set; }
    }
}