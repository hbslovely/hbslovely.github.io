import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { WardCardComponent } from './components/ward-card/ward-card.component';
import { WardListItemComponent } from './components/ward-list-item/ward-list-item.component';
import { CommonModule } from '@angular/common';
import { WardsService, Ward } from '../../../../core';

@Component({
  selector: 'app-wards',
  templateUrl: './wards.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    WardCardComponent,
    WardListItemComponent
  ],
  styleUrls: ['./wards.component.scss']
})
export class WardsComponent implements OnInit {
  wards: Ward[] = [];
  filteredWards: Ward[] = [];
  displayedWards: Ward[] = [];
  searchTerm: string = '';
  selectedFeatures: string[] = [];
  selectedType: string = '';
  selectedCultures: string[] = [];
  
  // View type
  isGridView: boolean = true;
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalItems: number = 0;
  pageSizeOptions: number[] = [12, 24, 48];

  features: string[] = [
    'FEATURES.HISTORIC_SITE',
    'FEATURES.CULTURAL_HERITAGE',
    'FEATURES.COMMERCIAL_HUB',
    'FEATURES.RESIDENTIAL_AREA',
    'FEATURES.INDUSTRIAL_ZONE',
    'FEATURES.TOURIST_ATTRACTION',
    'FEATURES.WATERFRONT',
    'FEATURES.GREEN_SPACE',
    'FEATURES.EDUCATION_HUB',
    'FEATURES.TRADITIONAL_MARKET'
  ];

  cultures: string[] = [
    'VIETNAMESE',
    'CHINESE',
    'FRENCH_COLONIAL',
    'MODERN'
  ];

  wardTypes: string[] = [
    'WARD_TYPES.URBAN',
    'WARD_TYPES.SUBURBAN',
    'WARD_TYPES.RURAL',
    'WARD_TYPES.SPECIAL'
  ];

  constructor(
    private wardsService: WardsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadWards();
    this.setupFilters();
    this.translate.onLangChange.subscribe(() => {
      this.loadWards();
    });
  }

  private loadWards() {
    this.wardsService.getWards(this.translate.currentLang)
      .subscribe(wards => {
        this.wards = wards;
        this.filterWards();
      });
  }

  private setupFilters() {
    this.filterWards();
  }

  // Helper function to normalize Vietnamese text
  private normalizeVietnamese(str: string): string {
    return str.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  filterWards() {
    this.filteredWards = this.wards.filter(ward => {
      const searchNormalized = this.normalizeVietnamese(this.searchTerm);
      const nameNormalized = this.normalizeVietnamese(ward.name);
      const descNormalized = this.normalizeVietnamese(ward.description);

      const matchesSearch = !this.searchTerm ||
        nameNormalized.includes(searchNormalized) ||
        descNormalized.includes(searchNormalized) ||
        ward.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ward.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesFeatures = this.selectedFeatures.length === 0 ||
        this.selectedFeatures.some(feature => ward.features.includes(feature));

      const matchesType = !this.selectedType ||
        ward.type === this.selectedType;

      const matchesCulture = this.selectedCultures.length === 0 ||
        this.selectedCultures.some(culture => ward.cultures?.includes(culture));

      return matchesSearch && matchesFeatures && matchesType && matchesCulture;
    });
    
    this.totalItems = this.filteredWards.length;
    this.updateDisplayedWards();
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedFeatures = [];
    this.selectedType = '';
    this.selectedCultures = [];
    this.filterWards();
  }

  toggleFeature(feature: string) {
    const index = this.selectedFeatures.indexOf(feature);
    if (index === -1) {
      this.selectedFeatures.push(feature);
    } else {
      this.selectedFeatures.splice(index, 1);
    }
    this.filterWards();
  }

  isFeatureSelected(feature: string): boolean {
    return this.selectedFeatures.includes(feature);
  }

  toggleCulture(culture: string) {
    const index = this.selectedCultures.indexOf(culture);
    if (index === -1) {
      this.selectedCultures.push(culture);
    } else {
      this.selectedCultures.splice(index, 1);
    }
    this.filterWards();
  }

  isCultureSelected(culture: string): boolean {
    return this.selectedCultures.includes(culture);
  }

  // Pagination methods
  updateDisplayedWards() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedWards = this.filteredWards.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateDisplayedWards();
  }

  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reset to first page
    this.updateDisplayedWards();
  }

  handlePageChange(page: string | number) {
    if (typeof page === 'number') {
      this.onPageChange(page);
    }
  }

  // View type methods
  toggleView() {
    this.isGridView = !this.isGridView;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      // If total pages is less than max visible, show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (this.currentPage > 3) {
        pages.push('...');
      }
      
      // Calculate start and end of middle section
      let start = Math.max(2, this.currentPage - 1);
      let end = Math.min(this.totalPages - 1, this.currentPage + 1);
      
      // Adjust if at the start or end
      if (this.currentPage <= 3) {
        end = 4;
      }
      if (this.currentPage >= this.totalPages - 2) {
        start = this.totalPages - 3;
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis and last page if needed
      if (this.currentPage < this.totalPages - 2) {
        pages.push('...');
      }
      pages.push(this.totalPages);
    }
    
    return pages;
  }
}
