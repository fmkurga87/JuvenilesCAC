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
    }
}