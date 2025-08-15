import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { MenuItem } from '../../models/menu.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule
  ],
  template: `
    <div class="menu-container">
      <h2 class="menu-title">Our Menu</h2>
      <div class="menu-grid">
        @for (item of menuItems; track item.id) {
          <nb-card class="menu-item">
            @if (item.image) {
              <nb-card-header>
                <img [src]="item.image" [alt]="item.name">
              </nb-card-header>
            }
            <nb-card-body>
              <h3>{{ item.name }}</h3>
              <p class="description">{{ item.description }}</p>
              <p class="price">{{ item.price | currency:'VND':'symbol':'1.0-0' }}</p>
              <div class="actions">
                <input nbInput type="number" [(ngModel)]="item.tempQuantity" min="1" max="99">
                <button nbButton status="primary" (click)="addToCart(item)">
                  <nb-icon icon="shopping-cart-outline"></nb-icon>
                  Add to Cart
                </button>
              </div>
            </nb-card-body>
          </nb-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .menu-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .menu-title {
      font-family: 'Timberline', sans-serif;
      text-align: center;
      font-size: 3rem;
      margin-bottom: 2rem;
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }

    .menu-item {
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-5px);
      }

      nb-card-header {
        padding: 0;
        overflow: hidden;

        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
      }
    }

    .description {
      color: #666;
      margin: 1rem 0;
    }

    .price {
      font-size: 1.2rem;
      font-weight: bold;
      color: #2a2a2a;
    }

    .actions {
      display: flex;
      gap: 1rem;
      align-items: center;

      input {
        width: 80px;
      }
    }
  `]
})
export class MenuComponent implements OnInit {
  menuItems: (MenuItem & { tempQuantity?: number })[] = [
    {
      id: '1',
      name: 'Cà phê sữa đá',
      description: 'Vietnamese iced coffee with condensed milk',
      price: 29000,
      category: 'coffee',
      image: 'assets/images/ca-phe-sua-da.jpg'
    },
    {
      id: '2',
      name: 'Cà phê đen đá',
      description: 'Vietnamese black iced coffee',
      price: 25000,
      category: 'coffee',
      image: 'assets/images/ca-phe-den-da.jpg'
    },
    {
      id: '3',
      name: 'Bạc xỉu',
      description: 'White coffee with condensed milk',
      price: 32000,
      category: 'coffee',
      image: 'assets/images/bac-xiu.jpg'
    },
    // Add more menu items as needed
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.menuItems = this.menuItems.map(item => ({ ...item, tempQuantity: 1 }));
  }

  addToCart(item: MenuItem & { tempQuantity?: number }) {
    if (item.tempQuantity && item.tempQuantity > 0) {
      this.orderService.addToCart(item, item.tempQuantity);
      item.tempQuantity = 1; // Reset quantity after adding to cart
    }
  }
} 