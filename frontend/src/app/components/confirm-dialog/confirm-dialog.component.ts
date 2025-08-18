import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  isWarning?: boolean;
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="confirm-dialog">
      <h2 mat-dialog-title class="dialog-title">
        <mat-icon [color]="data.isWarning ? 'warn' : 'primary'">
          {{ data.isWarning ? 'warning' : 'help_outline' }}
        </mat-icon>
        {{ data.title }}
      </h2>
      
      <mat-dialog-content class="dialog-content">
        <p>{{ data.message }}</p>
      </mat-dialog-content>
      
      <mat-dialog-actions class="dialog-actions">
        <button mat-button 
                (click)="onCancel()"
                class="cancel-button">
          {{ data.cancelText }}
        </button>
        
        <button mat-raised-button 
                [color]="data.isWarning ? 'warn' : 'primary'"
                (click)="onConfirm()"
                class="confirm-button">
          {{ data.confirmText }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      width: 100%;
      min-width: 350px;
    }
    
    .dialog-title {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0;
      color: #333;
      font-weight: 500;
    }
    
    .dialog-content {
      padding: 20px 0;
    }
    
    .dialog-content p {
      margin: 0;
      color: #666;
      line-height: 1.5;
    }
    
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 0 0 0;
      margin: 0;
    }
    
    .cancel-button {
      min-width: 80px;
    }
    
    .confirm-button {
      min-width: 100px;
    }
    
    @media (max-width: 480px) {
      .confirm-dialog {
        min-width: 280px;
      }
      
      .dialog-actions {
        flex-direction: column;
      }
      
      .cancel-button,
      .confirm-button {
        width: 100%;
      }
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}