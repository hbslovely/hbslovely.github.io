import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  poster: string;
  backdrop: string;
  duration: number;
  rating: number;
  genre: string[];
  language: string;
  subtitles: string[];
  releaseDate: Date;
  synopsis: string;
  trailer?: string;
  cast: string[];
  director: string;
  showTimes: ShowTime[];
}

interface ShowTime {
  cinemaId: string;
  date: Date;
  times: string[];
  format: 'Standard' | '3D' | 'IMAX' | '4DX';
  price: number;
  availableSeats: number;
}

interface Cinema {
  id: string;
  name: string;
  address: string;
  district: string;
  rating: number;
  facilities: string[];
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'app-cinemas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    TabViewModule,
    CarouselModule,
    DropdownModule,
    CalendarModule,
    RatingModule,
    ChipModule,
    DialogModule,
    InputTextModule
  ],
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit {
  movies: Movie[] = [];
  cinemas: Cinema[] = [];
  filteredCinemas: Cinema[] = [];
  selectedMovie: Movie | null = null;
  selectedCinema: Cinema | null = null;
  selectedDate: Date = new Date();
  selectedShowtime: ShowTime | null = null;
  showMovieDialog: boolean = false;
  showBookingDialog: boolean = false;
  selectedSort: string = 'popular';
  selectedDistrict: string = '';
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 7));

  sortOptions = [
    { label: 'Most Popular', value: 'popular' },
    { label: 'Latest Release', value: 'latest' },
    { label: 'Rating', value: 'rating' }
  ];

  districts = [
    { label: 'All Districts', value: '' },
    { label: 'District 1', value: 'district-1' },
    { label: 'District 2', value: 'district-2' },
    { label: 'District 3', value: 'district-3' }
  ];

  constructor() {}

  ngOnInit() {
    this.loadMovies();
    this.loadCinemas();
  }

  loadMovies() {
    // Implement API call to load movies
  }

  loadCinemas() {
    // Implement API call to load cinemas
    this.filterCinemas();
  }

  sortMovies() {
    // Implement sorting logic
  }

  filterCinemas() {
    this.filteredCinemas = this.selectedDistrict
      ? this.cinemas.filter(cinema => cinema.district === this.selectedDistrict)
      : this.cinemas;
  }

  showMovieDetails(movie: Movie) {
    this.selectedMovie = movie;
    this.showMovieDialog = true;
  }

  watchTrailer(movie: Movie) {
    // Implement trailer playback
  }

  bookTickets(movie: Movie, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.selectedMovie = movie;
    this.showBookingDialog = true;
    this.showMovieDialog = false;
  }

  viewShowtimes(cinema: Cinema) {
    this.selectedCinema = cinema;
    // Implement showtime view
  }

  getFacilityIcon(facility: string): string {
    const icons: { [key: string]: string } = {
      'IMAX': 'pi pi-video',
      '4DX': 'pi pi-star',
      'Parking': 'pi pi-car',
      'Food Court': 'pi pi-shopping-cart',
      'VIP Seats': 'pi pi-ticket'
    };
    return icons[facility] || 'pi pi-check';
  }

  onDateSelect() {
    // Refresh available showtimes
  }

  getCinemasWithShowtimes(): Cinema[] {
    // Return cinemas with available showtimes for selected movie and date
    return [];
  }

  getFormats(cinema: Cinema): string[] {
    // Return available formats for selected movie at this cinema
    return [];
  }

  getTimeSlots(cinema: Cinema, format: string): string[] {
    // Return available time slots for selected movie, date, cinema and format
    return [];
  }

  isTimeSlotSelected(cinema: Cinema, format: string, time: string): boolean {
    // Check if this time slot is selected
    return false;
  }

  selectTimeSlot(cinema: Cinema, format: string, time: string) {
    // Handle time slot selection
  }

  continueBooking() {
    // Proceed to seat selection
  }
} 