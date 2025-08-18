using BookManagement.Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace BookManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LivrosController : ControllerBase
{
    private readonly ILivroService _livroService;

    public LivrosController(ILivroService livroService)
    {
        _livroService = livroService;
    }

    /// <summary>
    /// Retorna a lista de todos os livros
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LivroDTO>>> GetLivros()
    {
        try
        {
            var livros = await _livroService.GetAllLivrosAsync();
            return Ok(livros);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
        }
    }

    /// <summary>
    /// Retorna os detalhes de um livro específico
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<LivroDTO>> GetLivro(int id)
    {
        try
        {
            var livro = await _livroService.GetLivroByIdAsync(id);

            if (livro == null)
            {
                return NotFound(new { message = $"Livro com ID {id} não encontrado" });
            }

            return Ok(livro);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
        }
    }

    /// <summary>
    /// Adiciona um novo livro
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<LivroDTO>> CreateLivro(CreateLivroDTO createLivroDTO)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var livro = await _livroService.CreateLivroAsync(createLivroDTO);
            return CreatedAtAction(nameof(GetLivro), new { id = livro.Id }, livro);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
        }
    }

    /// <summary>
    /// Atualiza as informações de um livro existente
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLivro(int id, UpdateLivroDTO updateLivroDTO)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var livroAtualizado = await _livroService.UpdateLivroAsync(id, updateLivroDTO);

            if (livroAtualizado == null)
            {
                return NotFound(new { message = $"Livro com ID {id} não encontrado" });
            }

            return Ok(livroAtualizado);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
        }
    }

    /// <summary>
    /// Exclui um livro
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLivro(int id)
    {
        try
        {
            var sucesso = await _livroService.DeleteLivroAsync(id);

            if (!sucesso)
            {
                return NotFound(new { message = $"Livro com ID {id} não encontrado" });
            }

            return Ok(new { message = $"Livro com ID {id} foi excluído com sucesso" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
        }
    }
}
