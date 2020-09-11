using System;
using System.ComponentModel.DataAnnotations;

namespace JuvenilesCAC.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "La contraseña debe tener entre 4 y 8 caracteres")]
        public string password { get; set; }
        //[Required]
        public string Name { get; set; }
        //[Required]
        public string Surname { get; set; }
        [Required]
        public string Gender { get; set; }        
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}