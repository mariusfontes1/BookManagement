import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LivroService } from '../../services/livro.service';
import { Livro, CreateLivro, UpdateLivro } from '../../models/livro.model';

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.css']
})
export class LivroFormComponent implements OnInit {
  livroForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  livroId: number | null = null;
  pageTitle = '';

  // Lista de gêneros populares para sugestão
  generos = [
    'Ficção Científica',
    'Fantasia',
    'Romance',
    'Mistério',
    'Thriller',
    'Drama',
    'Comédia',
    'Aventura',
    'História',
    'Biografia',
    'Tecnologia',
    'Negócios',
    'Autoajuda',
    'Filosofia',
    'Poesia'
  ];

  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.livroForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.livroId = +params['id'];
        this.pageTitle = 'Editar Livro';
        this.loadLivro();
      } else {
        this.isEditMode = false;
        this.pageTitle = 'Adicionar Novo Livro';
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      titulo: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200)
      ]],
      autor: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      genero: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      ano: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(this.getCurrentYear())
      ]]
    });
  }

  private loadLivro(): void {
    if (this.livroId) {
      this.isLoading = true;
      
      this.livroService.getLivroById(this.livroId).subscribe({
        next: (livro) => {
          this.populateForm(livro);
          this.isLoading = false;
        },
        error: (error) => {
          this.showSnackBar('Erro ao carregar livro: ' + error.message, 'error');
          this.isLoading = false;
          this.router.navigate(['/livros']);
        }
      });
    }
  }

  private populateForm(livro: Livro): void {
    this.livroForm.patchValue({
      titulo: livro.titulo,
      autor: livro.autor,
      genero: livro.genero,
      ano: livro.ano
    });
  }

  onSubmit(): void {
    if (this.livroForm.valid) {
      this.isLoading = true;
      
      if (this.isEditMode) {
        this.updateLivro();
      } else {
        this.createLivro();
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private createLivro(): void {
    const createLivro: CreateLivro = this.livroForm.value;
    
    this.livroService.createLivro(createLivro).subscribe({
      next: (livro) => {
        this.showSnackBar('Livro criado com sucesso!', 'success');
        this.router.navigate(['/livros']);
      },
      error: (error) => {
        this.showSnackBar('Erro ao criar livro: ' + error.message, 'error');
        this.isLoading = false;
      }
    });
  }

  private updateLivro(): void {
    if (this.livroId) {
      const updateLivro: UpdateLivro = this.livroForm.value;
      
      this.livroService.updateLivro(this.livroId, updateLivro).subscribe({
        next: (livro) => {
          this.showSnackBar('Livro atualizado com sucesso!', 'success');
          this.router.navigate(['/livros']);
        },
        error: (error) => {
          this.showSnackBar('Erro ao atualizar livro: ' + error.message, 'error');
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/livros']);
  }

  // ✅ Método adicionado para o template
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  // Método para marcar todos os campos como tocados (para mostrar erros)
  private markFormGroupTouched(): void {
    Object.keys(this.livroForm.controls).forEach(key => {
      const control = this.livroForm.get(key);
      control?.markAsTouched();
    });
  }

  // Métodos de validação para template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.livroForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.livroForm.get(fieldName);
    
    if (field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} é obrigatório`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} deve ter pelo menos ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} deve ter no máximo ${field.errors['maxlength'].requiredLength} caracteres`;
      }
      if (field.errors['min']) {
        return `${this.getFieldLabel(fieldName)} deve ser maior que ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `${this.getFieldLabel(fieldName)} não pode ser maior que ${field.errors['max'].max}`;
      }
    }
    
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      titulo: 'Título',
      autor: 'Autor',
      genero: 'Gênero',
      ano: 'Ano'
    };
    return labels[fieldName] || fieldName;
  }

  private showSnackBar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}