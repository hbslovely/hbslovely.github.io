import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';

import { HotelsService, HotelSearchParams, HotelResult } from '../../../../core/services/hotels.service';
import { MapService } from '../../../../core/services/map.service';
import { AffiliateService } from '../../../../core/services/affiliate.service';
import { MapLocation } from '../../../../core/models/map.model';

@Component({
  selector: 'app-hotel-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    ButtonModule,
    CalendarModule,
    InputNumberModule,
    DropdownModule,
    SliderModule,
    SelectButtonModule,
    ChipModule,
    CardModule,
    RatingModule,
    DialogModule,
    CarouselModule,
    InputTextModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class HotelSearchComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  searchForm: FormGroup;
  searchResults: HotelResult[] = [];
  isLoading = false;
  hasSearched = false;
  minDate = new Date();
  viewMode: 'grid' | 'map' = 'grid';
  selectedAmenities: string[] = [];

  districts = [
    { label: 'All Districts', value: '' },
    { label: 'District 1', value: 'district-1' },
    { label: 'District 2', value: 'district-2' },
    { label: 'District 3', value: 'district-3' }
  ];

  propertyTypes = [
    { label: 'HOTELS.PROPERTY_TYPES.HOTEL', value: 'HOTEL' },
    { label: 'HOTELS.PROPERTY_TYPES.RESORT', value: 'RESORT' },
    { label: 'HOTELS.PROPERTY_TYPES.APARTMENT', value: 'APARTMENT' }
  ];

  amenities = [
    { label: 'HOTELS.AMENITIES.WIFI', value: 'wifi' },
    { label: 'HOTELS.AMENITIES.POOL', value: 'pool' },
    { label: 'HOTELS.AMENITIES.SPA', value: 'spa' },
    { label: 'HOTELS.AMENITIES.GYM', value: 'gym' },
    { label: 'HOTELS.AMENITIES.RESTAURANT', value: 'restaurant' },
    { label: 'HOTELS.AMENITIES.PARKING', value: 'parking' },
    { label: 'HOTELS.AMENITIES.ROOM_SERVICE', value: 'room_service' },
    { label: 'HOTELS.AMENITIES.BAR', value: 'bar' }
  ];

  viewModes = [
    { icon: 'pi pi-th-large', value: 'grid' },
    { icon: 'pi pi-map', value: 'map' }
  ];

  constructor(
    private fb: FormBuilder,
    private hotelsService: HotelsService,
    private mapService: MapService,
    private affiliateService: AffiliateService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      checkIn: [null],
      checkOut: [null],
      adults: [2],
      rooms: [1],
      district: [''],
      propertyType: [[]],
      priceRange: [[0, 10000000]],
      priceMin: [0],
      priceMax: [10000000],
      rating: [0]
    });
  }

  ngOnInit() {
    // Initialize map if needed
    if (this.viewMode === 'map') {
      this.initializeMap();
    }
  }

  search() {
    if (this.searchForm.valid) {
      this.isLoading = true;
      this.hasSearched = true;

      const searchParams: HotelSearchParams = {
        checkIn: this.formatDate(this.searchForm.get('checkIn')?.value),
        checkOut: this.formatDate(this.searchForm.get('checkOut')?.value),
        adults: this.searchForm.get('adults')?.value,
        rooms: this.searchForm.get('rooms')?.value,
        district: this.searchForm.get('district')?.value,
        propertyType: this.searchForm.get('propertyType')?.value,
        priceMin: this.searchForm.get('priceMin')?.value,
        priceMax: this.searchForm.get('priceMax')?.value,
        rating: this.searchForm.get('rating')?.value,
        amenities: this.selectedAmenities
      };

      this.hotelsService.searchHotels(searchParams).subscribe({
        next: (results) => {
          this.searchResults = results;
          this.isLoading = false;

          if (this.viewMode === 'map') {
            this.updateMap();
          }
        },
        error: (error) => {
          console.error('Error searching hotels:', error);
          this.isLoading = false;
        }
      });
    }
  }

  onPriceRangeChange(event: any) {
    this.searchForm.patchValue({
      priceMin: event.values[0],
      priceMax: event.values[1]
    });
  }

  toggleAmenity(amenity: string) {
    const index = this.selectedAmenities.indexOf(amenity);
    if (index === -1) {
      this.selectedAmenities.push(amenity);
    } else {
      this.selectedAmenities.splice(index, 1);
    }
  }

  getAmenityIcon(amenity: string): string {
    const icons: { [key: string]: string } = {
      wifi: 'pi pi-wifi',
      pool: 'pi pi-heart',
      spa: 'pi pi-heart-fill',
      gym: 'pi pi-bolt',
      restaurant: 'pi pi-shopping-bag',
      parking: 'pi pi-car',
      room_service: 'pi pi-bell',
      bar: 'pi pi-glass'
    };
    return icons[amenity] || 'pi pi-check';
  }

  getViewModeIcon(mode: any): string {
    return mode.icon;
  }

  onViewModeChange() {
    if (this.viewMode === 'map') {
      setTimeout(() => {
        this.initializeMap();
        this.updateMap();
      });
    }
  }

  viewHotelDetails(hotel: HotelResult) {
    // Track affiliate click
    this.affiliateService.trackAffiliateClick(hotel.source, 'hotel', hotel.id);

    // Generate affiliate URL
    const params = {
      checkIn: this.formatDate(this.searchForm.get('checkIn')?.value),
      checkOut: this.formatDate(this.searchForm.get('checkOut')?.value),
      adults: this.searchForm.get('adults')?.value,
      rooms: this.searchForm.get('rooms')?.value
    };

    const url = hotel.source === 'booking'
      ? this.affiliateService.generateBookingHotelUrl(hotel.id, params)
      : this.affiliateService.generateAgodaHotelUrl(hotel.id, params);

    // Open in new tab
    window.open(url, '_blank');
  }

  private formatDate(date: Date): string {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  }

  private initializeMap() {
    if (!this.mapContainer) return;

    this.mapService.initializeMap(this.mapContainer.nativeElement, {
      style: 'mapbox://styles/mapbox/streets-v12',
      center: { lat: 10.8231, lng: 106.6297 }, // Ho Chi Minh City coordinates
      zoom: 12
    });
  }

  private updateMap() {
    this.mapService.clearMarkers();

    this.searchResults.forEach(hotel => {
      this.mapService.addMarker(
        hotel.id,
        {
          lat: hotel.latitude,
          lng: hotel.longitude,
          name: hotel.name,
          address: hotel.address
        },
        {
          color: this.getMarkerColor(hotel.rating)
        }
      );
    });

    if (this.searchResults.length > 0) {
      this.mapService.fitBounds(
        this.searchResults.map(hotel => ({
          lat: hotel.latitude,
          lng: hotel.longitude
        }))
      );
    }
  }

  private getMarkerColor(rating: number): string {
    if (rating >= 4.5) return '#10B981'; // emerald
    if (rating >= 4.0) return '#3B82F6'; // blue
    if (rating >= 3.5) return '#F59E0B'; // amber
    return '#6B7280'; // gray
  }
} 