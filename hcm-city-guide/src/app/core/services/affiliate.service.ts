import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {
  constructor() {}

  /**
   * Generate Booking.com search URL with affiliate parameters
   */
  generateBookingSearchUrl(params: {
    city?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    rooms?: number;
    latitude?: number;
    longitude?: number;
  }): string {
    const searchParams = new URLSearchParams({
      aid: environment.bookingAffiliateId,
      label: 'hcm-city-guide',
      lang: 'vi',
      selected_currency: 'VND'
    });

    if (params.city) {
      searchParams.append('ss', params.city);
    }
    if (params.checkIn) {
      searchParams.append('checkin', params.checkIn);
    }
    if (params.checkOut) {
      searchParams.append('checkout', params.checkOut);
    }
    if (params.adults) {
      searchParams.append('group_adults', params.adults.toString());
    }
    if (params.children) {
      searchParams.append('group_children', params.children.toString());
    }
    if (params.rooms) {
      searchParams.append('no_rooms', params.rooms.toString());
    }
    if (params.latitude && params.longitude) {
      searchParams.append('latitude', params.latitude.toString());
      searchParams.append('longitude', params.longitude.toString());
    }

    return `${environment.bookingSearchUrl}?${searchParams.toString()}`;
  }

  /**
   * Generate Booking.com hotel URL with affiliate parameters
   */
  generateBookingHotelUrl(hotelId: string, params?: {
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    rooms?: number;
  }): string {
    const searchParams = new URLSearchParams({
      aid: environment.bookingAffiliateId,
      label: 'hcm-city-guide',
      lang: 'vi',
      selected_currency: 'VND'
    });

    if (params?.checkIn) {
      searchParams.append('checkin', params.checkIn);
    }
    if (params?.checkOut) {
      searchParams.append('checkout', params.checkOut);
    }
    if (params?.adults) {
      searchParams.append('group_adults', params.adults.toString());
    }
    if (params?.children) {
      searchParams.append('group_children', params.children.toString());
    }
    if (params?.rooms) {
      searchParams.append('no_rooms', params.rooms.toString());
    }

    return `${environment.bookingHotelUrl}/${hotelId}.html?${searchParams.toString()}`;
  }

  /**
   * Generate Agoda search URL with affiliate parameters
   */
  generateAgodaSearchUrl(params: {
    city?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    rooms?: number;
    latitude?: number;
    longitude?: number;
  }): string {
    const searchParams = new URLSearchParams({
      pid: environment.agodaPartnerId,
      label: 'hcm-city-guide',
      locale: 'vi-vn',
      currency: 'VND',
      cid: '1891462' // Ho Chi Minh City ID in Agoda
    });

    if (params.checkIn) {
      searchParams.append('checkIn', params.checkIn);
    }
    if (params.checkOut) {
      searchParams.append('checkOut', params.checkOut);
    }
    if (params.adults) {
      searchParams.append('adults', params.adults.toString());
    }
    if (params.children) {
      searchParams.append('children', params.children.toString());
    }
    if (params.rooms) {
      searchParams.append('rooms', params.rooms.toString());
    }
    if (params.latitude && params.longitude) {
      searchParams.append('latitude', params.latitude.toString());
      searchParams.append('longitude', params.longitude.toString());
    }

    return `${environment.agodaSearchUrl}?${searchParams.toString()}`;
  }

  /**
   * Generate Agoda hotel URL with affiliate parameters
   */
  generateAgodaHotelUrl(hotelId: string, params?: {
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    rooms?: number;
  }): string {
    const searchParams = new URLSearchParams({
      pid: environment.agodaPartnerId,
      label: 'hcm-city-guide',
      locale: 'vi-vn',
      currency: 'VND'
    });

    if (params?.checkIn) {
      searchParams.append('checkIn', params.checkIn);
    }
    if (params?.checkOut) {
      searchParams.append('checkOut', params.checkOut);
    }
    if (params?.adults) {
      searchParams.append('adults', params.adults.toString());
    }
    if (params?.children) {
      searchParams.append('children', params.children.toString());
    }
    if (params?.rooms) {
      searchParams.append('rooms', params.rooms.toString());
    }

    return `${environment.agodaHotelUrl}/${hotelId}?${searchParams.toString()}`;
  }

  /**
   * Track affiliate click event
   */
  trackAffiliateClick(provider: 'booking' | 'agoda', type: 'search' | 'hotel', hotelId?: string) {
    // Implement your analytics tracking here
    console.log('Affiliate click:', { provider, type, hotelId });
  }
} 