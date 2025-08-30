import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { SelectButtonModule } from 'primeng/selectbutton';

interface SportsVenue {
  id: string;
  name: string;
  type: string[];
  description: string;
  address: string;
  district: string;
  rating: number;
  priceRange: string;
  openingHours: string;
  facilities: string[];
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  bookingInfo?: {
    minDuration: number;
    maxDuration: number;
    pricePerHour: number;
    equipment?: {
      available: boolean;
      pricePerItem?: number;
    };
  };
}

interface SportsEvent {
  id: string;
  title: string;
  type: string;
  description: string;
  venue: string;
  date: Date;
  time: string;
  price: {
    amount: number;
    currency: string;
  };
  tickets: {
    available: number;
    total: number;
  };
  image: string;
  organizer: string;
}

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    TabViewModule,
    DropdownModule,
    CalendarModule,
    RatingModule,
    ChipModule,
    DialogModule,
    CarouselModule,
    SelectButtonModule
  ],
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit {
  venues: SportsVenue[] = [];
  filteredVenues: SportsVenue[] = [];
  upcomingEvents: SportsEvent[] = [];
  selectedVenue: SportsVenue | null = null;
  showVenueDialog: boolean = false;
  showBookingDialog: boolean = false;
  selectedSportTypes: string[] = [];
  selectedDistrict: string = '';
  selectedPriceRange: string = '';

  sportTypes = [
    'FOOTBALL',
    'BASKETBALL',
    'TENNIS',
    'SWIMMING',
    'BADMINTON',
    'GYM',
    'YOGA'
  ];

  districts = [
    { label: 'All Districts', value: '' },
    { label: 'District 1', value: 'district-1' },
    { label: 'District 2', value: 'district-2' },
    { label: 'District 3', value: 'district-3' }
  ];

  priceRanges = [
    { label: '$', value: '$' },
    { label: '$$', value: '$$' },
    { label: '$$$', value: '$$$' }
  ];

  constructor() {}

  ngOnInit() {
    this.loadVenues();
    this.loadEvents();
  }

  loadVenues() {
    // Implement API call to load venues
    this.filterVenues();
  }

  loadEvents() {
    // Implement API call to load events
  }

  filterVenues() {
    this.filteredVenues = this.venues.filter(venue => {
      if (this.selectedSportTypes.length > 0 && 
          !this.selectedSportTypes.some(type => venue.type.includes(type))) {
        return false;
      }
      if (this.selectedDistrict && venue.district !== this.selectedDistrict) {
        return false;
      }
      if (this.selectedPriceRange && venue.priceRange !== this.selectedPriceRange) {
        return false;
      }
      return true;
    });
  }

  getSportIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'FOOTBALL': 'pi pi-globe',
      'BASKETBALL': 'pi pi-circle',
      'TENNIS': 'pi pi-circle-fill',
      'SWIMMING': 'pi pi-wave',
      'BADMINTON': 'pi pi-stop',
      'GYM': 'pi pi-heart-fill',
      'YOGA': 'pi pi-heart'
    };
    return icons[type] || 'pi pi-star';
  }

  getFacilityIcon(facility: string): string {
    const icons: { [key: string]: string } = {
      'Parking': 'pi pi-car',
      'Shower': 'pi pi-water',
      'Locker': 'pi pi-lock',
      'Equipment': 'pi pi-box',
      'Cafe': 'pi pi-coffee',
      'WiFi': 'pi pi-wifi'
    };
    return icons[facility] || 'pi pi-check';
  }

  viewVenueDetails(venue: SportsVenue) {
    this.selectedVenue = venue;
    this.showVenueDialog = true;
  }

  bookVenue(venue: SportsVenue) {
    this.selectedVenue = venue;
    this.showBookingDialog = true;
  }

  getEventTickets(event: SportsEvent) {
    // Implement ticket booking
  }
} 