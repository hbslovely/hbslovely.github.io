import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ChipModule } from 'primeng/chip';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';

import { EntertainmentService, EntertainmentVenue } from '../../../../core/services/entertainment.service';
import { MapService } from '../../../../core/services/map.service';

interface FilterState {
  type: string[];
  district: string;
  priceRange: string[];
  features: string[];
  rating: number;
  openNow: boolean;
}

@Component({
  selector: 'app-nightlife',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    InputTextModule,
    RatingModule,
    TagModule,
    SelectButtonModule,
    ChipModule,
    SliderModule,
    DialogModule,
    CheckboxModule
  ],
  templateUrl: './nightlife.component.html',
  styleUrls: ['./nightlife.component.scss']
})
export class NightlifeComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  venues: EntertainmentVenue[] = [];
  filteredVenues: EntertainmentVenue[] = [];
  searchTerm: string = '';
  showMap: boolean = false;

  venueTypes = [
    'CLUB',
    'BAR',
    'LOUNGE',
    'LIVE_MUSIC',
    'KARAOKE'
  ];

  districts = [
    { label: 'District 1', value: 'district-1' },
    { label: 'District 2', value: 'district-2' },
    { label: 'District 3', value: 'district-3' }
  ];

  priceRanges = [
    { label: '$', value: '$' },
    { label: '$$', value: '$$' },
    { label: '$$$', value: '$$$' }
  ];

  availableFeatures = [
    'Live Music',
    'Dance Floor',
    'VIP Tables',
    'Rooftop',
    'Sports Screens',
    'Food Service',
    'Smoking Area',
    'Valet Parking'
  ];

  filters: FilterState = {
    type: [],
    district: '',
    priceRange: [],
    features: [],
    rating: 0,
    openNow: false
  };

  constructor(
    private entertainmentService: EntertainmentService,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.loadVenues();
  }

  loadVenues() {
    this.entertainmentService.getVenuesByCategory('nightlife').subscribe(venues => {
      this.venues = venues;
      this.applyFilters();
    });
  }

  onSearch() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.venues];

    // Search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(venue => 
        venue.name.toLowerCase().includes(term) ||
        venue.description.toLowerCase().includes(term) ||
        venue.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Venue type
    if (this.filters.type.length > 0) {
      filtered = filtered.filter(venue => 
        this.filters.type.includes(venue.type)
      );
    }

    // District
    if (this.filters.district) {
      filtered = filtered.filter(venue => 
        venue.district === this.filters.district
      );
    }

    // Price range
    if (this.filters.priceRange.length > 0) {
      filtered = filtered.filter(venue => 
        this.filters.priceRange.includes(venue.priceRange)
      );
    }

    // Rating
    if (this.filters.rating > 0) {
      filtered = filtered.filter(venue => 
        venue.rating >= this.filters.rating
      );
    }

    // Features
    if (this.filters.features.length > 0) {
      filtered = filtered.filter(venue => 
        this.filters.features.every(feature => 
          venue.features.includes(feature)
        )
      );
    }

    // Open now
    if (this.filters.openNow) {
      filtered = filtered.filter(venue => 
        this.isOpenNow(venue)
      );
    }

    this.filteredVenues = filtered;
  }

  clearFilters() {
    this.filters = {
      type: [],
      district: '',
      priceRange: [],
      features: [],
      rating: 0,
      openNow: false
    };
    this.searchTerm = '';
    this.applyFilters();
  }

  toggleFeature(feature: string) {
    const index = this.filters.features.indexOf(feature);
    if (index === -1) {
      this.filters.features.push(feature);
    } else {
      this.filters.features.splice(index, 1);
    }
    this.applyFilters();
  }

  getVenueTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'CLUB': 'pi pi-volume-up',
      'BAR': 'pi pi-glass',
      'LOUNGE': 'pi pi-moon',
      'LIVE_MUSIC': 'pi pi-music',
      'KARAOKE': 'pi pi-microphone'
    };
    return icons[type] || 'pi pi-star';
  }

  getFeatureIcon(feature: string): string {
    const icons: { [key: string]: string } = {
      'Live Music': 'pi pi-music',
      'Dance Floor': 'pi pi-users',
      'VIP Tables': 'pi pi-star',
      'Rooftop': 'pi pi-building',
      'Sports Screens': 'pi pi-tv',
      'Food Service': 'pi pi-shopping-cart',
      'Smoking Area': 'pi pi-cloud',
      'Valet Parking': 'pi pi-car'
    };
    return icons[feature] || 'pi pi-check';
  }

  getTagSeverity(tag: string): string {
    const severities: { [key: string]: string } = {
      'Club': 'danger',
      'Bar': 'warning',
      'Lounge': 'info',
      'Live Music': 'success',
      'Karaoke': 'help'
    };
    return severities[tag] || 'info';
  }

  isOpenNow(venue: EntertainmentVenue): boolean {
    // Implement opening hours check
    return true;
  }

  viewVenueDetails(venue: EntertainmentVenue) {
    // Navigate to venue detail page
  }
} 