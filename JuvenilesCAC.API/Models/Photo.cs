using System;

namespace JuvenilesCAC.API.Models
{
    public class Photo
    {
        public int Id { get; set; } 
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool Main { get; set; }
        public Player Player { get; set; }
        public int PlayerId { get; set; }
    }
}