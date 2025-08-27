import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MapLocation } from '../models/map.model';
import { map } from 'rxjs/operators';

export interface EntertainmentVenue {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  location: string;
  address: string;
  district: string;
  coordinates: MapLocation;
  images: string[];
  rating: number;
  reviews: number;
  price: number;
  priceRange: string;
  priceLevel: 'low' | 'medium' | 'high';
  features: string[];
  tags: string[];
  openingHours: {
    [key: string]: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

export interface FilterOptions {
  type?: string;
  category?: string;
  district?: string;
  priceLevel?: 'low' | 'medium' | 'high';
  priceRange?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  features?: string[];
}

export interface SortOption {
  field: keyof EntertainmentVenue;
  direction: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root'
})
export class EntertainmentService {
  private venues = new BehaviorSubject<EntertainmentVenue[]>([]);
  private filteredVenues = new BehaviorSubject<EntertainmentVenue[]>([]);

  venues$ = this.venues.asObservable();
  filteredVenues$ = this.filteredVenues.asObservable();

  constructor() {
    this.loadVenues();
  }

  private loadVenues() {
    const mockVenues: EntertainmentVenue[] = [
      {
        id: 'v1',
        name: 'Dam Sen Water Park',
        type: 'theme-park',
        category: 'water-park',
        description: 'Large water park with various slides and pools',
        location: 'District 11, Ho Chi Minh City',
        address: '3 Hoa Binh, Ward 3, District 11, Ho Chi Minh City',
        district: 'District 11',
        coordinates: { lat: 10.7651, lng: 106.6448 },
        images: ['assets/images/entertainment/dam-sen-water-park.jpg'],
        rating: 4.5,
        reviews: 1250,
        price: 180000,
        priceRange: '150k-250k',
        priceLevel: 'medium',
        features: ['water-slides', 'wave-pool', 'kids-area', 'food-court'],
        tags: ['family-friendly', 'water-park', 'slides'],
        openingHours: {
          'Monday-Friday': '8:00 AM - 6:00 PM',
          'Saturday-Sunday': '7:00 AM - 7:00 PM'
        },
        contact: {
          phone: '028 3963 3333',
          website: 'https://damsenwaterpark.com.vn'
        }
      }
      // Add more venues as needed
    ];

    this.venues.next(mockVenues);
    this.filteredVenues.next(mockVenues);
  }

  filterVenues(options: FilterOptions) {
    let filtered = [...this.venues.value];

    if (options) {
      if (options.type) {
        filtered = filtered.filter(v => v.type === options.type);
      }

      if (options.category) {
        filtered = filtered.filter(v => v.category === options.category);
      }

      if (options.district) {
        filtered = filtered.filter(v => 
          v.district.toLowerCase().includes(options.district!.toLowerCase())
        );
      }

      if (options.priceLevel) {
        filtered = filtered.filter(v => v.priceLevel === options.priceLevel);
      }

      if (options.priceRange) {
        filtered = filtered.filter(v => v.priceRange === options.priceRange);
      }

      if (options.priceMin !== undefined) {
        filtered = filtered.filter(v => v.price >= options.priceMin!);
      }

      if (options.priceMax !== undefined) {
        filtered = filtered.filter(v => v.price <= options.priceMax!);
      }

      const minRating = options.rating;
      if (typeof minRating === 'number' && minRating > 0) {
        filtered = filtered.filter(v => v.rating >= minRating);
      }

      if (options.features && options.features.length > 0) {
        filtered = filtered.filter(v => 
          options.features!.every(feature => v.features.includes(feature))
        );
      }
    }

    this.filteredVenues.next(filtered);
  }

  getVenuesByCategory(category: string): Observable<EntertainmentVenue[]> {
    return this.venues$.pipe(
      map(venues => venues.filter(venue => venue.category === category))
    );
  }

  sortVenues(option: SortOption) {
    const sorted = [...this.filteredVenues.value].sort((a, b) => {
      const aValue = a[option.field];
      const bValue = b[option.field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return option.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return option.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });

    this.filteredVenues.next(sorted);
  }

  searchVenues(query: string) {
    if (!query.trim()) {
      this.filteredVenues.next(this.venues.value);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = this.venues.value.filter(venue => 
      venue.name.toLowerCase().includes(searchQuery) ||
      venue.description.toLowerCase().includes(searchQuery) ||
      venue.location.toLowerCase().includes(searchQuery) ||
      venue.features.some(feature => feature.toLowerCase().includes(searchQuery))
    );

    this.filteredVenues.next(filtered);
  }

  getNearbyVenues(location: MapLocation, radiusInKm: number = 2): EntertainmentVenue[] {
    return this.venues.value.filter(venue => 
      this.calculateDistance(location, venue.coordinates) <= radiusInKm
    );
  }

  private calculateDistance(point1: MapLocation, point2: MapLocation): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(point2.lat - point1.lat);
    const dLon = this.toRad(point2.lng - point1.lng);
    const lat1 = this.toRad(point1.lat);
    const lat2 = this.toRad(point2.lat);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
} 