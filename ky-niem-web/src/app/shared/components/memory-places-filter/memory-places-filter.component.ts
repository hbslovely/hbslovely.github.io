import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-memory-places-filter',
  templateUrl: './memory-places-filter.component.html',
  styleUrls: [ './memory-places-filter.component.scss' ],
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  animations: [
    trigger('expandCollapse', [
      state('expanded', style({ height: '*', opacity: 1 })),
      state('collapsed', style({ height: '0', opacity: 0 })),
      transition('expanded <=> collapsed', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class MemoryPlacesFilterComponent {
  @Input() locationTypes: any[] = [];
  @Input() regions: any[] = [];
  @Input() features: any[] = [];
  @Input() selectedFilters: any = {};
  @Input() searchText: string = '';
  @Input() isResetting: boolean = false;

  @Output() filterChange = new EventEmitter<{ type: string, value: string }>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() resetFilters = new EventEmitter<void>();

  isExpanded: boolean = true;

  hasActiveFilters(): boolean {
    return this.selectedFilters.locationType.length > 0 ||
      this.selectedFilters.region.length > 0 ||
      this.selectedFilters.features.length > 0 ||
      !!this.searchText;
  }

  onSearchInput(event: any): void {
    this.searchText = event.target.value;
    this.searchChange.emit(this.searchText);
  }

  onSearchClear(): void {
    this.searchText = '';
    this.searchChange.emit(this.searchText);
  }

  toggleFilter(type: string, value: string): void {
    this.filterChange.emit({ type, value });
  }

  onResetFilters(): void {
    this.resetFilters.emit();
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  getActiveFiltersCount(): number {
    return (
      this.selectedFilters.locationType.length +
      this.selectedFilters.region.length +
      this.selectedFilters.features.length +
      (this.searchText ? 1 : 0)
    );
  }
}
