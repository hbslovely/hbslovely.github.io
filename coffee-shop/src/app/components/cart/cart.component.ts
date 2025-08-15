import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  NbCardModule, 
  NbButtonModule, 
  NbIconModule, 
  NbInputModule, 
  NbFormFieldModule 
} from '@nebular/theme';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CartItem, OrderInfo } from '../../models/menu.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbFormFieldModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
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