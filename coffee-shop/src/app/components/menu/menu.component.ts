import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbTabsetModule } from '@nebular/theme';
import { MenuService, MenuCategory } from '../../services/menu.service';
import { MenuListComponent } from '../menu-list/menu-list.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    NbTabsetModule,
    MenuListComponent
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuCategories: MenuCategory[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.getMenu().subscribe(categories => {
      this.menuCategories = categories;
    });
  }
} 