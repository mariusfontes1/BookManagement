using BookManagement.Core.DTOs;
using BookManagement.Core.Entities;

public interface ILivroService
{
    Task<IEnumerable<LivroDTO>> GetAllLivrosAsync();
    Task<LivroDTO?> GetLivroByIdAsync(int id);
    Task<LivroDTO> CreateLivroAsync(CreateLivroDTO createLivroDTO);
    Task<LivroDTO?> UpdateLivroAsync(int id, UpdateLivroDTO updateLivroDTO);
    Task<bool> DeleteLivroAsync(int id);
}