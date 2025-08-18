import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/menu.model';

@Component({
  selector: 'app-menu-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.scss']
})
export class MenuFilterComponent {
  @Input() categories: Category[] = [];
  selectedCategory = 'all';
  searchTerm = '';

  @Output() searchTermChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.searchTermChange.emit(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchTermChange.emit(this.searchTerm);
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.categoryChange.emit(this.selectedCategory);
  }
}
