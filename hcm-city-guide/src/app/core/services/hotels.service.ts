import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface HotelSearchParams {
  checkIn: string;
  checkOut: string;
  adults: number;
  children?: number[];
  rooms: number;
  latitude?: number;
  longitude?: number;
  radius?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  propertyType?: string[];
  amenities?: string[];
  district?: string;
}

export interface HotelResult {
  id: string;
  source: 'booking' | 'agoda';
  name: string;
  description: string;
  address: string;
  district: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  price: {
    amount: number;
    currency: string;
    originalAmount?: number;
    discount?: number;
  };
  images: string[];
  amenities: string[];
  propertyType: string;
  checkIn: string;
  checkOut: string;
  policies?: {
    cancellation?: string;
    prepayment?: string;
    checkin?: string;
    checkout?: string;
  };
  rooms?: {
    id: string;
    name: string;
    description: string;
    occupancy: {
      maxAdults: number;
      maxChildren: number;
    };
    amenities: string[];
    bedTypes: string[];
    price: {
      amount: number;
      currency: string;
      originalAmount?: number;
      discount?: number;
    };
    available: number;
    cancellationPolicy?: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private readonly bookingHeaders = new HttpHeaders({
    'X-RapidAPI-Key': environment.bookingApiKey,
    'X-RapidAPI-Host': environment.bookingApiHost
  });

  private readonly agodaHeaders = new HttpHeaders({
    'X-RapidAPI-Key': environment.agodaApiKey,
    'X-RapidAPI-Host': environment.agodaApiHost
  });

  constructor(private http: HttpClient) {}

  searchHotels(params: HotelSearchParams): Observable<HotelResult[]> {
    return forkJoin([
      this.searchBooking(params),
      this.searchAgoda(params)
    ]).pipe(
      map(([bookingResults, agodaResults]) => [...bookingResults, ...agodaResults]),
      catchError(error => {
        console.error('Error searching hotels:', error);
        return [];
      })
    );
  }

  private searchBooking(params: HotelSearchParams): Observable<HotelResult[]> {
    // First, search for locations to get destination ID
    return this.http.get<any>(`${environment.bookingApiUrl}/locations/auto-complete`, {
      headers: this.bookingHeaders,
      params: new HttpParams().set('text', 'Ho Chi Minh City').set('language', 'en')
    }).pipe(
      map(response => response.results[0]?.dest_id),
      switchMap((destId: string | undefined) => {
        if (!destId) throw new Error('Destination not found');
        const searchParams = new HttpParams()
          .set('dest_id', destId)
          .set('checkin_date', params.checkIn)
          .set('checkout_date', params.checkOut)
          .set('adults_number', params.adults)
          .set('room_number', params.rooms)
          .set('units', 'metric')
          .set('order_by', 'popularity')
          .set('filter_by_currency', 'VND')
          .set('locale', 'en')
          .set('page_number', '0')
          .set('include_adjacency', 'true');
        return this.http.get<any>(`${environment.bookingApiUrl}/hotels/search`, { headers: this.bookingHeaders, params: searchParams });
      }),
      map(response => this.transformBookingResults(response)),
      catchError(error => { console.error('Error searching Booking.com:', error); return of([]); })
    );
  }

  private searchAgoda(params: HotelSearchParams): Observable<HotelResult[]> {
    const searchParams = {
      city_id: '16440', // Ho Chi Minh City ID in Agoda
      checkin: params.checkIn,
      checkout: params.checkOut,
      adults: params.adults,
      rooms: params.rooms,
      children_ages: params.children || [],
      currency: 'VND',
      language: 'en',
      sort_by: 'popularity',
      page_number: 1,
      page_size: 20
    };

    return this.http.post<any>(`${environment.agodaApiUrl}/hotels/search`, searchParams, {
      headers: this.agodaHeaders
    }).pipe(
      map(response => this.transformAgodaResults(response)),
      catchError(error => {
        console.error('Error searching Agoda:', error);
        return [];
      })
    );
  }

  private transformBookingResults(response: any): HotelResult[] {
    return response.results.map((hotel: any) => ({
      id: hotel.hotel_id,
      source: 'booking',
      name: hotel.hotel_name,
      description: hotel.hotel_name_trans,
      address: hotel.address,
      district: hotel.district || this.extractDistrict(hotel.address),
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      rating: hotel.review_score || 0,
      reviewCount: hotel.review_nr || 0,
      price: {
        amount: hotel.min_total_price || 0,
        currency: hotel.currency_code,
        originalAmount: hotel.original_price,
        discount: hotel.has_discount ? this.calculateDiscount(hotel.original_price, hotel.min_total_price) : undefined
      },
      images: hotel.max_photo_url ? [hotel.max_photo_url] : [],
      amenities: this.transformBookingAmenities(hotel.facilities),
      propertyType: hotel.accommodation_type_name,
      checkIn: hotel.checkin?.from || '',
      checkOut: hotel.checkout?.until || '',
      policies: {
        cancellation: hotel.cancellation_policy,
        prepayment: hotel.prepayment,
        checkin: `From ${hotel.checkin?.from || ''} to ${hotel.checkin?.until || ''}`,
        checkout: `Until ${hotel.checkout?.until || ''}`
      }
    }));
  }

  private transformAgodaResults(response: any): HotelResult[] {
    return response.properties.map((hotel: any) => ({
      id: hotel.property_id,
      source: 'agoda',
      name: hotel.property_name,
      description: hotel.description,
      address: hotel.address,
      district: hotel.area_name || this.extractDistrict(hotel.address),
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      rating: hotel.review_score || 0,
      reviewCount: hotel.review_count || 0,
      price: {
        amount: hotel.display_price?.price_display || 0,
        currency: hotel.display_price?.currency || 'VND',
        originalAmount: hotel.display_price?.original_price,
        discount: hotel.display_price?.discount_percentage
      },
      images: hotel.images?.map((img: any) => img.url) || [],
      amenities: this.transformAgodaAmenities(hotel.amenities),
      propertyType: hotel.property_type,
      checkIn: hotel.checkin_time || '',
      checkOut: hotel.checkout_time || '',
      policies: {
        cancellation: hotel.cancellation_policy,
        prepayment: hotel.prepayment_policy,
        checkin: hotel.checkin_policy,
        checkout: hotel.checkout_policy
      }
    }));
  }

  private transformBookingAmenities(facilities: any[]): string[] {
    const amenityMap: { [key: string]: string } = {
      'wifi': 'WIFI',
      'pool': 'POOL',
      'spa': 'SPA',
      'fitness': 'GYM',
      'restaurant': 'RESTAURANT',
      'parking': 'PARKING',
      'airport_shuttle': 'AIRPORT_SHUTTLE',
      'room_service': 'ROOM_SERVICE',
      'bar': 'BAR',
      'beach': 'BEACH_ACCESS'
    };

    return facilities
      .map(facility => {
        const amenity = Object.entries(amenityMap)
          .find(([key]) => facility.facility_name.toLowerCase().includes(key));
        return amenity ? amenity[1] : null;
      })
      .filter((amenity): amenity is string => amenity !== null);
  }

  private transformAgodaAmenities(amenities: any[]): string[] {
    const amenityMap: { [key: string]: string } = {
      'wifi': 'WIFI',
      'swimming_pool': 'POOL',
      'spa': 'SPA',
      'fitness_center': 'GYM',
      'restaurant': 'RESTAURANT',
      'parking': 'PARKING',
      'airport_transfer': 'AIRPORT_SHUTTLE',
      'room_service': 'ROOM_SERVICE',
      'bar': 'BAR',
      'beach_access': 'BEACH_ACCESS'
    };

    return amenities
      .map(amenity => {
        const mapped = Object.entries(amenityMap)
          .find(([key]) => amenity.name.toLowerCase().includes(key));
        return mapped ? mapped[1] : null;
      })
      .filter((amenity): amenity is string => amenity !== null);
  }

  private extractDistrict(address: string): string {
    const districtMatch = address.match(/District \d+|Quan \d+/i);
    return districtMatch ? districtMatch[0] : '';
  }

  private calculateDiscount(original: number, discounted: number): number {
    if (!original || !discounted) return 0;
    return Math.round(((original - discounted) / original) * 100);
  }

  getHotelDetails(hotelId: string, source: 'booking' | 'agoda'): Observable<HotelResult> {
    if (source === 'booking') {
      return this.http.get<any>(`${environment.bookingApiUrl}/hotels/details`, {
        headers: this.bookingHeaders,
        params: new HttpParams()
          .set('hotel_id', hotelId)
          .set('locale', 'en')
      }).pipe(
        map(response => this.transformBookingResults([response.result])[0]),
        catchError(error => {
          console.error('Error fetching Booking.com hotel details:', error);
          throw error;
        })
      );
    } else {
      return this.http.get<any>(`${environment.agodaApiUrl}/hotels/details`, {
        headers: this.agodaHeaders,
        params: new HttpParams()
          .set('property_id', hotelId)
          .set('language', 'en')
      }).pipe(
        map(response => this.transformAgodaResults([response.property])[0]),
        catchError(error => {
          console.error('Error fetching Agoda hotel details:', error);
          throw error;
        })
      );
    }
  }

  bookHotel(
    hotelId: string, 
    source: 'booking' | 'agoda',
    roomId: string,
    booking: {
      checkIn: string;
      checkOut: string;
      guests: {
        adults: number;
        children?: { age: number }[];
      }[];
      contactInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        country: string;
      };
      specialRequests?: string;
    }
  ): Observable<any> {
    const headers = source === 'booking' ? this.bookingHeaders : this.agodaHeaders;
    const endpoint = source === 'booking' 
      ? `${environment.bookingApiUrl}/hotels/book`
      : `${environment.agodaApiUrl}/hotels/book`;

    const bookingData = source === 'booking' 
      ? this.transformBookingRequest(hotelId, roomId, booking)
      : this.transformAgodaRequest(hotelId, roomId, booking);

    return this.http.post(endpoint, bookingData, { headers }).pipe(
      catchError(error => {
        console.error(`Error booking hotel on ${source}:`, error);
        throw error;
      })
    );
  }

