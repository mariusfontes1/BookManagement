import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-navbar></app-navbar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <footer class="app-footer">
        <p>&copy; {{ currentYear }} Sistema de Gerenciamento de Livros - Desenvolvido para Embalsoft</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      background-color: #f5f5f5;
    }

    .app-footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 16px;
      margin-top: auto;
    }

    .app-footer p {
      margin: 0;
      font-size: 0.9rem;
    }
  `]
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}