import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MemoryPlace } from '../../models';
import { PlaceCardComponent } from '../place-card/place-card.component';

@Component({
  selector: 'app-memory-places',
  templateUrl: './memory-places.component.html',
  styleUrls: ['./memory-places.component.scss'],
  standalone: true,
  imports: [CommonModule, PlaceCardComponent]
})
export class MemoryPlacesComponent implements OnInit {
  places: MemoryPlace[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{places: MemoryPlace[]}>('assets/data/memory-places.json')
      .subscribe({
        next: (data) => {
          this.places = data.places;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading memory places:', error);
          this.loading = false;
        }
      });
  }
}
