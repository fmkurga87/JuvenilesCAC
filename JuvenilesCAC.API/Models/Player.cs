using System;
using System.Collections.Generic;

namespace JuvenilesCAC.API.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Surname { get; set; }
        public string Names { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? DateOfJoin { get; set; }
        public double? Height { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Position> Positions { get; set; }

        //Ojo, esto deberia ser con FK
        //public string Localidad { get; set; }
    }
}