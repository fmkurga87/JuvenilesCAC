using System;

namespace JuvenilesCAC.API.Dtos
{
    public class PhotoForReturnDto
    {
        public int Id { get; set; } 
        public string Url { get; set; }
        public string Descripcion { get; set; }
        public DateTime Fecha { get; set; }
        public bool Principal { get; set; }
        public string PublicId { get; set; }
    }
}