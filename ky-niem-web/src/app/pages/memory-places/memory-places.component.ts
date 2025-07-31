import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MemoryPlace } from '../../shared/models';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { removeVietnameseTones } from '../../shared/utils/string.utils';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceCardComponent } from '../../shared/components/place-card/place-card.component';
import { MemoryPlacesFilterComponent } from '../../shared/components/memory-places-filter/memory-places-filter.component';

interface Filter {
  region: string[];
  features: string[];
  locationType: string[];
}

interface PlaceListConfig {
  files: string[];
  basePath: string;
}

interface LocationMappings {
  locations: {
    domestic: {
      north: string[];
      central: string[];
      south: string[];
    };
    international: {
      asia: {
        [country: string]: string[];
      };
      europe: {
        [country: string]: string[];
      };
      america: {
        [country: string]: string[];
      };
    };
  };
}

@Component({
  selector: 'app-memory-places',
  standalone: true,
  imports: [CommonModule, PlaceCardComponent, FormsModule, MemoryPlacesFilterComponent],
  templateUrl: './memory-places.component.html',
  styleUrls: ['./memory-places.component.scss']
})
export class MemoryPlacesComponent implements OnInit {
  places: MemoryPlace[] = [];
  filteredPlaces: MemoryPlace[] = [];
  loading = true;
  isResetting = false;
  searchText = '';
  private locationMappings: LocationMappings | null = null;

  locationTypes = [
    { label: 'Trong nước', value: 'domestic', icon: 'pi pi-flag' },
    { label: 'Quốc tế', value: 'international', icon: 'pi pi-globe' }
  ];

  regions = [
    { label: 'Miền Bắc', value: 'north' },
    { label: 'Miền Trung', value: 'central' },
    { label: 'Miền Nam', value: 'south' }
  ];

  features = [
    { label: 'Biển', value: 'sea', icon: 'pi pi-cloud' },
    { label: 'Núi', value: 'mountain', icon: 'pi pi-chart-line' },
    { label: 'Di tích', value: 'historical', icon: 'pi pi-building' },
    { label: 'Chợ', value: 'market', icon: 'pi pi-shopping-cart' },
    { label: 'Ẩm thực', value: 'food', icon: 'pi pi-star' }
  ];

  selectedFilters: Filter = {
    region: [],
    features: [],
    locationType: []
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // First load the data
    forkJoin({
      config: this.http.get<PlaceListConfig>('assets/data/memory-place-list/config.json'),
      locations: this.http.get<LocationMappings>('assets/data/region-mappings.json')
    }).pipe(
      switchMap(({ config, locations }) => {
        this.locationMappings = locations;
        const requests = config.files.map(filename =>
          this.http.get<{places: MemoryPlace[]}>(`${config.basePath}/${filename}`).pipe(
            map(response => response.places)
          )
        );
        return forkJoin(requests);
      })
    ).subscribe({
      next: (results) => {
        this.places = results.flat();
        this.applyFilters();
        this.loading = false;

        // After data is loaded, handle query params
        this.route.queryParams.subscribe(params => {
          if (params['region']) {
            this.selectedFilters.region = [params['region']];
          }
          if (params['feature']) {
            this.selectedFilters.features = [params['feature']];
          }
          this.applyFilters();
        });
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.loading = false;
      }
    });
  }

  toggleFilter(type: string, value: string): void {
    const filterArray = (this.selectedFilters as any)[type];
    const index = filterArray.indexOf(value);

    if (index === -1) {
      filterArray.push(value);
    } else {
      filterArray.splice(index, 1);
    }

    this.applyFilters();
  }

