using BookManagement.Core.DTOs;
using BookManagement.Core.Entities;
using BookManagement.Core.Interfaces;

namespace BookManagement.Services.Services;

public class LivroService : ILivroService
{
    private readonly ILivroRepository _livroRepository;

    public LivroService(ILivroRepository livroRepository)
    {
        _livroRepository = livroRepository;
    }

    public async Task<IEnumerable<LivroDTO>> GetAllLivrosAsync()
    {
        var livros = await _livroRepository.GetAllAsync();
        return livros.Select(MapToDTO);
    }

    public async Task<LivroDTO?> GetLivroByIdAsync(int id)
    {
        var livro = await _livroRepository.GetByIdAsync(id);
        return livro != null ? MapToDTO(livro) : null;
    }

    public async Task<LivroDTO> CreateLivroAsync(CreateLivroDTO createLivroDTO)
    {
        var livro = new Livro
        {
            Titulo = createLivroDTO.Titulo,
            Autor = createLivroDTO.Autor,
            Genero = createLivroDTO.Genero,
            Ano = createLivroDTO.Ano
        };

        var livroCreated = await _livroRepository.CreateAsync(livro);
        return MapToDTO(livroCreated);
    }

    public async Task<LivroDTO?> UpdateLivroAsync(int id, UpdateLivroDTO updateLivroDTO)
    {
        var livro = new Livro
        {
            Titulo = updateLivroDTO.Titulo,
            Autor = updateLivroDTO.Autor,
            Genero = updateLivroDTO.Genero,
            Ano = updateLivroDTO.Ano
        };

        var livroUpdated = await _livroRepository.UpdateAsync(id, livro);
        return livroUpdated != null ? MapToDTO(livroUpdated) : null;
    }

    public async Task<bool> DeleteLivroAsync(int id)
    {
        return await _livroRepository.DeleteAsync(id);
    }

    private static LivroDTO MapToDTO(Livro livro)
    {
        return new LivroDTO
        {
            Id = livro.Id,
            Titulo = livro.Titulo,
            Autor = livro.Autor,
            Genero = livro.Genero,
            Ano = livro.Ano,
            DataCriacao = livro.DataCriacao,
            DataAtualizacao = livro.DataAtualizacao
        };
    }
}