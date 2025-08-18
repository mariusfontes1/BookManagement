// navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <mat-toolbar color="primary" class="navbar">
      <div class="navbar-content">
        <div class="navbar-brand" (click)="navigateHome()">
          <mat-icon>menu_book</mat-icon>
          <span>BookManager</span>
        </div>
        
        <div class="navbar-menu">
          <button mat-button (click)="navigateHome()">
            <mat-icon>home</mat-icon>
            Início
          </button>
          
          <button mat-button (click)="navigateToBooks()">
            <mat-icon>library_books</mat-icon>
            Meus Livros
          </button>
          
          <button mat-raised-button color="accent" (click)="navigateToAddBook()">
            <mat-icon>add</mat-icon>
            Novo Livro
          </button>
        </div>
        
        <!-- Mobile menu button -->
        <button mat-icon-button 
                class="mobile-menu-btn" 
                (click)="toggleMobileMenu()">
          <mat-icon>{{ showMobileMenu ? 'close' : 'menu' }}</mat-icon>
        </button>
      </div>
      
      <!-- Mobile menu -->
      <div class="mobile-menu" [class.show]="showMobileMenu">
        <button mat-button (click)="navigateHome(); closeMobileMenu()">
          <mat-icon>home</mat-icon>
          Início
        </button>
        
        <button mat-button (click)="navigateToBooks(); closeMobileMenu()">
          <mat-icon>library_books</mat-icon>
          Meus Livros
        </button>
        
        <button mat-button (click)="navigateToAddBook(); closeMobileMenu()">
          <mat-icon>add</mat-icon>
          Novo Livro
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .navbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .navbar-brand mat-icon {
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
    }

    .navbar-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .navbar-menu button {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .mobile-menu-btn {
      display: none;
    }

    .mobile-menu {
      display: none;
      flex-direction: column;
      width: 100%;
      background: rgba(25, 118, 210, 0.95);
      backdrop-filter: blur(10px);
      padding: 1rem 0;
      position: absolute;
      top: 100%;
      left: 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .mobile-menu.show {
      display: flex;
    }

    .mobile-menu button {
      justify-content: flex-start;
      padding: 12px 24px;
      width: 100%;
    }

    @media (max-width: 768px) {
      .navbar-menu {
        display: none;
      }

      .mobile-menu-btn {
        display: block;
      }
    }
  `]
})
export class NavbarComponent {
  showMobileMenu = false;

  constructor(private router: Router) {}

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  navigateToBooks(): void {
    this.router.navigate(['/livros']);
  }

  navigateToAddBook(): void {
    this.router.navigate(['/livros/novo']);
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false;
  }
}