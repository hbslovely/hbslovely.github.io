import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { EntertainmentService } from './entertainment.service';
import { HotelsService } from './hotels.service';
import { TranslateService } from '@ngx-translate/core';

export interface SearchSuggestion {
  id: string;
  type: 'place' | 'hotel' | 'entertainment' | 'food' | 'transport';
  title: string;
  subtitle?: string;
  image?: string;
  route: string[];
  queryParams?: { [key: string]: string };
}

export interface SearchResult {
  id: string;
  type: 'place' | 'hotel' | 'entertainment' | 'food' | 'transport';
  title: string;
  description: string;
  image?: string;
  rating?: number;
  price?: {
    amount: number;
    currency: string;
  };
  location: string;
  route: string[];
  queryParams?: { [key: string]: string };
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private recentSearches = new BehaviorSubject<string[]>([]);
  private popularSearches = [
    'Ben Thanh Market',
    'District 1 Hotels',
    'Vietnamese Food',
    'Shopping Malls',
    'Theme Parks',
    'Public Transport'
  ];

  constructor(
    private entertainmentService: EntertainmentService,
    private hotelsService: HotelsService,
    private translate: TranslateService
  ) {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      this.recentSearches.next(JSON.parse(savedSearches));
    }
  }

  getSuggestions(query: string): Observable<SearchSuggestion[]> {
    if (!query.trim()) {
      return of([]);
    }

    const suggestions: SearchSuggestion[] = [];
    const searchTerm = query.toLowerCase();

    // Add place suggestions
    suggestions.push(
      {
        id: 'ben-thanh',
        type: 'place',
        title: 'Ben Thanh Market',
        subtitle: 'District 1, Ho Chi Minh City',
        image: 'assets/images/landmarks/ben-thanh-market.jpg',
        route: ['/discover', 'attractions'],
        queryParams: { id: 'ben-thanh' }
      },
      {
        id: 'district-1',
        type: 'place',
        title: 'District 1',
        subtitle: 'City Center',
        image: 'assets/images/wards/district-1.jpg',
        route: ['/discover', 'wards'],
        queryParams: { id: 'district-1' }
      }
    );

    // Add hotel suggestions
    suggestions.push(
      {
        id: 'hotels-d1',
        type: 'hotel',
        title: 'Hotels in District 1',
        subtitle: 'Luxury & Boutique Hotels',
        route: ['/hotels', 'search'],
        queryParams: { district: 'district-1' }
      },
      {
        id: 'apartments',
        type: 'hotel',
        title: 'Serviced Apartments',
        subtitle: 'Long-term Stay Options',
        route: ['/hotels', 'apartments']
      }
    );

    // Add entertainment suggestions
    suggestions.push(
      {
        id: 'dam-sen',
        type: 'entertainment',
        title: 'Dam Sen Water Park',
        subtitle: 'Theme Park & Water Park',
        image: 'assets/images/entertainment/dam-sen-water-park.jpg',
        route: ['/entertainment', 'theme-parks'],
        queryParams: { id: 'dam-sen' }
      },
      {
        id: 'shopping-malls',
        type: 'entertainment',
        title: 'Shopping Malls',
        subtitle: 'Modern Shopping Centers',
        route: ['/entertainment', 'shopping'],
        queryParams: { type: 'mall' }
      }
    );

    // Add food suggestions
    suggestions.push(
      {
        id: 'vietnamese-food',
        type: 'food',
        title: 'Vietnamese Cuisine',
        subtitle: 'Local Food Guide',
        image: 'assets/images/food/mon-an-banh-mi-sai-gon.png',
        route: ['/discover', 'food'],
        queryParams: { cuisine: 'vietnamese' }
      }
    );

    // Add transport suggestions
    suggestions.push(
      {
        id: 'public-transport',
        type: 'transport',
        title: 'Public Transport Guide',
        subtitle: 'Buses & Metro',
        route: ['/transport', 'public-transport']
      },
      {
        id: 'grab',
        type: 'transport',
        title: 'Grab Services',
        subtitle: 'Ride Hailing',
        route: ['/transport', 'ride-hailing'],
        queryParams: { provider: 'grab' }
      }
    );

    // Filter suggestions based on search term
    return of(suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(searchTerm) ||
      suggestion.subtitle?.toLowerCase().includes(searchTerm)
    )).pipe(delay(300)); // Add small delay to simulate API call
  }

  getRecentSearches(): Observable<string[]> {
    return this.recentSearches.asObservable();
  }

  getPopularSearches(): string[] {
    return this.popularSearches;
  }

  addRecentSearch(term: string) {
    const current = this.recentSearches.value;
    const updated = [term, ...current.filter(t => t !== term)].slice(0, 5);
    this.recentSearches.next(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }

  clearRecentSearches() {
    this.recentSearches.next([]);
    localStorage.removeItem('recentSearches');
  }

  search(query: string): Observable<SearchResult[]> {
    // Add to recent searches
    this.addRecentSearch(query);

    // Implement actual search logic here
    // This is a mock implementation
    return of([]).pipe(
      delay(500),
      map(() => {
        const results: SearchResult[] = [
          {
            id: 'ben-thanh',
            type: 'place',
            title: 'Ben Thanh Market',
            description: 'Iconic market in the heart of Ho Chi Minh City',
            image: 'assets/images/landmarks/ben-thanh-market.jpg',
            location: 'District 1, Ho Chi Minh City',
            route: ['/discover', 'attractions'],
            queryParams: { id: 'ben-thanh' }
          },
          // Add more mock results...
        ];
        return results;
      })
    );
  }

  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      place: 'pi pi-map-marker',
      hotel: 'pi pi-home',
      entertainment: 'pi pi-ticket',
      food: 'pi pi-heart',
      transport: 'pi pi-car'
    };
    return icons[type] || 'pi pi-circle';
  }

  getTypeLabel(type: string): string {
    return this.translate.instant(`SEARCH.TYPES.${type.toUpperCase()}`);
  }
}
