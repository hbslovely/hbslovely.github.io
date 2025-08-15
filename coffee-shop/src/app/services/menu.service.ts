import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MenuItem } from '../models/menu.model';

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuData {
  categories: MenuCategory[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient) {}

  getMenu(): Observable<MenuCategory[]> {
    return this.http.get<MenuData>('assets/json/menu.json')
      .pipe(
        map(data => data.categories)
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
} 