  private transformBookingRequest(hotelId: string, roomId: string, booking: any): any {
    return {
      hotel_id: hotelId,
      room_id: roomId,
      checkin: booking.checkIn,
      checkout: booking.checkOut,
      guests: booking.guests.map((guest: any) => ({
        adults: guest.adults,
        children: guest.children?.map((child: any) => ({
          age: child.age
        }))
      })),
      guest_info: {
        first_name: booking.contactInfo.firstName,
        last_name: booking.contactInfo.lastName,
        email: booking.contactInfo.email,
        phone: booking.contactInfo.phone,
        country_code: booking.contactInfo.country
      },
      special_requests: booking.specialRequests,
      currency: 'VND',
      locale: 'en'
    };
  }

  private transformAgodaRequest(hotelId: string, roomId: string, booking: any): any {
    return {
      property_id: hotelId,
      room_id: roomId,
      checkin_date: booking.checkIn,
      checkout_date: booking.checkOut,
      rooms: booking.guests.map((guest: any) => ({
        adult_count: guest.adults,
        child_count: guest.children?.length || 0,
        child_ages: guest.children?.map((child: any) => child.age) || []
      })),
      contact: {
        given_name: booking.contactInfo.firstName,
        surname: booking.contactInfo.lastName,
        email: booking.contactInfo.email,
        phone: booking.contactInfo.phone,
        country_calling_code: '+84', // Vietnam
        country_code: booking.contactInfo.country
      },
      special_request: booking.specialRequests,
      currency: 'VND',
      language: 'en'
    };
  }
} 