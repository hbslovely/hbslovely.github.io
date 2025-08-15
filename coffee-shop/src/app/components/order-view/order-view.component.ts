import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { 
  NbCardModule, 
  NbButtonModule, 
  NbIconModule,
  NbAlertModule
} from '@nebular/theme';
import { OrderService } from '../../services/order.service';
import { OrderInfo } from '../../models/menu.model';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbAlertModule
  ],
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {
  order: OrderInfo | null = null;
  showCopySuccess = false;
  orderId: string = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.orderId = params['id'];
        try {
          this.order = this.orderService.decodeOrder(this.orderId);
        } catch (error) {
          this.order = null;
        }
      }
    });
  }

  copyOrderLink() {
    if (!this.orderId) return;

    const message = this.orderService.getShareableMessage(this.orderId);
    navigator.clipboard.writeText(message).then(() => {
      this.showCopySuccess = true;
      setTimeout(() => {
        this.showCopySuccess = false;
      }, 3000);
    });
  }
} 