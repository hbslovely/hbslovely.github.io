import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MemoryPlace } from '../../shared/models';
import { PlaceCardComponent } from '../../shared/components/place-card/place-card.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, PlaceCardComponent]
})
export class PlaceDetailComponent implements OnInit {
  place: MemoryPlace | null = null;
  otherPlaces: MemoryPlace[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const placeId = params['id'];
      this.loadPlaceDetails(placeId);
    });
  }

  private loadPlaceDetails(placeId: string) {
    this.http.get<{places: MemoryPlace[]}>('assets/data/memory-places.json')
      .subscribe({
        next: (data) => {
          this.place = data.places.find(p => p.id === placeId) || null;
          if (!this.place) {
            this.router.navigate(['/']);
            return;
          }
          // Get 3 random other places
          this.otherPlaces = data.places
            .filter(p => p.id !== placeId)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading place details:', error);
          this.loading = false;
          this.router.navigate(['/']);
        }
      });
  }
}
