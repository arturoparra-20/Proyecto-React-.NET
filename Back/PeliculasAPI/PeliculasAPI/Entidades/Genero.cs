using PeliculasAPI.Validaciones;
using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.Entidades
{
    public class Genero
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [PrimerLetraMayuscula]
        [StringLength(maximumLength:50)]
        public string Nombre { get; set; }

        public List<PeliculasGeneros>  PeliculasGeneros { get; set; }

     
    }
}
