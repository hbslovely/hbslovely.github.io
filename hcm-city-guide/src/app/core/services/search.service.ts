import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
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
  tags?: string[];
  source?: string;
}

interface DataFile {
  path: string;
  searchFields: string[];
  type: string;
  routePrefix: string[];
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

  private readonly dataFiles: DataFile[] = [
    {
      path: 'assets/data/attractions.json',
      searchFields: ['nameKey', 'descriptionKey', 'address'],
      type: 'place',
      routePrefix: ['/discover', 'attractions']
    },
    {
      path: 'assets/data/cinemas.json',
      searchFields: ['name', 'description', 'address'],
      type: 'entertainment',
      routePrefix: ['/entertainment', 'cinemas']
    },
    {
      path: 'assets/data/entertainment.json',
      searchFields: ['name', 'description', 'address'],
      type: 'entertainment',
      routePrefix: ['/entertainment']
    },
    {
      path: 'assets/data/discover.json',
      searchFields: ['nameKey', 'descriptionKey'],
      type: 'place',
      routePrefix: ['/discover']
    }
  ];

  constructor(
    private http: HttpClient,
    private entertainmentService: EntertainmentService,
    private hotelsService: HotelsService,
    private translate: TranslateService
  ) {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      this.recentSearches.next(JSON.parse(savedSearches));
    }
  }

  private searchFile(file: DataFile, query: string): Observable<SearchResult[]> {
    return this.http.get<any>(file.path).pipe(
      map(data => this.extractSearchResults(data, query, file)),
      catchError(() => of([]))
    );
  }

  private extractSearchResults(data: any, query: string, file: DataFile): SearchResult[] {
    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    // Helper function to search recursively through objects
    const searchObject = (obj: any, parentKey: string = ''): void => {
      if (!obj) return;

      if (Array.isArray(obj)) {
        obj.forEach(item => searchObject(item, parentKey));
        return;
      }

      if (typeof obj === 'object') {
        // Check if this object is a searchable item
        if (file.searchFields.some(field => field in obj)) {
          const matchesSearch = file.searchFields.some(field => {
            const value = obj[field];
            if (typeof value === 'string') {
              // For direct string values
              return value.toLowerCase().includes(searchTerm);
            } else if (field.endsWith('Key') && typeof value === 'string') {
              // For translation keys
              const translated = this.translate.instant(value);
              return translated.toLowerCase().includes(searchTerm);
            }
            return false;
          });

          if (matchesSearch) {
            results.push(this.mapToSearchResult(obj, file));
          }
        }

        // Continue searching through all properties
        Object.entries(obj).forEach(([key, value]) => {
          searchObject(value, key);
        });
      }
    };

    searchObject(data);
    return results;
  }

  private mapToSearchResult(item: any, file: DataFile): SearchResult {
    const title = item.nameKey ? 
      this.translate.instant(item.nameKey) : 
      (item.title || item.name);

    const description = item.descriptionKey ? 
      this.translate.instant(item.descriptionKey) : 
      item.description;

    return {
      id: item.id || `${file.type}-${Math.random().toString(36).substr(2, 9)}`,
      type: file.type as any,
      title,
      description,
      image: item.image || item.images?.[0],
      rating: item.rating,
      price: item.price ? {
        amount: typeof item.price === 'string' ? 
          parseFloat(item.price.replace(/[^0-9.]/g, '')) : 
          item.price,
        currency: 'VND'
      } : undefined,
      location: item.address || item.location || '',
      route: [...file.routePrefix],
      queryParams: item.id ? { id: item.id } : undefined,
      tags: item.tags,
      source: file.path.split('/').pop()?.replace('.json', '')
    };
  }

  search(query: string, selectedTypes?: string[]): Observable<SearchResult[]> {
    // Add to recent searches
    this.addRecentSearch(query);

    // Filter data files by selected types if any
    const filesToSearch = selectedTypes?.length ? 
      this.dataFiles.filter(file => selectedTypes.includes(file.type)) : 
      this.dataFiles;

    // Search all selected files
    return forkJoin(
      filesToSearch.map(file => this.searchFile(file, query))
    ).pipe(
      map(results => results.flat()),
      delay(300) // Simulate API delay
    );
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

    // Filter suggestions based on search term
    return of(suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(searchTerm) ||
      suggestion.subtitle?.toLowerCase().includes(searchTerm)
    )).pipe(delay(300));
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

  getSearchTypes(): { id: string, label: string }[] {
    return [
      { id: 'place', label: 'SEARCH.TYPES.PLACE' },
      { id: 'hotel', label: 'SEARCH.TYPES.HOTEL' },
      { id: 'entertainment', label: 'SEARCH.TYPES.ENTERTAINMENT' },
      { id: 'food', label: 'SEARCH.TYPES.FOOD' },
      { id: 'transport', label: 'SEARCH.TYPES.TRANSPORT' }
    ];
  }
}
