import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ConfirmationConfig } from '../components/confirmation-dialog/confirmation-dialog.component';

export interface ConfirmationRequest {
  id: string;
  config: ConfirmationConfig;
  resolve: (result: boolean) => void;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  private confirmationSubject = new Subject<ConfirmationRequest>();
  private requestCounter = 0;

  get confirmationRequest$(): Observable<ConfirmationRequest> {
    return this.confirmationSubject.asObservable();
  }

  confirm(config: ConfirmationConfig): Promise<boolean> {
    return new Promise((resolve) => {
      const request: ConfirmationRequest = {
        id: `confirmation-${++this.requestCounter}`,
        config,
        resolve
      };
      
      this.confirmationSubject.next(request);
    });
  }

  // Convenience methods for common confirmation types
  confirmDelete(
    itemName: string = 'mục này',
    customMessage?: string
  ): Promise<boolean> {
    return this.confirm({
      title: 'Xác nhận xóa',
      message: customMessage || `Bạn có chắc chắn muốn xóa ${itemName}? Hành động này không thể hoàn tác.`,
      confirmText: 'Xóa',
      cancelText: 'Hủy',
      type: 'danger',
      icon: 'pi-trash'
    });
  }

  confirmClearCart(): Promise<boolean> {
    return this.confirm({
      title: 'Xóa tất cả giỏ hàng',
      message: 'Bạn có chắc chắn muốn xóa tất cả món trong giỏ hàng? Bạn sẽ phải thêm lại từ đầu.',
      confirmText: 'Xóa tất cả',
      cancelText: 'Hủy',
      type: 'danger',
      icon: 'pi-shopping-cart'
    });
  }

  confirmAction(
    title: string,
    message: string,
    confirmText: string = 'Xác nhận'
  ): Promise<boolean> {
    return this.confirm({
      title,
      message,
      confirmText,
      cancelText: 'Hủy',
      type: 'warning',
      icon: 'pi-exclamation-triangle'
    });
  }

  showSuccess(
    title: string,
    message: string,
    confirmText: string = 'OK'
  ): Promise<boolean> {
    return this.confirm({
      title,
      message,
      confirmText,
      cancelText: '', // Hide cancel button for success messages
      type: 'success',
      icon: 'pi-check-circle'
    });
  }

  showInfo(
    title: string,
    message: string,
    confirmText: string = 'OK'
  ): Promise<boolean> {
    return this.confirm({
      title,
      message,
      confirmText,
      cancelText: '', // Hide cancel button for info messages
      type: 'info',
      icon: 'pi-info-circle'
    });
  }

  showError(
    title: string,
    message: string,
    confirmText: string = 'OK'
  ): Promise<boolean> {
    return this.confirm({
      title,
      message,
      confirmText,
      cancelText: '', // Hide cancel button for error messages
      type: 'danger',
      icon: 'pi-exclamation-triangle'
    });
  }
} 