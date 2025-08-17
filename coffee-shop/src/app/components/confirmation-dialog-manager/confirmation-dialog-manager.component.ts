import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ConfirmationDialogService, ConfirmationRequest } from '../../services/confirmation-dialog.service';
import { ConfirmationDialogComponent, ConfirmationConfig } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-confirmation-dialog-manager',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmationDialogComponent
  ],
  template: `
    <app-confirmation-dialog
      [(visible)]="showDialog"
      [config]="currentConfig"
      (confirm)="onConfirm()"
      (cancel)="onCancel()">
    </app-confirmation-dialog>
  `
})
export class ConfirmationDialogManagerComponent implements OnInit, OnDestroy {
  showDialog = false;
  currentConfig: ConfirmationConfig = {
    title: '',
    message: '',
    type: 'info'
  };
  
  private currentRequest?: ConfirmationRequest;
  private subscription?: Subscription;

  constructor(private confirmationService: ConfirmationDialogService) {}

  ngOnInit() {
    this.subscription = this.confirmationService.confirmationRequest$.subscribe(
      (request: ConfirmationRequest) => {
        this.currentRequest = request;
        this.currentConfig = request.config;
        this.showDialog = true;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onConfirm(): void {
    if (this.currentRequest) {
      this.currentRequest.resolve(true);
      this.currentRequest = undefined;
    }
    this.showDialog = false;
  }

  onCancel(): void {
    if (this.currentRequest) {
      this.currentRequest.resolve(false);
      this.currentRequest = undefined;
    }
    this.showDialog = false;
  }
} 