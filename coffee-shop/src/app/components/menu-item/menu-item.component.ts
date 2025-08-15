import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { MenuItem } from '../../models/menu.model';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule
  ],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input() item!: MenuItem;
  @Input() quantity: number = 1;
  @Output() addToCart = new EventEmitter<{ item: MenuItem, quantity: number }>();

  onAddToCart(): void {
    if (this.quantity > 0) {
      this.addToCart.emit({ item: this.item, quantity: this.quantity });
    }
  }
} 