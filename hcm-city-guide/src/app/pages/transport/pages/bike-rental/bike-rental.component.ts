import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';

import { MapService } from '../../../../core/services/map.service';
import { MapLocation } from '../../../../core/models/map.model';

interface Bike {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  location: string;
  coordinates: MapLocation;
  availability: string;
  features: string[];
  rating: number;
  price: number;
}

interface Extra {
  id: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-bike-rental',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    AutoCompleteModule,
    CardModule,
    SelectButtonModule,
    CalendarModule,
    RatingModule,
    TagModule,
    DialogModule,
    CheckboxModule
  ],
  templateUrl: './bike-rental.component.html',
  styleUrls: ['./bike-rental.component.scss']
})
export class BikeRentalComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  searchForm: FormGroup;
  bookingForm: FormGroup;
  isLoading = false;
  isBooking = false;
  hasSearched = false;
  locationSuggestions: string[] = [];
  bikes: Bike[] = [];
  selectedBike: Bike | null = null;
  showBookingDialog = false;
  minDate = new Date();
  viewMode: 'grid' | 'map' = 'grid';

  viewModes = [
    { icon: 'pi pi-th-large', value: 'grid' },
    { icon: 'pi pi-map', value: 'map' }
  ];

  durations = [
    { label: '1 Hour', value: 1 },
    { label: '2 Hours', value: 2 },
    { label: '4 Hours', value: 4 },
    { label: 'Half Day (6 Hours)', value: 6 },
    { label: 'Full Day (12 Hours)', value: 12 }
  ];

  bikeTypes = [
    { label: 'City Bike', value: 'city' },
    { label: 'Mountain Bike', value: 'mountain' },
    { label: 'Electric Bike', value: 'electric' },
    { label: 'Road Bike', value: 'road' }
  ];

  extras: Extra[] = [
    { id: 'helmet', name: 'Helmet', price: 20000 },
    { id: 'lock', name: 'Bike Lock', price: 15000 },
    { id: 'basket', name: 'Basket', price: 10000 },
    { id: 'lights', name: 'LED Lights', price: 25000 },
    { id: 'insurance', name: 'Insurance', price: 50000 }
  ];

  constructor(
    private fb: FormBuilder,
    private mapService: MapService
  ) {
    this.searchForm = this.fb.group({
      location: ['', Validators.required],
      date: [null, Validators.required],
      duration: [null, Validators.required],
      type: [null]
    });

    this.bookingForm = this.fb.group({
      pickupTime: [null, Validators.required],
      duration: [null, Validators.required],
      helmet: [false],
      lock: [false],
      basket: [false],
      lights: [false],
      insurance: [false]
    });
  }

  ngOnInit() {
    if (this.viewMode === 'map') {
      this.initializeMap();
    }
  }

  searchLocation(event: any) {
    const query = event.query;
    // Mock implementation - replace with actual API call
    const locations = [
      'District 1, Ho Chi Minh City',
      'District 2, Ho Chi Minh City',
      'District 3, Ho Chi Minh City',
      'District 4, Ho Chi Minh City',
      'District 5, Ho Chi Minh City'
    ];
    this.locationSuggestions = locations.filter(location =>
      location.toLowerCase().includes(query.toLowerCase())
    );
  }

  search() {
    if (this.searchForm.valid) {
      this.isLoading = true;
      this.hasSearched = true;

      // Mock API call - replace with actual implementation
      setTimeout(() => {
        this.bikes = [
          {
            id: 'bike1',
            name: 'Trek FX 2',
            type: 'city',
            description: 'Comfortable city bike perfect for urban exploration',
            image: 'assets/images/bikes/trek-fx2.jpg',
            location: 'District 1, Ho Chi Minh City',
            coordinates: { lat: 10.7756, lng: 106.7019 },
            availability: 'Available Now',
            features: ['Lightweight', '21 Speed', 'Disc Brakes'],
            rating: 4.5,
            price: 50000
          },
          {
            id: 'bike2',
            name: 'Giant Talon 3',
            type: 'mountain',
            description: 'Durable mountain bike for off-road adventures',
            image: 'assets/images/bikes/giant-talon3.jpg',
            location: 'District 2, Ho Chi Minh City',
            coordinates: { lat: 10.7872, lng: 106.7418 },
            availability: 'Available from 2 PM',
            features: ['Front Suspension', '27.5" Wheels', 'Hydraulic Brakes'],
            rating: 4.8,
            price: 75000
          }
        ];
        this.isLoading = false;

        if (this.viewMode === 'map') {
          this.updateMap();
        }
      }, 1000);
    }
  }

  getTypeSeverity(type: string): string {
    const severities: { [key: string]: string } = {
      city: 'info',
      mountain: 'warning',
      electric: 'success',
      road: 'danger'
    };
    return severities[type] || 'info';
  }

  getFeatureIcon(feature: string): string {
    const icons: { [key: string]: string } = {
      'Lightweight': 'pi pi-arrow-up',
      'Front Suspension': 'pi pi-arrows-v',
      'Disc Brakes': 'pi pi-stop-circle',
      'Hydraulic Brakes': 'pi pi-stop-circle',
      '21 Speed': 'pi pi-sliders-h',
      '27.5" Wheels': 'pi pi-circle'
    };
    return icons[feature] || 'pi pi-check';
  }

  onViewModeChange() {
    if (this.viewMode === 'map' && this.hasSearched) {
      setTimeout(() => {
        this.initializeMap();
        this.updateMap();
      });
    }
  }

  bookBike(bike: Bike) {
    this.selectedBike = bike;
    this.bookingForm.patchValue({
      pickupTime: this.searchForm.get('date')?.value,
      duration: this.searchForm.get('duration')?.value
    });
    this.showBookingDialog = true;
  }

  hasExtras(): boolean {
    return this.extras.some(extra => this.bookingForm.get(extra.id)?.value);
  }

  calculateRentalFee(): number {
    if (!this.selectedBike || !this.bookingForm.get('duration')?.value) return 0;
    return this.selectedBike.price * this.bookingForm.get('duration')?.value;
  }

  calculateExtrasFee(): number {
    return this.extras
      .filter(extra => this.bookingForm.get(extra.id)?.value)
      .reduce((total, extra) => total + extra.price, 0);
  }

  calculateTotal(): number {
    return this.calculateRentalFee() + this.calculateExtrasFee();
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

    this.bikes.forEach(bike => {
      this.mapService.addMarker(
        bike.id,
        bike.coordinates,
        {
          color: this.getMarkerColor(bike.type),
          draggable: false
        }
      );
    });

    if (this.bikes.length > 0) {
      this.mapService.fitBounds(
        this.bikes.map(bike => bike.coordinates)
      );
    }
  }

  private getMarkerColor(type: string): string {
    const colors: { [key: string]: string } = {
      city: '#3B82F6',     // blue
      mountain: '#F59E0B',  // amber
      electric: '#10B981',  // emerald
      road: '#EF4444'      // red
    };
    return colors[type] || '#6B7280'; // gray default
  }
} 