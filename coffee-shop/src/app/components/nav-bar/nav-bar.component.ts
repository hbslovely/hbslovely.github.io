import { Component, OnInit } from '@angular/core';
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

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.cartItems$.subscribe((items: CartItem[]) => {
      this.cartItemCount = items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
    });
  }
} 