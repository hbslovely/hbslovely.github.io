import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';

import { EntertainmentService, EntertainmentVenue } from '../../../../core/services/entertainment.service';
import { MapService } from '../../../../core/services/map.service';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    RatingModule,
    SelectButtonModule,
    TagModule
  ],
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  searchTerm = '';
  selectedDistrict = '';
  selectedCategory = '';
  selectedPriceRange = '';
  viewMode: 'grid' | 'map' = 'grid';
  showDetailsDialog = false;
  selectedVenue: EntertainmentVenue | null = null;
  filteredVenues: EntertainmentVenue[] = [];

  districts = [
    { label: 'District 1', value: 'district-1' },
    { label: 'District 2', value: 'district-2' },
    { label: 'District 3', value: 'district-3' },
    { label: 'District 4', value: 'district-4' },
    { label: 'District 5', value: 'district-5' }
  ];

  categories = [
    { label: 'Shopping Mall', value: 'mall' },
    { label: 'Market', value: 'market' },
    { label: 'Department Store', value: 'department-store' },
    { label: 'Boutique', value: 'boutique' },
    { label: 'Electronics', value: 'electronics' }
  ];

  priceRanges = [
    { label: 'Budget', value: 'low' },
    { label: 'Mid-range', value: 'medium' },
    { label: 'Luxury', value: 'high' }
  ];

  viewModes = [
    { icon: 'pi pi-th-large', value: 'grid' },
    { icon: 'pi pi-map', value: 'map' }
  ];

  constructor(
    private entertainmentService: EntertainmentService,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.entertainmentService.getVenuesByCategory('shopping').subscribe(venues => {
      this.filteredVenues = venues;
      if (this.viewMode === 'map') {
        this.initializeMap();
      }
    });
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  onViewModeChange() {
    if (this.viewMode === 'map') {
      setTimeout(() => {
        this.initializeMap();
        this.updateMap();
      });
    }
  }

  viewDetails(venue: EntertainmentVenue) {
    this.selectedVenue = venue;
    this.showDetailsDialog = true;
  }

  getCategorySeverity(category: string): string {
    const severities: { [key: string]: string } = {
      mall: 'info',
      market: 'success',
      'department-store': 'warning',
      boutique: 'danger',
      electronics: 'primary'
    };
    return severities[category] || 'info';
  }

  getFeatureIcon(feature: string): string {
    const icons: { [key: string]: string } = {
      parking: 'pi pi-car',
      wifi: 'pi pi-wifi',
      'food-court': 'pi pi-shopping-cart',
      'kids-area': 'pi pi-heart',
      atm: 'pi pi-credit-card'
    };
    return icons[feature] || 'pi pi-check';
  }

  getPriceLevelText(level: string): string {
    const texts: { [key: string]: string } = {
      low: '$ Budget',
      medium: '$$ Mid-range',
      high: '$$$ Luxury'
    };
    return texts[level] || level;
  }

  private applyFilters() {
    this.entertainmentService.filterVenues({
      category: this.selectedCategory,
      district: this.selectedDistrict,
      priceLevel: this.selectedPriceRange as 'low' | 'medium' | 'high'
    });

    if (this.viewMode === 'map') {
      this.updateMap();
    }
  }

  private initializeMap() {
    if (!this.mapContainer) return;

    this.mapService.initializeMap(this.mapContainer.nativeElement, {
      style: 'mapbox://styles/mapbox/streets-v12',
      center: { lat: 10.7756, lng: 106.7019 },
      zoom: 12
    });
  }

  private updateMap() {
    this.mapService.clearMarkers();

    this.filteredVenues.forEach(venue => {
      this.mapService.addMarker(
        venue.id,
        venue.coordinates,
        {
          color: this.getCategoryColor(venue.category),
          draggable: false
        }
      );
    });

    if (this.filteredVenues.length > 0) {
      this.mapService.fitBounds(
        this.filteredVenues.map(venue => venue.coordinates)
      );
    }
  }

  private getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      mall: '#3B82F6',      // blue
      market: '#10B981',    // emerald
      'department-store': '#F59E0B', // amber
      boutique: '#EF4444',  // red
      electronics: '#8B5CF6' // violet
    };
    return colors[category] || '#6B7280'; // gray default
  }
} 