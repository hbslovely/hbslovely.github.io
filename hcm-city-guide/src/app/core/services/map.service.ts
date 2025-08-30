import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import mapboxgl from 'mapbox-gl';

export interface MapLocation {
  lat: number;
  lng: number;
  address?: string;
  name?: string;
}

export interface RouteOptions {
  profile?: 'driving' | 'walking' | 'cycling';
  alternatives?: boolean;
  language?: string;
}

export interface RouteResponse {
  distance: number;
  duration: number;
  geometry: any;
  steps: {
    distance: number;
    duration: number;
    instruction: string;
    name: string;
    type: string;
    coordinates: [number, number][];
  }[];
}

export interface MapOptions extends Omit<mapboxgl.MapOptions, 'container'> {
  style?: string;
  center?: [number, number] | MapLocation;
  zoom?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private mapbox: mapboxgl.Map | null = null;
  private markers: { [key: string]: mapboxgl.Marker } = {};
  private readonly mapboxToken = environment.mapboxToken;

  constructor(private http: HttpClient) {
    (mapboxgl as any).accessToken = this.mapboxToken;
  }

  initializeMap(container: string | HTMLElement, options: MapOptions = {}): mapboxgl.Map {
    const defaultOptions: mapboxgl.MapOptions = {
      container: container,
      style: options.style || 'mapbox://styles/mapbox/streets-v12',
      center: this.normalizeCenter(options.center) || [106.6297, 10.8231], // Ho Chi Minh City
      zoom: options.zoom || 12,
      ...options
    };

    this.mapbox = new mapboxgl.Map(defaultOptions);
    return this.mapbox;
  }

  private normalizeCenter(center?: [number, number] | MapLocation): [number, number] {
    if (!center) return [106.6297, 10.8231];
    if (Array.isArray(center)) return center;
    return [center.lng, center.lat];
  }

  addMarker(id: string, location: MapLocation, options: mapboxgl.MarkerOptions = {}): mapboxgl.Marker {
    if (!this.mapbox) {
      throw new Error('Map not initialized');
    }

    // Remove existing marker with same ID
    if (this.markers[id]) {
      this.markers[id].remove();
    }

    const marker = new mapboxgl.Marker(options)
      .setLngLat([location.lng, location.lat]);

    if (location.name || location.address) {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          ${location.name ? `<h4>${location.name}</h4>` : ''}
          ${location.address ? `<p>${location.address}</p>` : ''}
        `);
      marker.setPopup(popup);
    }

    marker.addTo(this.mapbox);
    this.markers[id] = marker;

    return marker;
  }

  removeMarker(id: string): void {
    if (this.markers[id]) {
      this.markers[id].remove();
      delete this.markers[id];
    }
  }

  clearMarkers(): void {
    Object.keys(this.markers).forEach(id => {
      this.markers[id].remove();
    });
    this.markers = {};
  }

  flyTo(location: MapLocation, zoom?: number): void {
    if (!this.mapbox) {
      throw new Error('Map not initialized');
    }

    this.mapbox.flyTo({
      center: [location.lng, location.lat],
      zoom: zoom || this.mapbox.getZoom(),
      essential: true
    });
  }

  fitBounds(locations: MapLocation[], padding: number = 50): void {
    if (!this.mapbox || locations.length === 0) {
      return;
    }

    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach(location => {
      bounds.extend([location.lng, location.lat]);
    });

    this.mapbox.fitBounds(bounds, {
      padding,
      maxZoom: 15
    });
  }

  geocode(query: string): Observable<MapLocation[]> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`;
    const params = {
      access_token: this.mapboxToken,
      country: 'vn',
      bbox: '106.5444,10.6554,106.8545,10.8931', // HCMC bounding box
      limit: 5
    };

    return this.http.get<any>(url, { params }).pipe(
      map(response => response.features.map((feature: any) => ({
        lng: feature.center[0],
        lat: feature.center[1],
        address: feature.place_name,
        name: feature.text
      })))
    );
  }

  getRoute(
    start: MapLocation,
    end: MapLocation,
    options: RouteOptions = {}
  ): Observable<RouteResponse> {
    const coordinates = `${start.lng},${start.lat};${end.lng},${end.lat}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/${options.profile || 'driving'}/${coordinates}`;
    
    const params = {
      access_token: this.mapboxToken,
      alternatives: options.alternatives ? 'true' : 'false',
      geometries: 'geojson',
      steps: 'true',
      language: options.language || 'en',
      overview: 'full'
    };

    return this.http.get<any>(url, { params }).pipe(
      map(response => {
        const route = response.routes[0];
        return {
          distance: route.distance,
          duration: route.duration,
          geometry: route.geometry,
          steps: route.legs[0].steps.map((step: any) => ({
            distance: step.distance,
            duration: step.duration,
            instruction: step.maneuver.instruction,
            name: step.name,
            type: step.maneuver.type,
            coordinates: step.geometry.coordinates
          }))
        };
      })
    );
  }

  drawRoute(route: RouteResponse): void {
    if (!this.mapbox) {
      throw new Error('Map not initialized');
    }

    // Remove existing route layer and source
    if (this.mapbox.getLayer('route')) {
      this.mapbox.removeLayer('route');
    }
    if (this.mapbox.getSource('route')) {
      this.mapbox.removeSource('route');
    }

    // Add the route to the map
    this.mapbox.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: route.geometry
      }
    });

    this.mapbox.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#2563eb',
        'line-width': 4,
        'line-opacity': 0.8
      }
    });

    // Fit the map to the route
    const coordinates = route.geometry.coordinates as [number, number][];
    const bounds = new mapboxgl.LngLatBounds();
    coordinates.forEach(coord => bounds.extend(coord));
    
    this.mapbox.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15
    });
  }

  destroy(): void {
    if (this.mapbox) {
      this.mapbox.remove();
      this.mapbox = null;
    }
    this.markers = {};
  }
} 