import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, OrderInfo } from '../models/menu.model';

const CART_STORAGE_KEY = 'coffee_shop_cart';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly cartItems = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());
  readonly cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Save cart to localStorage whenever it changes
    this.cartItems$.subscribe(items => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    });
  }

  private loadCartFromStorage(): CartItem[] {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }
  }

  addToCart(item: Omit<CartItem, 'quantity' | 'note'>): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(i => i.id === item.id);

    if (existingItem) {
      this.updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      const newItem: CartItem = {
        ...item,
        quantity: 1,
        note: ''
      };
      this.cartItems.next([...currentItems, newItem]);
    }
  }

  updateQuantity(itemId: string, quantity: number): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems
      .map(item => item.id === itemId ? { ...item, quantity } : item)
      .filter(item => item.quantity > 0);
    
    this.cartItems.next(updatedItems);
  }

  updateNote(itemId: string, note: string): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.map(item => 
      item.id === itemId ? { ...item, note: note.trim() } : item
    );
    
    this.cartItems.next(updatedItems);
  }

  removeFromCart(itemId: string): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.cartItems.next(updatedItems);
  }

  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }

  encodeOrder(order: OrderInfo): string {
    try {
      const orderString = JSON.stringify(order);
      return btoa(encodeURIComponent(orderString));
    } catch (error) {
      console.error('Error encoding order:', error);
      throw new Error('Failed to encode order');
    }
  }

  decodeOrder(encodedOrder: string): OrderInfo {
    try {
      const orderString = decodeURIComponent(atob(encodedOrder));
      return JSON.parse(orderString);
    } catch (error) {
      console.error('Error decoding order:', error);
      throw new Error('Invalid order code');
    }
  }

  getShareableMessage(orderId: string): string {
    const baseUrl = window.location.origin;
    return `Tôi đã chuẩn bị xong món nè Hello Coffee, Vui lòng chuẩn bị cho tôi tại link sau:\n${baseUrl}/#/order/${orderId}`;
  }
} 