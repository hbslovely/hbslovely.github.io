import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { OrderService } from '../../services/order.service';
import { OrderInfo } from '../../models/menu.model';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {
  order: OrderInfo | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        try {
          this.order = this.orderService.decodeOrder(params['id']);
        } catch (error) {
          this.order = null;
        }
      }
    });
  }

  copyOrderLink() {
    if (!this.order) return;

    const message = this.orderService.getShareableMessage(this.route.snapshot.params['id']);
    navigator.clipboard.writeText(message).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đã sao chép liên kết đơn hàng!'
      });
    });
  }
} 