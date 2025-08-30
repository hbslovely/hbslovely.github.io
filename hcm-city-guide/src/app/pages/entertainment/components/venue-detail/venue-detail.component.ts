import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { TabViewModule } from 'primeng/tabview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { ShareModule } from 'primeng/share';
import { FormsModule } from '@angular/forms';
import { EntertainmentService, EntertainmentVenue } from '../../../../core/services/entertainment.service';
import { MapService } from '../../../../core/services/map.service';

@Component({
  selector: 'app-venue-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ButtonModule,
    GalleriaModule,
    TabViewModule,
    RatingModule,
    TagModule,
    AccordionModule,
    ShareModule,
    FormsModule
  ],
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.scss']
})
export class VenueDetailComponent implements OnInit {
  venue: EntertainmentVenue | null = null;
  isFavorite: boolean = false;
  selectedTransport: string = 'driving';

  galleriaResponsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  transportOptions = [
    { label: 'ENTERTAINMENT.VENUE.TRANSPORT.DRIVING', value: 'driving', icon: 'pi pi-car' },
    { label: 'ENTERTAINMENT.VENUE.TRANSPORT.WALKING', value: 'walking', icon: 'pi pi-user' },
    { label: 'ENTERTAINMENT.VENUE.TRANSPORT.CYCLING', value: 'cycling', icon: 'pi pi-bicycle' }
  ];

  constructor(
    private route: ActivatedRoute,
    private entertainmentService: EntertainmentService,
    private mapService: MapService
  ) {}

  ngOnInit() {
    const venueId = this.route.snapshot.params['id'];
    if (venueId) {
      this.loadVenue(venueId);
    }
  }

  loadVenue(id: string) {
    this.entertainmentService.getVenueById(id).subscribe(venue => {
      if (venue) {
        this.venue = venue;
        this.initializeMap();
      }
    });
  }

  initializeMap() {
    if (!this.venue) return;

    const mapContainer = document.querySelector('.venue-map') as HTMLElement;
    if (!mapContainer) return;

    const map = this.mapService.initializeMap('venue-map', {
      center: [this.venue.coordinates.lng, this.venue.coordinates.lat],
      zoom: 15
    });

    this.mapService.addMarker(this.venue.id, {
      lat: this.venue.coordinates.lat,
      lng: this.venue.coordinates.lng,
      name: this.venue.name,
      address: this.venue.address
    });
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

  getFeatureIcon(feature: string): string {
    const icons: { [key: string]: string } = {
      'Parking': 'pi pi-car',
      'WiFi': 'pi pi-wifi',
      'Food Court': 'pi pi-shopping-cart',
      'ATM': 'pi pi-wallet',
      'Lockers': 'pi pi-lock',
      'First Aid': 'pi pi-heart'
    };
    return icons[feature] || 'pi pi-check';
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // Implement favorite functionality
  }

  showShareDialog() {
    // Implement share functionality
  }

  selectTransport(type: string) {
    this.selectedTransport = type;
    // Implement route calculation
  }
} 