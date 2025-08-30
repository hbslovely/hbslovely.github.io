import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { switchMap } from 'rxjs/operators';

// PrimeNG Imports
import { TabViewModule } from 'primeng/tabview';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

import { HotelsService, HotelResult } from '../../../../core/services/hotels.service';
import { MapService } from '../../../../core/services/map.service';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TabViewModule,
    GalleriaModule,
    ButtonModule,
    CalendarModule,
    InputNumberModule,
    RatingModule,
    ChipModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule
  ],
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  hotel: HotelResult | null = null;
  showBookingDialog = false;
  selectedRoom: any = null;
  minDate = new Date();
  bookingForm: FormGroup;

  galleryResponsiveOptions = [
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

  constructor(
    private route: ActivatedRoute,
    private hotelsService: HotelsService,
    private mapService: MapService,
    private fb: FormBuilder
  ) {
    this.bookingForm = this.fb.group({
      checkIn: [null, Validators.required],
      checkOut: [null, Validators.required],
      guests: [2, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => this.hotelsService.getHotelDetails(
        params['id'],
        this.route.snapshot.queryParams['source'] as 'booking' | 'agoda'
      ))
    ).subscribe({
      next: (hotel) => {
        this.hotel = hotel;
        this.initializeMap();
      },
      error: (error) => {
        console.error('Error loading hotel details:', error);
      }
    });

    // Set initial dates from query params
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams['checkIn'] && queryParams['checkOut']) {
      this.bookingForm.patchValue({
        checkIn: new Date(queryParams['checkIn']),
        checkOut: new Date(queryParams['checkOut']),
        guests: queryParams['adults'] || 2
      });
    }
  }

  ngAfterViewInit() {
    if (this.hotel && this.mapContainer) {
      this.mapService.initializeMap(this.mapContainer.nativeElement, {
        style: 'mapbox://styles/mapbox/streets-v12',
        center: { lat: this.hotel.latitude, lng: this.hotel.longitude },
        zoom: 15
      });

      this.mapService.addMarker(
        'hotel',
        {
          lat: this.hotel.latitude,
          lng: this.hotel.longitude,
          name: this.hotel.name,
          address: this.hotel.address
        }
      );
    }
  }

  getAmenityIcon(amenity: string): string {
    const icons: { [key: string]: string } = {
      'POOL': 'pi pi-water',
      'SPA': 'pi pi-heart',
      'GYM': 'pi pi-heart-fill',
      'RESTAURANT': 'pi pi-coffee',
      'PARKING': 'pi pi-car',
      'WIFI': 'pi pi-wifi',
      'AIRPORT_SHUTTLE': 'pi pi-send',
      'ROOM_SERVICE': 'pi pi-bell',
      'BAR': 'pi pi-glass',
      'BEACH_ACCESS': 'pi pi-sun'
    };
    return icons[amenity] || 'pi pi-check';
  }

  bookRoom(room: any) {
    this.selectedRoom = room;
    this.showBookingDialog = true;
  }

  submitBooking() {
    if (this.bookingForm.valid) {
      // Implement booking logic
    }
  }

  private initializeMap() {
    if (this.hotel && this.mapContainer) {
      this.mapService.initializeMap(this.mapContainer.nativeElement, {
        style: 'mapbox://styles/mapbox/streets-v12',
        center: { lat: this.hotel.latitude, lng: this.hotel.longitude },
        zoom: 15
      });

      this.mapService.addMarker(
        'hotel',
        {
          lat: this.hotel.latitude,
          lng: this.hotel.longitude,
          name: this.hotel.name,
          address: this.hotel.address
        }
      );
    }
  }
} 