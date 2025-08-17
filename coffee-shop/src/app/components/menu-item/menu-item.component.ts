import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { BadgeModule } from 'primeng/badge';
import { MenuItem, ViewMode } from '../../models/menu.model';
import { OrderService } from '../../services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputNumberModule,
    BadgeModule
  ],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() item!: MenuItem;
  @Input() viewMode: ViewMode = 'grid';
  @Output() addToCart = new EventEmitter<{ item: MenuItem, element: HTMLElement, quantity: number }>();
  @ViewChild('addToCartBtn') addToCartBtn?: ElementRef;

  quantity = 1;
  currentQuantityInCart = 0;
  isInCart = false;
  isAdding = false;
  
  private buttonElement: HTMLElement | null = null;
  private cartSubscription?: Subscription;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    // Subscribe to cart changes to update current quantity
    this.cartSubscription = this.orderService.cartItems$.subscribe(cartItems => {
      const cartItem = cartItems.find(ci => ci.id === this.item.id);
      this.currentQuantityInCart = cartItem ? cartItem.quantity : 0;
      this.isInCart = !!cartItem;
    });
  }

  ngAfterViewInit() {
    this.updateButtonElement();
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  private updateButtonElement(): void {
    if (this.addToCartBtn?.nativeElement) {
      this.buttonElement = this.addToCartBtn.nativeElement;
    }
  }

  private createFlyingAnimation(sourceElement: HTMLElement, quantity: number): void {
    const cartIcon = document.querySelector('.cart-link .pi-shopping-cart') as HTMLElement;
    if (!cartIcon || !sourceElement) return;

    const flyingContainer = document.querySelector('.flying-elements-container') as HTMLElement;
    if (!flyingContainer) return;

    for (let i = 0; i < Math.min(quantity, 5); i++) {
      setTimeout(() => {
        this.createSingleFlyingElement(sourceElement, cartIcon, flyingContainer, i);
      }, i * 100);
    }
  }

  private createSingleFlyingElement(
    sourceElement: HTMLElement, 
    cartIcon: HTMLElement, 
    container: HTMLElement,
    index: number
  ): void {
    const flyingElement = document.createElement('div');
    flyingElement.className = 'flying-element';
    
    // Get positions
    const sourceRect = sourceElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Calculate relative positions
    const startX = sourceRect.left + sourceRect.width / 2 - containerRect.left;
    const startY = sourceRect.top + sourceRect.height / 2 - containerRect.top;
    const endX = cartRect.left + cartRect.width / 2 - containerRect.left;
    const endY = cartRect.top + cartRect.height / 2 - containerRect.top;
    
    // Add slight randomness for multiple items
    const randomOffset = index * 8;
    const offsetX = (Math.random() - 0.5) * randomOffset;
    const offsetY = (Math.random() - 0.5) * randomOffset;
    
    // Style the flying element
    Object.assign(flyingElement.style, {
      position: 'absolute',
      left: `${startX + offsetX}px`,
      top: `${startY + offsetY}px`,
      width: '20px',
      height: '20px',
      background: 'linear-gradient(135deg, var(--primary-color), #8B4513)',
      borderRadius: '50%',
      zIndex: '9999',
      pointerEvents: 'none',
      boxShadow: '0 4px 12px rgba(139, 69, 19, 0.4)',
      transition: 'none'
    });
    
    container.appendChild(flyingElement);
    
    // Animate to cart
    requestAnimationFrame(() => {
      const duration = 800 + (index * 100);
      flyingElement.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      flyingElement.style.left = `${endX}px`;
      flyingElement.style.top = `${endY}px`;
      flyingElement.style.transform = 'scale(0.1)';
      flyingElement.style.opacity = '0';
      
      // Remove element after animation
      setTimeout(() => {
        if (flyingElement.parentNode) {
          flyingElement.parentNode.removeChild(flyingElement);
        }
        
        // Add cart bounce effect on last element
        if (index === 0) {
          this.addCartBounceEffect(cartIcon);
        }
      }, duration);
    });
  }

  private addCartBounceEffect(cartIcon: HTMLElement): void {
    cartIcon.style.animation = 'none';
    cartIcon.offsetHeight; // Trigger reflow
    cartIcon.style.animation = 'cartBounce 0.6s ease-in-out';
    
    setTimeout(() => {
      cartIcon.style.animation = '';
    }, 600);
  }

  onAddToCart(): void {
    if (this.isAdding) return;
    
    // Try to get button element if not already set
    if (!this.buttonElement) {
      this.updateButtonElement();
    }
    
    this.isAdding = true;
    
    // Add animation feedback if button element exists
    if (this.buttonElement) {
      this.buttonElement.style.transform = 'scale(0.95)';
    }
    
    // Create flying animation
    if (this.buttonElement) {
      this.createFlyingAnimation(this.buttonElement, this.quantity);
    }
    
    setTimeout(() => {
      this.addToCart.emit({
        item: this.item,
        element: this.buttonElement || document.createElement('div'),
        quantity: this.quantity
      });
      
      // Reset button animation
      if (this.buttonElement) {
        this.buttonElement.style.transform = '';
      }
      this.isAdding = false;
      
      // Reset quantity to 1 after adding
      this.quantity = 1;
    }, 150);
  }

  onQuickAdd(): void {
    if (this.isAdding) return;
    
    this.isAdding = true;
    
    // Find quick add button for animation
    const quickAddBtn = document.querySelector('.quick-add-btn') as HTMLElement;
    if (quickAddBtn) {
      this.createFlyingAnimation(quickAddBtn, 1);
    }
    
    this.addToCart.emit({
      item: this.item,
      element: quickAddBtn || document.createElement('div'),
      quantity: 1
    });
    
    setTimeout(() => {
      this.isAdding = false;
    }, 300);
  }

  onIncreaseInCart(): void {
    // Find the increase button for animation
    const increaseBtn = document.querySelector('.qty-control-btn.increase') as HTMLElement;
    if (increaseBtn) {
      this.createFlyingAnimation(increaseBtn, 1);
    }
    
    this.orderService.increaseQuantity(this.item.id);
  }

  onDecreaseInCart(): void {
    this.orderService.decreaseQuantity(this.item.id);
  }

  onRemoveFromCart(): void {
    this.orderService.removeFromCart(this.item.id);
  }

  getAddToCartLabel(): string {
    if (this.isAdding) return 'Đang thêm...';
    if (this.isInCart) return 'Thêm nữa';
    return 'Thêm vào giỏ';
  }

  getTotalPrice(): number {
    return this.item.originalPrice * this.quantity;
  }

  increaseQuantity(): void {
    if (this.quantity < 99) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
