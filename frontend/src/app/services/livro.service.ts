import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Livro, CreateLivro, UpdateLivro } from '../models/livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private readonly apiUrl = 'https://localhost:5000/api/Livros';

  constructor(private http: HttpClient) { }

  // Buscar todos os livros
  getLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Buscar livro por ID
  getLivroById(id: number): Observable<Livro> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Livro>(url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Criar novo livro
  createLivro(livro: CreateLivro): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Atualizar livro existente
  updateLivro(id: number, livro: UpdateLivro): Observable<Livro> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Livro>(url, livro)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Excluir livro
  deleteLivro(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      switch (error.status) {
        case 404:
          errorMessage = 'Livro não encontrado';
          break;
        case 400:
          errorMessage = 'Dados inválidos fornecidos';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor';
          break;
        default:
          errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
      }
    }

    console.error('Erro na API:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}