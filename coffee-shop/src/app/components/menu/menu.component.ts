import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { OrderService } from '../../services/order.service';
import { MenuService } from '../../services/menu.service';
import { CartAnimationService } from '../../services/cart-animation.service';
import { MenuItem, Category, ViewMode, SortOption, GroupedMenuItem } from '../../models/menu.model';
import { BehaviorSubject, combineLatest, firstValueFrom } from 'rxjs';
import { MenuFilterComponent } from '../menu-filter/menu-filter.component';

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
    MenuItemComponent,
    MenuFilterComponent // Add the new component here
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  categories: Category[] = [];
  viewMode: ViewMode = 'grid';
  sortOption: SortOption = 'default';
  filteredItems: MenuItem[] = [];
  groupedItems: GroupedMenuItem[] = [];
  searchTerm = '';
  selectedCategory = 'all';

  private sortOptionSubject = new BehaviorSubject<SortOption>('default');
  private viewModeSubject = new BehaviorSubject<ViewMode>('grid');

  readonly sortOptions = [
    { label: 'Mặc định', value: 'default' },
    { label: 'Giá tăng dần', value: 'price_asc' },
    { label: 'Giá giảm dần', value: 'price_desc' }
  ];

  constructor(
    private menuService: MenuService,
    private orderService: OrderService,
    private cartAnimationService: CartAnimationService
  ) {}

  ngOnInit() {
    // Subscribe to menu data
    this.menuService.categories$.subscribe(categories => {
      this.categories = categories;
    });

    // Combine all filter changes
    combineLatest([
      this.menuService.menuItems$,
      this.sortOptionSubject,
      this.viewModeSubject
    ]).subscribe(([items, sort, view]) => {
      this.sortOption = sort;
      this.viewMode = view;
      this.updateFilteredItems(items);
    });
  }

  get selectedSortLabel(): string {
    const selectedOption = this.sortOptions.find(opt => opt.value === this.sortOption);
    return selectedOption?.label || 'Sắp xếp';
  }

  onSort(event: { value: SortOption }): void {
    this.sortOptionSubject.next(event.value);
  }

  selectCategory(categoryId: string): void {
    this.menuService.getItemsByCategory(categoryId).subscribe(items => {
      this.updateFilteredItems(items);
    });
  }

  resetFilters(): void {
    this.sortOptionSubject.next('default');
    this.viewMode = 'grid'; // Reset view mode
  }

  onAddToCart(event: { item: MenuItem, element: HTMLElement, quantity: number }): void {
    const { item, element, quantity } = event;
    
    // Add to cart with specified quantity
    this.orderService.addToCart({
      id: item.id,
      name: item.name,
      price: item.originalPrice,
      description: item.description,
      image: item.image
    }, quantity);

    // Animate
    if (element) {
      const cartIcon = document.querySelector('.cart-link .pi-shopping-cart') as HTMLElement;
      if (cartIcon) {
        this.cartAnimationService.animateAddToCart(element);
      }
    }
  }

  async onSearchTermChange(searchTerm: string): Promise<void> {
    this.searchTerm = searchTerm;
    const items = await firstValueFrom(this.menuService.menuItems$);
    this.updateFilteredItems(items);
  }

  async onCategoryChange(categoryId: string): Promise<void> {
    this.selectedCategory = categoryId;
    const items = await firstValueFrom(this.menuService.menuItems$);
    this.updateFilteredItems(items);
  }

  private updateFilteredItems(items: MenuItem[]): void {
    let filteredItems = items;

    // Filter by category
    if (this.selectedCategory === 'recommended') {
      filteredItems = filteredItems.filter(item => item.recommended);
    } else if (this.selectedCategory !== 'all') {
      filteredItems = filteredItems.filter(item => item.categoryId === this.selectedCategory);
    }

    // Apply search filter
    if (this.searchTerm) {
      filteredItems = this.menuService.filterItems(filteredItems, this.searchTerm);
    }

    // Apply sort
    this.filteredItems = this.menuService.sortItems(filteredItems, this.sortOption);
    
    // Group items by category
    this.groupedItems = this.groupItemsByCategory(this.filteredItems);
  }

  private groupItemsByCategory(items: MenuItem[]): GroupedMenuItem[] {
    const grouped: { [categoryId: string]: MenuItem[] } = {};

    // Group items by categoryId
    items.forEach(item => {
      if (!grouped[item.categoryId]) {
        grouped[item.categoryId] = [];
      }
      grouped[item.categoryId].push(item);
    });

    // Convert to GroupedMenuItem array with category details
    return Object.keys(grouped).map(categoryId => {
      const category = this.categories.find(cat => cat.id === categoryId);
      return {
        category: category || { id: categoryId, name: categoryId, description: '', image: '' },
        items: grouped[categoryId]
      };
    }).filter(group => group.category && group.items.length > 0);
  }
} 