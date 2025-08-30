import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface TransportSearchParams {
  pickup: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  destination: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  serviceType?: 'JustGrab' | 'GrabCar' | 'GrabBike' | 'GrabTaxi';
  time?: Date;
  passengers?: number;
}

export interface TransportResult {
  id: string;
  serviceType: string;
  estimatedTime: number; // in minutes
  distance: number; // in meters
  price: {
    amount: number;
    currency: string;
    surge?: number;
  };
  driver?: {
    name: string;
    phone: string;
    rating: number;
    vehicleInfo?: {
      model: string;
      plate: string;
      color: string;
    };
  };
  eta?: number; // estimated time of arrival in minutes
  status: 'available' | 'busy' | 'no-drivers';
  deepLink?: string; // deep link to open Grab app
}

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private readonly grabApiUrl = environment.grabApiUrl;
  private readonly grabApiKey = environment.grabApiKey;

  constructor(private http: HttpClient) {}

  searchTransport(params: TransportSearchParams): Observable<TransportResult[]> {
    const headers = {
      'Authorization': `Bearer ${this.grabApiKey}`
    };

    return this.http.post<any>(`${this.grabApiUrl}/rides/estimates`, {
      ...this.transformGrabParams(params)
    }, { headers }).pipe(
      map(response => this.transformGrabResults(response))
    );
  }

  bookRide(rideId: string, params: TransportSearchParams): Observable<TransportResult> {
    const headers = {
      'Authorization': `Bearer ${this.grabApiKey}`
    };

    return this.http.post<any>(`${this.grabApiUrl}/rides/book`, {
      rideId,
      ...this.transformGrabParams(params)
    }, { headers }).pipe(
      map(response => this.transformGrabBookingResult(response))
    );
  }

  private transformGrabParams(params: TransportSearchParams): any {
    return {
      pickup: {
        latitude: params.pickup.latitude,
        longitude: params.pickup.longitude,
        address: params.pickup.address
      },
      destination: {
        latitude: params.destination.latitude,
        longitude: params.destination.longitude,
        address: params.destination.address
      },
      serviceType: params.serviceType || 'JustGrab',
      scheduledTime: params.time?.toISOString(),
      passengers: params.passengers || 1
    };
  }

  private transformGrabResults(response: any): TransportResult[] {
    return response.services.map((service: any) => ({
      id: service.id,
      serviceType: service.type,
      estimatedTime: service.duration,
      distance: service.distance,
      price: {
        amount: service.price.amount,
        currency: service.price.currency,
        surge: service.price.surgeMultiplier
      },
      eta: service.eta,
      status: service.availability,
      deepLink: service.deepLink
    }));
  }

  private transformGrabBookingResult(response: any): TransportResult {
    return {
      id: response.bookingId,
      serviceType: response.service.type,
      estimatedTime: response.service.duration,
      distance: response.service.distance,
      price: {
        amount: response.price.amount,
        currency: response.price.currency,
        surge: response.price.surgeMultiplier
      },
      driver: {
        name: response.driver.name,
        phone: response.driver.phone,
        rating: response.driver.rating,
        vehicleInfo: {
          model: response.driver.vehicle.model,
          plate: response.driver.vehicle.plate,
          color: response.driver.vehicle.color
        }
      },
      eta: response.eta,
      status: 'available',
      deepLink: response.deepLink
    };
  }
} 