import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  NbCardModule, 
  NbButtonModule, 
  NbIconModule, 
  NbInputModule,
  NbFormFieldModule 
} from '@nebular/theme';
import { MenuItem } from '../../models/menu.model';
import { ViewMode } from '../../services/menu.service';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbFormFieldModule
  ],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements AfterViewInit {
  @Input() item!: MenuItem;
  @Input() quantity: number = 1;
  @Input() viewMode: ViewMode = 'grid';
  @Output() addToCart = new EventEmitter<{ item: MenuItem, quantity: number, element: HTMLElement }>();
  @ViewChild('addToCartBtn', { static: true }) addToCartBtn!: ElementRef;

  private buttonElement: HTMLElement | null = null;

  ngAfterViewInit() {
    this.buttonElement = this.addToCartBtn.nativeElement;
  }

  onAddToCart(): void {
    if (this.quantity > 0 && this.buttonElement) {
      this.addToCart.emit({ 
        item: this.item, 
        quantity: this.quantity,
        element: this.buttonElement
      });
    }
  }
} 