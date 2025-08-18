import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-livro-list',
  templateUrl: './livro-list.component.html',
  styleUrls: ['./livro-list.component.css']
})
export class LivroListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titulo', 'autor', 'genero', 'ano', 'actions'];
  dataSource = new MatTableDataSource<Livro>();
  isLoading = false;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private livroService: LivroService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadLivros();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadLivros(): void {
    this.isLoading = true;
    this.error = null;

    this.livroService.getLivros().subscribe({
      next: (livros) => {
        this.dataSource.data = livros;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
        this.showSnackBar('Erro ao carregar livros: ' + error.message, 'error');
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addLivro(): void {
    this.router.navigate(['/livros/novo']);
  }

  editLivro(id: number): void {
    this.router.navigate(['/livros/editar', id]);
  }

  viewLivro(id: number): void {
    this.router.navigate(['/livros/detalhes', id]);
  }

  deleteLivro(livro: Livro): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir o livro "${livro.titulo}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performDelete(livro.id);
      }
    });
  }

  private performDelete(id: number): void {
    this.livroService.deleteLivro(id).subscribe({
      next: () => {
        this.showSnackBar('Livro excluído com sucesso!', 'success');
        this.loadLivros(); // Recarrega a lista
      },
      error: (error) => {
        this.showSnackBar('Erro ao excluir livro: ' + error.message, 'error');
      }
    });
  }

  private showSnackBar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  retry(): void {
    this.loadLivros();
  }
}