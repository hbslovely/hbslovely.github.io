import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem, OrderInfo } from '../models/menu.model';
import baseX from 'base-x';

const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const base62 = baseX(BASE62);

const CUSTOM_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function customEncode(data: Uint8Array): string {
  let encoded = '';
  let hexString = Array.from(data).map(byte => byte.toString(16).padStart(2, '0')).join('');
  let value = BigInt('0x' + hexString);
  const base = BigInt(CUSTOM_CHARSET.length);
  while (value > 0) {
    const remainder = value % base;
    encoded = CUSTOM_CHARSET[Number(remainder)] + encoded;
    value = value / base;
  }
  return encoded;
}

function customDecode(encoded: string): Uint8Array {
  let value = BigInt(0);
  const base = BigInt(CUSTOM_CHARSET.length);
  for (const char of encoded) {
    value = value * base + BigInt(CUSTOM_CHARSET.indexOf(char));
  }
  let hex = value.toString(16);
  if (hex.length % 2) hex = '0' + hex; // Ensure even length
  return Uint8Array.from(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
}

const CART_STORAGE_KEY = 'coffee_shop_cart';

export interface CartNotification {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly cartItems = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());
  readonly cartItems$ = this.cartItems.asObservable();
  
  // Notification system
  private readonly notifications = new Subject<CartNotification>();
  readonly notifications$ = this.notifications.asObservable();

  // Cart statistics
  private readonly cartStats = new BehaviorSubject<{
    totalItems: number;
    totalAmount: number;
    uniqueItems: number;
  }>({ totalItems: 0, totalAmount: 0, uniqueItems: 0 });
  readonly cartStats$ = this.cartStats.asObservable();

  constructor() {
    // Save cart to localStorage whenever it changes
    this.cartItems$.subscribe(items => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      this.updateCartStats(items);
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

  private updateCartStats(items: CartItem[]): void {
    const stats = {
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      uniqueItems: items.length
    };
    this.cartStats.next(stats);
  }

  private showNotification(notification: CartNotification): void {
    this.notifications.next({
      duration: 3000,
      ...notification
    });
  }

  getCartSummary(): {
    items: CartItem[];
    totalItems: number;
    totalAmount: number;
    uniqueItems: number;
  } {
    const items = this.cartItems.value;
    return {
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      uniqueItems: items.length
    };
  }

  addToCart(item: Omit<CartItem, 'quantity' | 'note'>, quantity: number = 1): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(i => i.id === item.id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity <= 99) {
        this.updateQuantity(item.id, newQuantity);
        this.showNotification({
          type: 'success',
          message: `Đã thêm ${quantity} ${item.name} vào giỏ hàng`
        });
      } else {
        this.showNotification({
          type: 'warning',
          message: 'Không thể thêm quá 99 sản phẩm cùng loại'
        });
      }
    } else {
      const newItem: CartItem = {
        ...item,
        quantity,
        note: ''
      };
      this.cartItems.next([...currentItems, newItem]);
      this.showNotification({
        type: 'success',
        message: `Đã thêm ${item.name} vào giỏ hàng`
      });
    }
  }

  updateQuantity(itemId: string, quantity: number): void {
    if (quantity < 0 || quantity > 99) {
      this.showNotification({
        type: 'warning',
        message: 'Số lượng phải từ 1 đến 99'
      });
      return;
    }

    const currentItems = this.cartItems.value;
    const updatedItems = currentItems
      .map(item => item.id === itemId ? { ...item, quantity } : item)
      .filter(item => item.quantity > 0);
    
    this.cartItems.next(updatedItems);
    
    if (quantity === 0) {
      this.showNotification({
        type: 'info',
        message: 'Đã xóa sản phẩm khỏi giỏ hàng'
      });
    }
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
    const item = currentItems.find(i => i.id === itemId);
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    
    this.cartItems.next(updatedItems);
    
    if (item) {
      this.showNotification({
        type: 'info',
        message: `Đã xóa ${item.name} khỏi giỏ hàng`
      });
    }
  }

  clearCart(): void {
    const currentItems = this.cartItems.value;
    if (currentItems.length > 0) {
      this.cartItems.next([]);
      localStorage.removeItem(CART_STORAGE_KEY);
      this.showNotification({
        type: 'info',
        message: 'Đã xóa tất cả sản phẩm khỏi giỏ hàng'
      });
    }
  }

  isInCart(itemId: string): boolean {
    return this.cartItems.value.some(item => item.id === itemId);
  }

  getItemQuantity(itemId: string): number {
    const item = this.cartItems.value.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  }

  increaseQuantity(itemId: string): void {
    const item = this.cartItems.value.find(i => i.id === itemId);
    if (item && item.quantity < 99) {
      this.updateQuantity(itemId, item.quantity + 1);
    }
  }

  decreaseQuantity(itemId: string): void {
    const item = this.cartItems.value.find(i => i.id === itemId);
    if (item) {
      if (item.quantity > 1) {
        this.updateQuantity(itemId, item.quantity - 1);
      } else {
        this.removeFromCart(itemId);
      }
    }
  }

  encodeOrder(order: OrderInfo): string {
    try {
      const orderString = JSON.stringify(order);
      const utf8Bytes = new TextEncoder().encode(orderString);
      return customEncode(utf8Bytes);
    } catch (error) {
      console.error('Error encoding order:', error);
      throw new Error('Failed to encode order');
    }
  }

  decodeOrder(encodedOrder: string): OrderInfo {
    try {
      const utf8Bytes = customDecode(encodedOrder);
      const orderString = new TextDecoder().decode(utf8Bytes);
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

  // Utility methods for cart management
  hasItemsInCart(): boolean {
    return this.cartItems.value.length > 0;
  }

  getTotalUniqueItems(): number {
    return this.cartItems.value.length;
  }

  getTotalQuantity(): number {
    return this.cartItems.value.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalAmount(): number {
    return this.cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  saveCartForLater(): void {
    const cartData = {
      items: this.cartItems.value,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('coffee_shop_saved_cart', JSON.stringify(cartData));
    this.showNotification({
      type: 'success',
      message: 'Đã lưu giỏ hàng để sử dụng sau'
    });
  }

  restoreSavedCart(): boolean {
    const savedData = localStorage.getItem('coffee_shop_saved_cart');
    if (savedData) {
      try {
        const { items } = JSON.parse(savedData);
        this.cartItems.next(items);
        localStorage.removeItem('coffee_shop_saved_cart');
        this.showNotification({
          type: 'success',
          message: 'Đã khôi phục giỏ hàng đã lưu'
        });
        return true;
      } catch {
        localStorage.removeItem('coffee_shop_saved_cart');
      }
    }
    return false;
  }

  private generateShortOrderId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) { // Generate an 8-character ID
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}
} 