import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, MenuItem, OrderInfo } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  
  constructor() {}

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(item: MenuItem, quantity: number = 1, note?: string) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      if (note) existingItem.note = note;
      this.cartItems.next([...currentItems]);
    } else {
      const newItem: CartItem = {
        ...item,
        quantity,
        note,
        price: item.originalPrice // Map originalPrice to price for cart
      };
      this.cartItems.next([...currentItems, newItem]);
    }
  }

  updateItemQuantity(itemId: string, quantity: number) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0);
    this.cartItems.next(updatedItems);
  }

  clearCart() {
    this.cartItems.next([]);
  }

  encodeOrder(order: OrderInfo): string {
    const orderString = JSON.stringify(order);
    return btoa(encodeURIComponent(orderString));
  }

  decodeOrder(encodedOrder: string): OrderInfo {
    try {
      const orderString = decodeURIComponent(atob(encodedOrder));
      return JSON.parse(orderString);
    } catch (error) {
      throw new Error('Invalid order code');
    }
  }

  calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
  }
} 