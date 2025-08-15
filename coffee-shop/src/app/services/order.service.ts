import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, OrderInfo } from '../models/menu.model';

const CART_STORAGE_KEY = 'coffee_shop_cart';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private cartItems = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());

  constructor() {
    // Subscribe to changes and save to localStorage
    this.cartItems.subscribe(items => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    });
  }

  private loadCartFromStorage(): CartItem[] {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return [];
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(item: CartItem, quantity: number) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { ...item, quantity }]);
    }
  }

  updateItemQuantity(itemId: string, quantity: number) {
    const currentItems = this.cartItems.value;
    if (quantity <= 0) {
      this.cartItems.next(currentItems.filter(item => item.id !== itemId));
    } else {
      const updatedItems = currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      this.cartItems.next(updatedItems);
    }
  }

  calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.cartItems.next([]);
    localStorage.removeItem(CART_STORAGE_KEY);
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

  getShareableLink(orderId: string): string {
    const baseUrl = window.location.origin;
    const path = window.location.pathname;
    return `${baseUrl}${path}#/order/${orderId}`;
  }

  getShareableMessage(orderId: string): string {
    const link = this.getShareableLink(orderId);
    return `Tôi đã chuẩn bị xong món nè Hello Coffee, Vui lòng chuẩn bị cho tôi tại link sau:\n${link}`;
  }
} 