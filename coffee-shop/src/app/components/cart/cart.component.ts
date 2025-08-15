import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NbCardModule, NbButtonModule, NbIconModule, NbInputModule, NbFormFieldModule } from '@nebular/theme';
import { CartItem, OrderInfo } from '../../models/menu.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbFormFieldModule
  ],
  template: `
    <div class="cart-container">
      <nb-card>
        <nb-card-header>
          <h2>Your Cart</h2>
        </nb-card-header>
        <nb-card-body>
          @if (cartItems.length === 0) {
            <p>Your cart is empty</p>
          } @else {
            <div class="cart-items">
              @for (item of cartItems; track item.id) {
                <div class="cart-item">
                  <div class="item-info">
                    <h3>{{ item.name }}</h3>
                    <p class="price">{{ item.price | currency:'VND':'symbol':'1.0-0' }}</p>
                  </div>
                  <div class="item-actions">
                    <input nbInput type="number" [(ngModel)]="item.quantity" 
                           (ngModelChange)="updateQuantity(item.id, $event)" min="0" max="99">
                    <textarea nbInput [(ngModel)]="item.note" placeholder="Add note"></textarea>
                  </div>
                </div>
              }
            </div>

            <div class="order-form">
              <h3>Order Information</h3>
              <div class="form-group">
                <label>Name (Optional)</label>
                <input nbInput fullWidth [(ngModel)]="orderInfo.customerName" placeholder="Your name">
              </div>
              <div class="form-group">
                <label>Address *</label>
                <input nbInput fullWidth [(ngModel)]="orderInfo.address" placeholder="Delivery address" required>
              </div>
              <div class="form-group">
                <label>Phone *</label>
                <input nbInput fullWidth [(ngModel)]="orderInfo.phone" placeholder="Phone number" required>
              </div>
            </div>

            <div class="cart-summary">
              <p class="total">Total: {{ total | currency:'VND':'symbol':'1.0-0' }}</p>
              <button nbButton status="success" (click)="placeOrder()" 
                      [disabled]="!orderInfo.address || !orderInfo.phone">
                Place Order
              </button>
            </div>
          }
        </nb-card-body>
      </nb-card>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .cart-items {
      margin-bottom: 2rem;
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: start;
      padding: 1rem 0;
      border-bottom: 1px solid #eee;

      .item-info {
        flex: 1;

        h3 {
          margin: 0;
        }

        .price {
          color: #666;
        }
      }

      .item-actions {
        display: flex;
        gap: 1rem;
        align-items: start;

        input {
          width: 80px;
        }

        textarea {
          width: 200px;
          height: 60px;
        }
      }
    }

    .order-form {
      margin: 2rem 0;

      .form-group {
        margin-bottom: 1rem;

        label {
          display: block;
          margin-bottom: 0.5rem;
        }
      }
    }

    .cart-summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 2px solid #eee;

      .total {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  orderInfo: OrderInfo = {
    customerName: '',
    address: '',
    phone: '',
    items: [],
    totalAmount: 0,
    orderDate: new Date()
  };

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.total = this.orderService.calculateTotal(items);
    });
  }

  updateQuantity(itemId: string, quantity: number) {
    this.orderService.updateItemQuantity(itemId, quantity);
  }

  placeOrder() {
    if (!this.orderInfo.address || !this.orderInfo.phone) {
      return;
    }

    const order: OrderInfo = {
      ...this.orderInfo,
      items: this.cartItems,
      totalAmount: this.total,
      orderDate: new Date()
    };

    const encodedOrder = this.orderService.encodeOrder(order);
    this.orderService.clearCart();
    this.router.navigate(['/order', encodedOrder]);
  }
} 