import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MemoryPlace } from '../../models';

@Component({
  selector: 'app-memory-places',
  templateUrl: './memory-places.component.html',
  styleUrls: ['./memory-places.component.scss'],
  standalone: true,
  imports: [CommonModule]
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
