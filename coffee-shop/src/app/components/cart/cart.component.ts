import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { CartItem, OrderInfo } from '../../models/menu.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
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

  constructor(
    private orderService: OrderService,
    private confirmationService: ConfirmationDialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.updateOrderItems();
    });
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  increaseQuantity(itemId: string): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item && item.quantity < 99) {
      this.orderService.updateQuantity(itemId, item.quantity + 1);
    }
  }

  decreaseQuantity(itemId: string): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      this.orderService.updateQuantity(itemId, item.quantity - 1);
    }
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

  updateNote(itemId: string, note: string): void {
    const trimmedNote = note.trimStart();
    this.orderService.updateNote(itemId, trimmedNote);
  }

  async removeItem(itemId: string) {
    const item = this.cartItems.find(i => i.id === itemId);
    if (!item) return;

    const confirmed = await this.confirmationService.confirmDelete(
      item.name,
      `Bạn có chắc chắn muốn xóa "${item.name}" khỏi giỏ hàng?`
    );

    if (confirmed) {
      // Add animation class before removing
      const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
      if (itemElement) {
        itemElement.classList.add('removing');
        setTimeout(() => {
          this.orderService.removeFromCart(itemId);
        }, 300);
      } else {
        this.orderService.removeFromCart(itemId);
      }
    }
  }

  async clearCart(): Promise<void> {
    if (this.cartItems.length === 0) return;

    const confirmed = await this.confirmationService.confirmClearCart();
    if (confirmed) {
      this.orderService.clearCart();
    }
  }

  isFormValid(): boolean {
    return !!(
      this.orderInfo.customerName?.trim() &&
      this.orderInfo.phone?.trim() &&
      this.orderInfo.address?.trim() &&
      this.cartItems.length > 0
    );
  }

  private updateOrderItems() {
    this.orderInfo.items = this.cartItems;
    this.orderInfo.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  async placeOrder() {
    if (!this.isFormValid()) {
      return;
    }

    try {
      this.orderInfo.orderDate = new Date();
      const orderId = this.orderService.encodeOrder(this.orderInfo);
      this.orderService.clearCart();

      // Navigate to order detail page with success flag
      this.router.navigate(['/order', orderId], {
        queryParams: { success: 'true' }
      });

      return orderId;
    } catch (error) {
      // Show error if order creation fails
      await this.confirmationService.showError(
        'Lỗi đặt hàng',
        'Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.'
      );

      return null;
    }
  }
}
