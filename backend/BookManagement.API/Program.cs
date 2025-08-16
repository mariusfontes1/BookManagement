using BookManagement.Core.Interfaces;
using BookManagement.Infrastructure.Data;
using BookManagement.Infrastructure.Repositories;
using BookManagement.Services.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Entity Framework with InMemoryDatabase
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("BookManagementDb"));

// Configure Dependency Injection
builder.Services.AddScoped<ILivroRepository, LivroRepository>();
builder.Services.AddScoped<ILivroService, LivroService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

// CORS - DEVE vir ANTES de UseAuthorization
app.UseCors();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Seed initial data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    SeedData(context);
}

Console.WriteLine("API iniciada!");
Console.WriteLine("Swagger: https://localhost:7000/swagger");

app.Run();

static void SeedData(AppDbContext context)
{
    if (!context.Livros.Any())
    {
        context.Livros.AddRange(
            new BookManagement.Core.Entities.Livro
            {
                Titulo = "Clean Code",
                Autor = "Robert C. Martin",
                Genero = "Tecnologia",
                Ano = 2008,
                DataCriacao = DateTime.UtcNow
            },
            new BookManagement.Core.Entities.Livro
            {
                Titulo = "O Senhor dos Anéis",
                Autor = "J.R.R. Tolkien",
                Genero = "Fantasia",
                Ano = 1954,
                DataCriacao = DateTime.UtcNow
            },
            new BookManagement.Core.Entities.Livro
            {
                Titulo = "1984",
                Autor = "George Orwell",
                Genero = "Ficção Científica",
                Ano = 1949,
                DataCriacao = DateTime.UtcNow
            }
        );
        context.SaveChanges();
    }
}