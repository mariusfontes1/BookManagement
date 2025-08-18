// livro-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro.model';

@Component({
  selector: 'app-livro-detail',
  template: `
    <div class="detail-container">
      <!-- Loading -->
      <div *ngIf="isLoading" class="loading-container">
        <mat-spinner diameter="50"></mat-spinner>
        <p>Carregando detalhes do livro...</p>
      </div>

      <!-- Error -->
      <div *ngIf="error && !isLoading" class="error-container">
        <mat-icon color="warn">error</mat-icon>
        <p>{{ error }}</p>
        <button mat-raised-button color="primary" (click)="loadLivro()">
          Tentar Novamente
        </button>
      </div>

      <!-- Content -->
      <div *ngIf="livro && !isLoading && !error" class="content">
        <!-- Header -->
        <div class="header">
          <button mat-icon-button (click)="goBack()" class="back-button">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <h1>Detalhes do Livro</h1>
          <div class="actions">
            <button mat-raised-button color="primary" (click)="editLivro()">
              <mat-icon>edit</mat-icon>
              Editar
            </button>
          </div>
        </div>

        <!-- Book Details Card -->
        <mat-card class="book-card">
          <mat-card-content>
            <div class="book-details">
              <div class="book-cover">
                <div class="cover-placeholder">
                  <mat-icon>book</mat-icon>
                </div>
              </div>
              
              <div class="book-info">
                <h2>{{ livro.titulo }}</h2>
                
                <div class="info-grid">
                  <div class="info-item">
                    <mat-icon>person</mat-icon>
                    <div>
                      <span class="label">Autor</span>
                      <span class="value">{{ livro.autor }}</span>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <mat-icon>category</mat-icon>
                    <div>
                      <span class="label">Gênero</span>
                      <span class="value">{{ livro.genero }}</span>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <mat-icon>calendar_today</mat-icon>
                    <div>
                      <span class="label">Ano de Publicação</span>
                      <span class="value">{{ livro.ano }}</span>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <mat-icon>schedule</mat-icon>
                    <div>
                      <span class="label">Cadastrado em</span>
                      <span class="value">{{ livro.dataCriacao | date:'dd/MM/yyyy' }}</span>
                    </div>
                  </div>
                  
                  <div class="info-item" *ngIf="livro.dataAtualizacao">
                    <mat-icon>update</mat-icon>
                    <div>
                      <span class="label">Última atualização</span>
                      <span class="value">{{ livro.dataAtualizacao | date:'dd/MM/yyyy' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .detail-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .loading-container, .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
    }

    .error-container mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .header h1 {
      margin: 0;
      color: #333;
      flex-grow: 1;
      margin-left: 16px;
    }

    .book-card {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .book-details {
      display: flex;
      gap: 2rem;
    }

    .book-cover {
      flex-shrink: 0;
    }

    .cover-placeholder {
      width: 160px;
      height: 240px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }

    .cover-placeholder mat-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
    }

    .book-info {
      flex-grow: 1;
    }

    .book-info h2 {
      margin: 0 0 2rem 0;
      color: #1976d2;
      font-size: 2rem;
      font-weight: 600;
    }

    .info-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .info-item mat-icon {
      color: #1976d2;
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
    }

    .info-item div {
      display: flex;
      flex-direction: column;
    }

    .label {
      font-size: 0.8rem;
      color: #666;
      font-weight: 500;
      margin-bottom: 2px;
    }

    .value {
      font-size: 1rem;
      color: #333;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .book-details {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .cover-placeholder {
        width: 120px;
        height: 180px;
      }

      .book-info h2 {
        font-size: 1.5rem;
      }

      .header {
        flex-wrap: wrap;
        gap: 1rem;
      }

      .actions {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
  `]
})
export class LivroDetailComponent implements OnInit {
  livro: Livro | null = null;
  isLoading = false;
  error: string | null = null;
  livroId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private livroService: LivroService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.livroId = +params['id'];
      this.loadLivro();
    });
  }

  loadLivro(): void {
    this.isLoading = true;
    this.error = null;

    this.livroService.getLivroById(this.livroId).subscribe({
      next: (livro) => {
        this.livro = livro;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
        this.snackBar.open('Erro ao carregar livro: ' + error.message, 'Fechar', {
          duration: 5000
        });
      }
    });
  }

  editLivro(): void {
    this.router.navigate(['/livros/editar', this.livroId]);
  }

  goBack(): void {
    this.router.navigate(['/livros']);
  }
}