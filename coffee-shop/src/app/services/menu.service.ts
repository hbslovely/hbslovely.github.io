import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MenuItem } from '../models/menu.model';

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

export interface MenuData {
  categories: MenuCategory[];
  recommended: MenuItem[];
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'name' | 'price-asc' | 'price-desc';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private viewMode = new BehaviorSubject<ViewMode>('grid');
  private sortOption = new BehaviorSubject<SortOption>('name');
  private searchTerm = new BehaviorSubject<string>('');

  readonly defaultCategories: MenuCategory[] = [
    {
      id: 'recommended',
      name: 'Món được yêu thích',
      icon: 'star-outline',
      items: []
    },
    {
      id: 'coffee',
      name: 'Cà phê',
      icon: 'coffee-outline',
      items: []
    },
    {
      id: 'tea',
      name: 'Trà',
      icon: 'leaf-outline',
      items: []
    },
    {
      id: 'milk-tea',
      name: 'Trà sữa',
      icon: 'color-palette-outline',
      items: []
    },
    {
      id: 'snacks',
      name: 'Ăn vặt',
      icon: 'restaurant-outline',
      items: []
    }
  ];

  constructor(private http: HttpClient) {}

  getMenu(): Observable<MenuCategory[]> {
    return this.http.get<MenuData>('assets/json/menu.json').pipe(
      map(data => {
        // Map items to categories
        const categorizedItems = this.defaultCategories.map(category => ({
          ...category,
          items: data.categories.find(c => c.id === category.id)?.items || []
        }));

        // Add recommended items to the first category
        categorizedItems[0].items = data.recommended || [];

        return categorizedItems;
      })
    );
  }

  getMenuItemsByCategory(categoryId: string): Observable<MenuItem[]> {
    return this.getMenu().pipe(
      map(categories => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.items : [];
      })
    );
  }

  getAllMenuItems(): Observable<MenuItem[]> {
    return this.getMenu().pipe(
      map(categories => 
        categories.reduce((items, category) => [...items, ...category.items], [] as MenuItem[])
      )
    );
  }

  // View mode management
  setViewMode(mode: ViewMode) {
    this.viewMode.next(mode);
  }

  getViewMode(): Observable<ViewMode> {
    return this.viewMode.asObservable();
  }

  // Sort option management
  setSortOption(option: SortOption) {
    this.sortOption.next(option);
  }

  getSortOption(): Observable<SortOption> {
    return this.sortOption.asObservable();
  }

  // Search term management
  setSearchTerm(term: string) {
    this.searchTerm.next(term);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm.asObservable();
  }

  // Helper function to sort items
  sortItems(items: MenuItem[], option: SortOption): MenuItem[] {
    switch (option) {
      case 'name':
        return [...items].sort((a, b) => a.name.localeCompare(b.name, 'vi'));
      case 'price-asc':
        return [...items].sort((a, b) => a.originalPrice - b.originalPrice);
      case 'price-desc':
        return [...items].sort((a, b) => b.originalPrice - a.originalPrice);
      default:
        return items;
    }
  }

  // Helper function to filter items
  filterItems(items: MenuItem[], searchTerm: string): MenuItem[] {
    if (!searchTerm.trim()) return items;
    
    const normalizedTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return items.filter(item => {
      const normalizedName = item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const normalizedDesc = item.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return normalizedName.includes(normalizedTerm) || normalizedDesc.includes(normalizedTerm);
    });
  }
} 