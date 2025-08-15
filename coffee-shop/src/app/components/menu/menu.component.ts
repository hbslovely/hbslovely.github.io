import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  NbButtonModule,
  NbIconModule,
  NbFormFieldModule,
  NbInputModule,
  NbSelectModule
} from '@nebular/theme';
import { MenuService, MenuCategory, ViewMode, SortOption } from '../../services/menu.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuItem } from '../../models/menu.model';
import { OrderService } from '../../services/order.service';
import { CartAnimationService } from '../../services/cart-animation.service';
import { combineLatest } from 'rxjs';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NbButtonModule,
    NbIconModule,
    NbFormFieldModule,
    NbInputModule,
    NbSelectModule,
    MenuItemComponent
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuCategories: MenuCategory[] = [];
  selectedCategory: MenuCategory | null = null;
  filteredItems: MenuItem[] = [];
  viewMode: ViewMode = 'grid';
  sortOption: SortOption = 'name';
  searchTerm: string = '';

  @ViewChild(NavBarComponent) navBar!: NavBarComponent;

  constructor(
    private menuService: MenuService,
    private orderService: OrderService,
    private cartAnimationService: CartAnimationService
  ) {}

  ngOnInit() {
    // Subscribe to menu data and filter/sort options
    combineLatest([
      this.menuService.getMenu(),
      this.menuService.getViewMode(),
      this.menuService.getSortOption(),
      this.menuService.getSearchTerm()
    ]).subscribe(([categories, viewMode, sortOption, searchTerm]) => {
      this.menuCategories = categories;
      this.viewMode = viewMode;
      this.sortOption = sortOption;
      this.searchTerm = searchTerm;
      
      if (!this.selectedCategory) {
        this.selectedCategory = categories[0];
      }
      
      this.updateFilteredItems();
    });
  }

  selectCategory(category: MenuCategory) {
    this.selectedCategory = category;
    this.updateFilteredItems();
  }

  setViewMode(mode: ViewMode) {
    this.menuService.setViewMode(mode);
  }

  onSort(option: SortOption) {
    this.menuService.setSortOption(option);
    this.updateFilteredItems();
  }

  onSearch(term: string) {
    this.menuService.setSearchTerm(term);
    this.updateFilteredItems();
  }

  onAddToCart(event: { item: MenuItem, quantity: number, element: HTMLElement }) {
    // Add to cart
    this.orderService.addToCart(
      { ...event.item, price: event.item.originalPrice },
      event.quantity
    );

    // Get the cart icon from the nav bar
    const cartIcon = document.querySelector('.cart-link nb-icon');
    if (cartIcon && event.element) {
      this.cartAnimationService.animateAddToCart(event.element, cartIcon as HTMLElement);
    }
  }

  resetFilters() {
    this.searchTerm = '';
    this.sortOption = 'name';
    this.menuService.setSearchTerm('');
    this.menuService.setSortOption('name');
  }

  private updateFilteredItems() {
    if (!this.selectedCategory) return;

    let items = this.selectedCategory.items;
    items = this.menuService.filterItems(items, this.searchTerm);
    items = this.menuService.sortItems(items, this.sortOption);
    this.filteredItems = items;
  }
} 