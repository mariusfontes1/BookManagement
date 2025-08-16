using System.ComponentModel.DataAnnotations;

namespace BookManagement.Core.Entities;

public class Livro
{
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Titulo { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Autor { get; set; } = string.Empty;

    [Required]
    [StringLength(50)]
    public string Genero { get; set; } = string.Empty;

    [Range(1, int.MaxValue, ErrorMessage = "O ano deve ser maior que 0")]
    public int Ano { get; set; }

    public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
    public DateTime? DataAtualizacao { get; set; }
}
