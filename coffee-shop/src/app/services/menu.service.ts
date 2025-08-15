import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuData, MenuItem, ViewMode, SortOption } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly menuData = new BehaviorSubject<MenuData | null>(null);
  readonly menuData$ = this.menuData.asObservable();

  constructor(private http: HttpClient) {
    this.loadMenu();
  }

  private loadMenu(): void {
    this.http.get<MenuItem[]>('assets/json/menu.json')
      .pipe(
        map(items => {
          // Extract unique categories
          const categories = [...new Set(items.map(item => item.category))];
          
          return {
            categories,
            items
          };
        })
      )
      .subscribe(
        menuData => this.menuData.next(menuData),
        error => console.error('Error loading menu:', error)
      );
  }

  filterItems(items: MenuItem[], searchTerm: string): MenuItem[] {
    if (!searchTerm) return items;

    const normalizedSearch = this.normalizeText(searchTerm);
    return items.filter(item => {
      const normalizedName = this.normalizeText(item.name);
      const normalizedDescription = this.normalizeText(item.description);
      return normalizedName.includes(normalizedSearch) || 
             normalizedDescription.includes(normalizedSearch);
    });
  }

  sortItems(items: MenuItem[], sortOption: SortOption): MenuItem[] {
    switch (sortOption) {
      case 'price_asc':
        return [...items].sort((a, b) => a.price - b.price);
      case 'price_desc':
        return [...items].sort((a, b) => b.price - a.price);
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