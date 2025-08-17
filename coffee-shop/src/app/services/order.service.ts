import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem, OrderInfo } from '../models/menu.model';

const CART_STORAGE_KEY = 'coffee_shop_cart';
const ORDERS_STORAGE_KEY = 'coffee_shop_orders';

export interface CartNotification {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  duration?: number;
}

export interface StoredOrder {
  id: string;
  order: OrderInfo;
  createdAt: Date;
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

  private generateShortOrderId(): string {
    // Generate a short ID using timestamp + random characters
    const timestamp = Date.now().toString(36); // Base36 timestamp for shorter string
    const randomChars = Math.random().toString(36).substring(2, 6); // 4 random chars
    return `${timestamp}-${randomChars}`.toUpperCase();
  }

  private getStoredOrders(): { [key: string]: StoredOrder } {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      localStorage.removeItem(ORDERS_STORAGE_KEY);
      return {};
    }
  }

  private saveStoredOrders(orders: { [key: string]: StoredOrder }): void {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders:', error);
    }
  }

  private cleanupOldOrders(): void {
    const orders = this.getStoredOrders();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    let hasChanges = false;
    Object.keys(orders).forEach(id => {
      const orderDate = new Date(orders[id].createdAt);
      if (orderDate < thirtyDaysAgo) {
        delete orders[id];
        hasChanges = true;
      }
    });

    if (hasChanges) {
      this.saveStoredOrders(orders);
    }
  }

  encodeOrder(order: OrderInfo): string {
    try {
      // Clean up old orders first
      this.cleanupOldOrders();
      
      // Generate short ID
      const orderId = this.generateShortOrderId();
      
      // Store order with short ID
      const orders = this.getStoredOrders();
      orders[orderId] = {
        id: orderId,
        order: { ...order },
        createdAt: new Date()
      };
      
      this.saveStoredOrders(orders);
      return orderId;
    } catch (error) {
      console.error('Error encoding order:', error);
      throw new Error('Failed to create order');
    }
  }

  decodeOrder(orderId: string): OrderInfo {
    try {
      const orders = this.getStoredOrders();
      const storedOrder = orders[orderId];
      
      if (!storedOrder) {
        throw new Error('Order not found');
      }

      // Check if order is not too old (30 days)
      const orderDate = new Date(storedOrder.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      if (orderDate < thirtyDaysAgo) {
        // Remove expired order
        delete orders[orderId];
        this.saveStoredOrders(orders);
        throw new Error('Order expired');
      }

      return storedOrder.order;
    } catch (error) {
      console.error('Error decoding order:', error);
      throw new Error('Invalid or expired order ID');
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
} 