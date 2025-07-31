import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-memory-places-filter',
  templateUrl: './memory-places-filter.component.html',
  styleUrls: ['./memory-places-filter.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MemoryPlacesFilterComponent {
  @Input() locationTypes: any[] = [];
  @Input() regions: any[] = [];
  @Input() features: any[] = [];
  @Input() selectedFilters: any = {};
  @Input() searchText: string = '';
  @Input() isResetting: boolean = false;

  @Output() filterChange = new EventEmitter<{type: string, value: string}>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() resetFilters = new EventEmitter<void>();

  hasActiveFilters(): boolean {
    return this.selectedFilters.locationType.length > 0 ||
           this.selectedFilters.region.length > 0 ||
           this.selectedFilters.features.length > 0 ||
           !!this.searchText;
  }

  onSearch(event: any): void {
    this.searchChange.emit(this.searchText);
  }

  toggleFilter(type: string, value: string): void {
    this.filterChange.emit({type, value});
  }

  onResetFilters(): void {
    this.resetFilters.emit();
  }
} 