import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/menu.model';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [
    CommonModule,
    MenuItemComponent
  ],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {
  @Input() items: MenuItem[] = [];
  itemQuantities: { [key: string]: number } = {};

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    // Initialize quantities for all items
    this.items.forEach(item => {
      this.itemQuantities[item.id] = 1;
    });
  }

  onAddToCart(event: { item: MenuItem, quantity: number }) {
    this.orderService.addToCart(
      { ...event.item, price: event.item.originalPrice },
      event.quantity
    );
    this.itemQuantities[event.item.id] = 1; // Reset quantity after adding to cart
  }
} 