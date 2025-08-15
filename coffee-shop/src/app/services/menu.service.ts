import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { MenuItem, Category, ViewMode, SortOption } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly categories = new BehaviorSubject<Category[]>([]);
  private readonly menuItems = new BehaviorSubject<MenuItem[]>([]);

  readonly categories$ = this.categories.asObservable();
  readonly menuItems$ = this.menuItems.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData(): void {
    // Load both files in parallel
    combineLatest([
      this.http.get<{ categories: Category[] }>('assets/json/category.json'),
      this.http.get<{ items: MenuItem[] }>('assets/json/menu.json')
    ]).subscribe({
      next: ([categoryData, menuData]) => {
        this.categories.next(categoryData.categories);
        this.menuItems.next(menuData.items);
      },
      error: error => console.error('Error loading menu data:', error)
    });
  }

  getItemsByCategory(categoryId: string): Observable<MenuItem[]> {
    return this.menuItems$.pipe(
      map(items => items.filter(item => item.categoryId === categoryId))
    );
  }

  getRecommendedItems(): Observable<MenuItem[]> {
    return this.menuItems$.pipe(
      map(items => items.filter(item => item.recommended))
    );
  }

  getAllItems(): Observable<MenuItem[]> {
    return this.menuItems$;
  }

  getCategoryById(categoryId: string): Observable<Category | undefined> {
    return this.categories$.pipe(
      map(categories => categories.find(cat => cat.id === categoryId))
    );
  }

  filterItems(items: MenuItem[], searchTerm: string): MenuItem[] {
    if (!searchTerm) return items;

    const searchLower = this.normalizeText(searchTerm);
    return items.filter(item => {
      const normalizedName = this.normalizeText(item.name);
      const normalizedDesc = this.normalizeText(item.description);
      return normalizedName.includes(searchLower) || 
             normalizedDesc.includes(searchLower);
    });
  }

  sortItems(items: MenuItem[], sortOption: SortOption): MenuItem[] {
    switch (sortOption) {
      case 'price_asc':
        return [...items].sort((a, b) => a.originalPrice - b.originalPrice);
      case 'price_desc':
        return [...items].sort((a, b) => b.originalPrice - a.originalPrice);
      default:
        return items;
    }
  }

  private normalizeText(text: string): string {
    return text.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }
} 