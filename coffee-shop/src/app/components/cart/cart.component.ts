import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OrderService } from '../../services/order.service';
import { CartItem, OrderInfo } from '../../models/menu.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  orderInfo: OrderInfo = {
    customerName: '',
    phone: '',
    address: '',
    items: [],
    totalAmount: 0,
    orderDate: new Date()
  };

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.updateOrderItems();
    });
  }

  updateQuantity(itemId: string, value: string | number | null) {
    if (value === null || value === '') {
      return;
    }
    
    const quantity = typeof value === 'string' ? parseInt(value, 10) : value;
    if (isNaN(quantity) || quantity < 0) {
      return;
    }

    if (quantity === 0) {
      this.removeItem(itemId);
    } else {
      this.orderService.updateQuantity(itemId, quantity);
    }
  }

  updateNote(itemId: string, note: string) {
    this.orderService.updateNote(itemId, note);
  }

  removeItem(itemId: string) {
    this.orderService.removeFromCart(itemId);
  }

  private updateOrderItems() {
    this.orderInfo.items = this.cartItems;
    this.orderInfo.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  placeOrder() {
    this.orderInfo.orderDate = new Date();
    const orderId = this.orderService.encodeOrder(this.orderInfo);
    this.orderService.clearCart();
    return orderId;
  }
} 