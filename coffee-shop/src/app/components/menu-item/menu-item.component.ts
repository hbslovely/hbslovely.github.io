import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { MenuItem, ViewMode } from '../../models/menu.model';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputNumberModule
  ],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements AfterViewInit {
  @Input() item!: MenuItem;
  @Input() viewMode: ViewMode = 'grid';
  @Output() addToCart = new EventEmitter<{ item: MenuItem, element: HTMLElement }>();
  @ViewChild('addToCartBtn', { static: true }) addToCartBtn!: ElementRef;

  quantity = 1;
  private buttonElement: HTMLElement | null = null;

  ngAfterViewInit() {
    this.buttonElement = this.addToCartBtn.nativeElement;
  }

  onAddToCart(): void {
    if (!this.buttonElement) return;
    
    this.addToCart.emit({
      item: this.item,
      element: this.buttonElement
    });
  }
}
