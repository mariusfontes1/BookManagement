using BookManagement.Core.Entities;
using BookManagement.Core.Interfaces;
using BookManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BookManagement.Infrastructure.Repositories;

public class LivroRepository : ILivroRepository
{
    private readonly AppDbContext _context;

    public LivroRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Livro>> GetAllAsync()
    {
        return await _context.Livros
            .OrderByDescending(l => l.DataCriacao)
            .ToListAsync();
    }

    public async Task<Livro?> GetByIdAsync(int id)
    {
        return await _context.Livros
            .FirstOrDefaultAsync(l => l.Id == id);
    }

    public async Task<Livro> CreateAsync(Livro livro)
    {
        livro.DataCriacao = DateTime.UtcNow;
        _context.Livros.Add(livro);
        await _context.SaveChangesAsync();
        return livro;
    }

    public async Task<Livro?> UpdateAsync(int id, Livro livro)
    {
        var existingLivro = await _context.Livros.FindAsync(id);

        if (existingLivro == null)
            return null;

        existingLivro.Titulo = livro.Titulo;
        existingLivro.Autor = livro.Autor;
        existingLivro.Genero = livro.Genero;
        existingLivro.Ano = livro.Ano;
        existingLivro.DataAtualizacao = DateTime.UtcNow;

        _context.Entry(existingLivro).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return existingLivro;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var livro = await _context.Livros.FindAsync(id);

        if (livro == null)
            return false;

        _context.Livros.Remove(livro);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Livros.AnyAsync(l => l.Id == id);
    }
}