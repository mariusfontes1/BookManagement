using System.ComponentModel.DataAnnotations;

namespace BookManagement.Core.DTOs
{

    public class CreateLivroDTO
    {
        [Required(ErrorMessage = "O título é obrigatório")]
        [StringLength(200, ErrorMessage = "O título deve ter no máximo 200 caracteres")]
        public string Titulo { get; set; } = string.Empty;

        [Required(ErrorMessage = "O autor é obrigatório")]
        [StringLength(100, ErrorMessage = "O autor deve ter no máximo 100 caracteres")]
        public string Autor { get; set; } = string.Empty;

        [Required(ErrorMessage = "O gênero é obrigatório")]
        [StringLength(50, ErrorMessage = "O gênero deve ter no máximo 50 caracteres")]
        public string Genero { get; set; } = string.Empty;

        [Range(1, int.MaxValue, ErrorMessage = "O ano deve ser maior que 0")]
        public int Ano { get; set; }
    }

}
