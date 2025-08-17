import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { OrderService } from '../../services/order.service';
import { OrderInfo } from '../../models/menu.model';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    ToastModule,
    TooltipModule
  ],
  providers: [MessageService],
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {
  @ViewChild('qrCanvas', { static: false }) qrCanvas!: ElementRef<HTMLCanvasElement>;
  
  order: OrderInfo | null = null;
  orderId: string = '';
  qrCodeDataUrl: string = '';
  isOrderJustPlaced: boolean = false;
  orderUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.orderId = params['id'];
        try {
          this.order = this.orderService.decodeOrder(this.orderId);
          this.orderUrl = `${window.location.origin}${window.location.pathname}#/order/${this.orderId}`;
          this.generateQRCode();
        } catch (error) {
          this.order = null;
        }
      }
    });

    // Check if order was just placed
    this.route.queryParams.subscribe(queryParams => {
      this.isOrderJustPlaced = queryParams['success'] === 'true';
      if (this.isOrderJustPlaced) {
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Đặt hàng thành công!',
            detail: 'Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.',
            life: 5000
          });
        }, 500);
      }
    });
  }

  async generateQRCode() {
    if (!this.orderUrl) return;
    
    try {
      this.qrCodeDataUrl = await QRCode.toDataURL(this.orderUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#3C2A21', // Coffee dark color
          light: '#FFFFFF'
        }
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }

  copyOrderLink() {
    if (!this.order) return;

    const message = this.orderService.getShareableMessage(this.orderId);
    navigator.clipboard.writeText(message).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đã sao chép liên kết đơn hàng!'
      });
    }).catch(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Không thể sao chép liên kết. Vui lòng thử lại.'
      });
    });
  }

  copyOrderUrl() {
    if (!this.orderUrl) return;

    navigator.clipboard.writeText(this.orderUrl).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đã sao chép URL đơn hàng!'
      });
    }).catch(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Không thể sao chép URL. Vui lòng thử lại.'
      });
    });
  }

  copyOrderId() {
    if (!this.orderId) return;

    navigator.clipboard.writeText(this.orderId).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đã sao chép mã đơn hàng!'
      });
    }).catch(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Không thể sao chép mã đơn hàng. Vui lòng thử lại.'
      });
    });
  }

  downloadQRCode() {
    if (!this.qrCodeDataUrl) return;

    const link = document.createElement('a');
    link.download = `order-${this.orderId}-qr.png`;
    link.href = this.qrCodeDataUrl;
    link.click();

    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Đã tải xuống mã QR!'
    });
  }
} 