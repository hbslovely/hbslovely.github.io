import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbIconModule, NbBadgeModule } from '@nebular/theme';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NbThemeModule,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    NbBadgeModule
  ],
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <div class="header-container">
          <a class="logo" routerLink="/">Coffee Shop</a>
          <a routerLink="/cart" class="cart-link">
            <nb-icon icon="shopping-cart-outline"></nb-icon>
            @if (cartItemCount > 0) {
              <nb-badge [text]="cartItemCount.toString()" status="danger" position="top right"></nb-badge>
            }
          </a>
        </div>
      </nb-layout-header>

      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <div class="footer-container">
          <p>&copy; 2024 Coffee Shop. All rights reserved.</p>
        </div>
      </nb-layout-footer>
    </nb-layout>
  `,
  styles: [`
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .logo {
      font-family: 'Timberline', sans-serif;
      font-size: 1.5rem;
      color: inherit;
      text-decoration: none;
    }

    .cart-link {
      position: relative;
      color: inherit;
      text-decoration: none;
      font-size: 1.5rem;
    }

    .footer-container {
      text-align: center;
      padding: 1rem;
    }

    :host {
      nb-layout-header {
        background-color: #ffffff;
      }

      nb-layout-footer {
        background-color: #f5f5f5;
      }
    }
  `]
})
export class AppComponent {
  cartItemCount = 0;

  constructor(private orderService: OrderService) {
    this.orderService.getCartItems().subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }
}
