import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { OrderService } from '../../services/order.service';
import { CartAnimationService } from '../../services/cart-animation.service';
import { MenuData, MenuItem, ViewMode, SortOption } from '../../models/menu.model';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    MenuItemComponent
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuData: MenuData | null = null;
  selectedCategory = 'all';
  viewMode: ViewMode = 'grid';
  searchTerm = '';
  sortOption: SortOption = 'default';
  filteredItems: MenuItem[] = [];

  private searchTermSubject = new BehaviorSubject<string>('');
  private sortOptionSubject = new BehaviorSubject<SortOption>('default');
  private viewModeSubject = new BehaviorSubject<ViewMode>('grid');

  readonly sortOptions = [
    { label: 'Mặc định', value: 'default' },
    { label: 'Giá tăng dần', value: 'price_asc' },
    { label: 'Giá giảm dần', value: 'price_desc' }
  ];

  constructor(
    private orderService: OrderService,
    private cartAnimationService: CartAnimationService
  ) {}

  ngOnInit() {
    // Combine all filter changes
    combineLatest([
      this.searchTermSubject,
      this.sortOptionSubject,
      this.viewModeSubject
    ]).pipe(
      map(([search, sort, view]) => {
        this.searchTerm = search;
        this.sortOption = sort;
        this.viewMode = view;
        this.updateFilteredItems();
      })
    ).subscribe();
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTermSubject.next(input.value);
  }

  onSort(event: { value: SortOption }): void {
    this.sortOptionSubject.next(event.value);
  }

  setViewMode(mode: ViewMode): void {
    this.viewModeSubject.next(mode);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.updateFilteredItems();
  }

  resetFilters(): void {
    this.searchTermSubject.next('');
    this.sortOptionSubject.next('default');
    this.selectedCategory = 'all';
    this.updateFilteredItems();
  }

  onAddToCart(event: { item: MenuItem, element: HTMLElement }): void {
    const { item, element } = event;
    
    // Add to cart
    this.orderService.addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image
    });

    // Animate
    if (element) {
      this.cartAnimationService.animateAddToCart(element);
    }
  }

  private updateFilteredItems(): void {
    if (!this.menuData) return;

    let items = this.menuData.items;

    // Filter by category
    if (this.selectedCategory !== 'all') {
      items = items.filter(item => 
        this.selectedCategory === 'recommended' 
          ? item.recommended 
          : item.category === this.selectedCategory
      );
    }

    // Filter by search term
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort items
    switch (this.sortOption) {
      case 'price_asc':
        items = [...items].sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        items = [...items].sort((a, b) => b.price - a.price);
        break;
      default:
        // Keep original order
        break;
    }

    this.filteredItems = items;
  }
} 