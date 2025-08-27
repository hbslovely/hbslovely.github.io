import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import { EntertainmentService, EntertainmentVenue } from '../../../../core/services/entertainment.service';
import { MapService, MapLocation } from '../../../../core/services/map.service';

@Component({
  selector: 'app-theme-parks',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    TagModule,
    RatingModule,
    TabViewModule,
    FormsModule
  ],
  templateUrl: './theme-parks.component.html',
  styleUrls: ['./theme-parks.component.scss']
})
export class ThemeParksComponent implements OnInit {
  featuredParks: EntertainmentVenue[] = [];
  parks: EntertainmentVenue[] = [];
  activeViewIndex: number = 0;

  constructor(
    private entertainmentService: EntertainmentService,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.loadParks();
  }

  loadParks() {
    this.entertainmentService.getVenuesByCategory('theme-park').subscribe(parks => {
      this.parks = parks;
      this.featuredParks = parks.filter(park => park.rating >= 4.3);
      
      if (this.activeViewIndex === 1) {
        this.initializeMap();
      }
    });
  }

  initializeMap() {
    const mapContainer = document.querySelector('.map-container') as HTMLElement;
    if (!mapContainer) return;

    const map = this.mapService.initializeMap('map-container');
    
    // Add markers for all parks
    this.parks.forEach(park => {
      this.mapService.addMarker(park.id, {
        lat: park.coordinates.lat,
        lng: park.coordinates.lng,
        name: park.name,
        address: park.location
      });
    });

    // Fit map to show all parks
    this.mapService.fitBounds(
      this.parks.map(park => ({
        lat: park.coordinates.lat,
        lng: park.coordinates.lng
      }))
    );
  }

  private updateMap() {
    this.mapService.clearMarkers();

    this.parks.forEach(park => {
      this.mapService.addMarker(
        park.id,
        {
          lat: park.coordinates.lat,
          lng: park.coordinates.lng,
          name: park.name,
          address: park.location
        }
      );
    });

    if (this.parks.length > 0) {
      this.mapService.fitBounds(
        this.parks.map(park => park.coordinates)
      );
    }
  }

  getPriceRangeSeverity(priceRange: string): string {
    switch (priceRange) {
      case '$':
        return 'success';
      case '$$':
        return 'info';
      case '$$$':
        return 'warning';
      default:
        return 'info';
    }
  }

  getTagSeverity(tag: string): string {
    const severities: { [key: string]: string } = {
      'Water Park': 'info',
      'Family': 'success',
      'Entertainment': 'warning',
      'Adventure': 'danger'
    };
    return severities[tag] || 'info';
  }

  getFeatureIcon(feature: string): string {
    const icons: { [key: string]: string } = {
      'Parking': 'pi pi-car',
      'Food Court': 'pi pi-shopping-cart',
      'Lockers': 'pi pi-lock',
      'First Aid': 'pi pi-heart'
    };
    return icons[feature] || 'pi pi-check';
  }

  viewParkDetails(park: EntertainmentVenue) {
    // Implement navigation to detail page
  }
} 