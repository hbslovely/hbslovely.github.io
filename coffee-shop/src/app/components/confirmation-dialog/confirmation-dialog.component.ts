import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

export interface ConfirmationConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info' | 'success';
  icon?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule
  ],
  template: `
    <p-dialog 
      [(visible)]="visible"
      [modal]="true"
      [closable]="false"
      [draggable]="false"
      [resizable]="false"
      [style]="{ width: '90vw', maxWidth: '400px' }"
      styleClass="confirmation-dialog">
      
      <div class="confirmation-content">
        <div class="confirmation-icon" [class]="'icon-' + config.type">
          <i class="pi" [class]="config.icon || getDefaultIcon()"></i>
        </div>
        
        <div class="confirmation-text">
          <h3 class="confirmation-title">{{ config.title }}</h3>
          <p class="confirmation-message">{{ config.message }}</p>
        </div>
      </div>
      
      <div class="confirmation-actions">
        <button 
          *ngIf="config.cancelText !== ''"
          class="cancel-btn"
          (click)="onCancel()"
          type="button">
          {{ config.cancelText || 'Hủy' }}
        </button>
        <button 
          class="confirm-btn"
          [class]="'btn-' + config.type"
          [class.single-button]="config.cancelText === ''"
          (click)="onConfirm()"
          type="button">
          {{ config.confirmText || 'Xác nhận' }}
        </button>
      </div>
    </p-dialog>
  `,
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  @Input() visible = false;
  @Input() config: ConfirmationConfig = {
    title: '',
    message: '',
    type: 'info'
  };
  
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
    this.closeDialog();
  }

  onCancel(): void {
    this.cancel.emit();
    this.closeDialog();
  }

  private closeDialog(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  getDefaultIcon(): string {
    switch (this.config.type) {
      case 'danger': return 'pi-exclamation-triangle';
      case 'warning': return 'pi-exclamation-circle';
      case 'success': return 'pi-check-circle';
      default: return 'pi-info-circle';
    }
  }
} 