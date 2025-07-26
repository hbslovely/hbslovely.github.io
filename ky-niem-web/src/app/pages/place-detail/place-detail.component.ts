import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlaceCardComponent } from '../../shared/components/place-card/place-card.component';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Location } from '@angular/common';
import { MemoryPlace } from '../../shared/models';

interface PlaceListConfig {
  files: string[];
  basePath: string;
}

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
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const placeId = params['id'];
      this.loadPlaceDetails(placeId);
    });
  }

  goBack() {
    this.location.back();
  }

  getDirectionText(attraction: any): string {
    const distance = attraction.distance?.toLowerCase() || '';
    
    if (distance.includes('bắc')) {
      return 'hướng Bắc';
    } else if (distance.includes('nam')) {
      return 'hướng Nam';
    } else if (distance.includes('đông')) {
      return 'hướng Đông';
    } else if (distance.includes('tây')) {
      return 'hướng Tây';
    } else if (distance.includes('đông bắc')) {
      return 'hướng Đông Bắc';
    } else if (distance.includes('đông nam')) {
      return 'hướng Đông Nam';
    } else if (distance.includes('tây bắc')) {
      return 'hướng Tây Bắc';
    } else if (distance.includes('tây nam')) {
      return 'hướng Tây Nam';
    }

    return 'đường chính';
  }

  private loadPlaceDetails(placeId: string) {
    this.http.get<PlaceListConfig>('assets/data/memory-place-list/config.json')
      .pipe(
        switchMap(config => {
          const requests = config.files.map(filename => 
            this.http.get<{places: MemoryPlace[]}>(`${config.basePath}/${filename}`).pipe(
              map(response => response.places)
            )
          );
          return forkJoin(requests);
        }),
        map(results => {
          // Combine all places from different files
          const allPlaces = results.flat();
          const selectedPlace = allPlaces.find(p => p.id === placeId);
          const otherPlaces = selectedPlace 
            ? allPlaces
                .filter(p => p.id !== placeId)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
            : [];
          return { selectedPlace, otherPlaces };
        })
      ).subscribe({
        next: ({ selectedPlace, otherPlaces }) => {
          this.place = selectedPlace || null;
          if (!this.place) {
            this.router.navigate(['/']);
            return;
          }
          this.otherPlaces = otherPlaces;
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
