export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  ano: number;
  dataCriacao: Date;
  dataAtualizacao?: Date;
}

export interface CreateLivro {
  titulo: string;
  autor: string;
  genero: string;
  ano: number;
}

export interface UpdateLivro {
  titulo: string;
  autor: string;
  genero: string;
  ano: number;
}