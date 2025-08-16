﻿using BookManagement.Core.Entities;

namespace BookManagement.Core.Interfaces;

public interface ILivroRepository
{
    Task<IEnumerable<Livro>> GetAllAsync();
    Task<Livro?> GetByIdAsync(int id);
    Task<Livro> CreateAsync(Livro livro);
    Task<Livro?> UpdateAsync(int id, Livro livro);
    Task<bool> DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}