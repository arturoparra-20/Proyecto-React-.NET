using PeliculasAPI.Validaciones;
using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.DTOs
{
    public class GeneroCreacionDTO
    {
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [PrimerLetraMayuscula]
        [StringLength(maximumLength: 50)]
        public string Nombre { get; set; }
    }
}
