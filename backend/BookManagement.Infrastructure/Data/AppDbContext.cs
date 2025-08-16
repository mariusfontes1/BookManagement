using BookManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookManagement.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Livro> Livros { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuração da entidade Livro
        modelBuilder.Entity<Livro>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd();

            entity.Property(e => e.Titulo)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.Autor)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(e => e.Genero)
                .IsRequired()
                .HasMaxLength(50);

            entity.Property(e => e.Ano)
                .IsRequired();

            entity.Property(e => e.DataCriacao)
                .IsRequired();

            entity.Property(e => e.DataAtualizacao)
                .IsRequired(false);

            // Índices para melhorar performance (opcional para InMemory)
            entity.HasIndex(e => e.Titulo);
            entity.HasIndex(e => e.Autor);
            entity.HasIndex(e => e.Genero);
        });
    }
}