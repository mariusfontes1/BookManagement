import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <div class="hero-section">
        <div class="hero-content">
          <h1>📚 Biblioteca Pessoal</h1>
          <p class="hero-subtitle">
            Organize e gerencie sua coleção de livros de forma simples e eficiente
          </p>
          
          <div class="features-grid">
            <div class="feature-card">
              <mat-icon>library_books</mat-icon>
              <h3>Catalogação</h3>
              <p>Adicione e organize todos os seus livros</p>
            </div>
            
            <div class="feature-card">
              <mat-icon>search</mat-icon>
              <h3>Busca Avançada</h3>
              <p>Encontre rapidamente por título, autor ou gênero</p>
            </div>
            
            <div class="feature-card">
              <mat-icon>edit</mat-icon>
              <h3>Edição Fácil</h3>
              <p>Atualize informações dos seus livros facilmente</p>
            </div>
            
            <div class="feature-card">
              <mat-icon>analytics</mat-icon>
              <h3>Estatísticas</h3>
              <p>Acompanhe suas estatísticas de leitura</p>
            </div>
          </div>
          
          <div class="cta-buttons">
            <button mat-raised-button color="primary" 
                    (click)="navigateToBooks()" 
                    class="cta-primary">
              <mat-icon>visibility</mat-icon>
              Ver Meus Livros
            </button>
            
            <button mat-raised-button color="accent" 
                    (click)="navigateToAddBook()" 
                    class="cta-secondary">
              <mat-icon>add</mat-icon>
              Adicionar Livro
            </button>
          </div>
        </div>
        
        <div class="hero-image">
          <div class="book-stack">
            <div class="book book-1"></div>
            <div class="book book-2"></div>
            <div class="book book-3"></div>
          </div>
        </div>
      </div>
      
      <div class="stats-section">
        <h2>Sua Biblioteca em Números</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <mat-icon>book</mat-icon>
            <span class="stat-number">{{ totalBooks }}</span>
            <span class="stat-label">Livros Cadastrados</span>
          </div>
          
          <div class="stat-card">
            <mat-icon>person</mat-icon>
            <span class="stat-number">{{ totalAuthors }}</span>
            <span class="stat-label">Autores Diferentes</span>
          </div>
          
          <div class="stat-card">
            <mat-icon>category</mat-icon>
            <span class="stat-number">{{ totalGenres }}</span>
            <span class="stat-label">Gêneros</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .hero-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 80px 40px;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 70vh;
    }

    .hero-content {
      flex: 1;
      max-width: 600px;
      color: white;
    }

    .hero-content h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .hero-subtitle {
      font-size: 1.2rem;
      margin-bottom: 3rem;
      opacity: 0.9;
      line-height: 1.6;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .feature-card {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
      border: 1px solid rgba(255,255,255,0.2);
    }

    .feature-card mat-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      margin-bottom: 1rem;
      color: #ffd700;
    }

    .feature-card h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .feature-card p {
      margin: 0;
      font-size: 0.9rem;
      opacity: 0.8;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
    }

    .cta-primary, .cta-secondary {
      padding: 12px 24px;
      font-size: 1rem;
      font-weight: 600;
      min-width: 180px;
    }

    .hero-image {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 400px;
    }

    .book-stack {
      position: relative;
      width: 200px;
      height: 240px;
    }

    .book {
      position: absolute;
      width: 160px;
      height: 200px;
      border-radius: 8px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    }

    .book-1 {
      background: linear-gradient(45deg, #ff6b6b, #ff8e53);
      transform: rotate(-10deg);
      z-index: 1;
    }

    .book-2 {
      background: linear-gradient(45deg, #4ecdc4, #44a08d);
      transform: rotate(5deg) translateX(20px);
      z-index: 2;
    }

    .book-3 {
      background: linear-gradient(45deg, #ffecd2, #fcb69f);
      transform: rotate(-5deg) translateX(40px);
      z-index: 3;
    }

    .stats-section {
      background: white;
      padding: 60px 40px;
      text-align: center;
    }

    .stats-section h2 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .stat-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      background: #f8f9fa;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .stat-card mat-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      color: #667eea;
      margin-bottom: 1rem;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1rem;
      color: #666;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .hero-section {
        flex-direction: column;
        text-align: center;
        padding: 40px 20px;
      }

      .hero-content h1 {
        font-size: 2.5rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .cta-buttons {
        flex-direction: column;
      }

      .stats-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .book-stack {
        margin-top: 2rem;
        transform: scale(0.8);
      }
    }
  `]
})
export class HomeComponent {
  totalBooks = 0;
  totalAuthors = 0;
  totalGenres = 0;

  constructor(private router: Router) {}

  navigateToBooks(): void {
    this.router.navigate(['/livros']);
  }

  navigateToAddBook(): void {
    this.router.navigate(['/livros/novo']);
  }
}