  private applyFilters() {
    this.filteredPlaces = this.places.filter(place => {
      // If no filters are selected and no search text, show all places
      if (this.selectedFilters.region.length === 0 &&
          this.selectedFilters.features.length === 0 &&
          this.selectedFilters.locationType.length === 0 &&
          !this.searchText.trim()) {
        return true;
      }

      let matchesRegion = true;
      let matchesFeatures = true;
      let matchesLocationType = true;
      let matchesSearch = true;

      // Check text search
      if (this.searchText.trim()) {
        const searchLower = removeVietnameseTones(this.searchText.toLowerCase().trim());
        const nameNormalized = removeVietnameseTones(place.name);
        const locationNormalized = removeVietnameseTones(place.location);
        const descriptionNormalized = removeVietnameseTones(place.description);
        const detailedDescriptionNormalized = place.detailedDescription ? removeVietnameseTones(place.detailedDescription) : '';

        matchesSearch =
          nameNormalized.includes(searchLower) ||
          locationNormalized.includes(searchLower) ||
          descriptionNormalized.includes(searchLower) ||
          detailedDescriptionNormalized.includes(searchLower);
      }

      // Check location type filters
      if (this.selectedFilters.locationType.length > 0) {
        matchesLocationType = this.matchesLocationType(place.location);
      }

      // Check region filters
      if (this.selectedFilters.region.length > 0) {
        matchesRegion = this.matchesRegion(place.location);
      }

      // Check feature filters
      if (this.selectedFilters.features.length > 0) {
        matchesFeatures = this.matchesFeatures(place);
      }

      return matchesRegion && matchesFeatures && matchesLocationType && matchesSearch;
    });
  }

  private matchesLocationType(location: string): boolean {
    if (!this.locationMappings) return false;

    const isInternational = this.isInternationalLocation(location);
    return this.selectedFilters.locationType.some(type => {
      if (type === 'international') {
        return isInternational;
      } else {
        return !isInternational;
      }
    });
  }

  private isInternationalLocation(location: string): boolean {
    if (!this.locationMappings) return false;

    const { international } = this.locationMappings.locations;
    const continents = ['asia', 'europe', 'america'] as const;

    return continents.some(continent =>
      Object.values(international[continent]).some(countryNames =>
        countryNames.some(name => location.toLowerCase().includes(name.toLowerCase()))
      )
    );
  }

  private matchesRegion(location: string): boolean {
    if (!this.locationMappings) return false;

    return this.selectedFilters.region.some(region => {
      const regionLocations = this.locationMappings!.locations.domestic[region as keyof typeof this.locationMappings.locations.domestic];
      return regionLocations.some(loc => location.includes(loc));
    });
  }

  private matchesFeatures(place: MemoryPlace): boolean {
    return this.selectedFilters.features.some(feature => {
      switch (feature) {
        case 'sea':
          return place.description.toLowerCase().includes('biển') ||
                 place.name.toLowerCase().includes('biển') ||
                 place.detailedDescription?.toLowerCase().includes('biển');
        case 'mountain':
          return place.description.toLowerCase().includes('núi') ||
                 place.name.toLowerCase().includes('núi') ||
                 place.detailedDescription?.toLowerCase().includes('núi') ||
                 place.name.toLowerCase().includes('đèo');
        case 'historical':
          return place.description.toLowerCase().includes('di tích') ||
                 place.description.toLowerCase().includes('lịch sử') ||
                 place.name.toLowerCase().includes('đền') ||
                 place.name.toLowerCase().includes('chùa') ||
                 place.name.toLowerCase().includes('lăng');
        case 'market':
          return place.name.toLowerCase().includes('chợ');
        case 'food':
          return !!place.recommendedFood?.length ||
                 !!place.localFood?.length;
        default:
          return false;
      }
    });
  }

  onSearch(searchText: string): void {
    this.searchText = searchText;
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return (
      this.selectedFilters.region.length > 0 ||
      this.selectedFilters.features.length > 0 ||
      this.selectedFilters.locationType.length > 0 ||
      !!this.searchText.trim()
    );
  }

  resetFilters(): void {
    this.isResetting = true;

    // Add a small delay to show the loading state
    setTimeout(() => {
      this.selectedFilters = {
        region: [],
        features: [],
        locationType: []
      };
      this.searchText = '';

      // Clear URL query params
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {}
      });

      this.applyFilters();
      this.isResetting = false;
    }, 300);
  }
}
