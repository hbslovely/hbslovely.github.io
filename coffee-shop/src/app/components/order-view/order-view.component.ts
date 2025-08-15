import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NbCardModule } from '@nebular/theme';
import { OrderInfo } from '../../models/menu.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [CommonModule, NbCardModule],
  template: `
    <div class="order-container">
      <nb-card>
        <nb-card-header>
          <h2>Order Details</h2>
        </nb-card-header>
        <nb-card-body>
          @if (order) {
            <div class="order-info">
              <div class="customer-info">
                <h3>Customer Information</h3>
                @if (order.customerName) {
                  <p><strong>Name:</strong> {{ order.customerName }}</p>
                }
                <p><strong>Address:</strong> {{ order.address }}</p>
                <p><strong>Phone:</strong> {{ order.phone }}</p>
                <p><strong>Order Date:</strong> {{ order.orderDate | date:'medium' }}</p>
              </div>

              <div class="order-items">
                <h3>Order Items</h3>
                @for (item of order.items; track item.id) {
                  <div class="order-item">
                    <div class="item-details">
                      <h4>{{ item.name }}</h4>
                      <p class="quantity">x{{ item.quantity }}</p>
                      <p class="price">{{ item.price * item.quantity | currency:'VND':'symbol':'1.0-0' }}</p>
                    </div>
                    @if (item.note) {
                      <p class="note">Note: {{ item.note }}</p>
                    }
                  </div>
                }
              </div>

              <div class="order-total">
                <h3>Total Amount</h3>
                <p class="total">{{ order.totalAmount | currency:'VND':'symbol':'1.0-0' }}</p>
              </div>
            </div>
          } @else {
            <p>Invalid order code</p>
          }
        </nb-card-body>
      </nb-card>
    </div>
  `,
  styles: [`
    .order-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .order-info {
      > div {
        margin-bottom: 2rem;
      }

      h3 {
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #eee;
      }
    }

    .customer-info {
      p {
        margin: 0.5rem 0;
      }
    }

    .order-items {
      .order-item {
        padding: 1rem 0;
        border-bottom: 1px solid #eee;

        &:last-child {
          border-bottom: none;
        }

        .item-details {
          display: flex;
          justify-content: space-between;
          align-items: center;

          h4 {
            flex: 1;
            margin: 0;
          }

          .quantity {
            margin: 0 1rem;
            color: #666;
          }

          .price {
            font-weight: bold;
            margin: 0;
          }
        }

        .note {
          margin: 0.5rem 0 0;
          font-style: italic;
          color: #666;
        }
      }
    }

    .order-total {
      text-align: right;

      .total {
        font-size: 1.5rem;
        font-weight: bold;
        color: #2a2a2a;
      }
    }
  `]
})
export class OrderViewComponent implements OnInit {
  order: OrderInfo | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
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
} 