import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../models/menu.model';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    BadgeModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  cartItemCount = 0;
  isMobileMenuOpen = false;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.cartItems$.subscribe((items: CartItem[]) => {
      this.cartItemCount = items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const navContainer = target.closest('.nav-container');
    
    if (!navContainer && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
} 