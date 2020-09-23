using System;

namespace JuvenilesCAC.API.Dtos
{
    public class PlayerForCreateDto
    {
        public string Surname { get; set; }
        public string Names { get; set; }
        public DateTime? DateOfBirth { get; set; }
    }
}