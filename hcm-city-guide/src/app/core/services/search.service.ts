import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SearchResult {
  id: string;
  type: 'ward' | 'landmark' | 'food' | 'culture' | 'tip';
  title: string;
  description: string;
  image?: string;
  route: string;
  tags?: string[];
  rating?: number;
  location?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  constructor(private http: HttpClient) {}

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  search(term: string, types?: string[]): Observable<SearchResult[]> {
    // For now, we'll simulate search results
    // In a real app, this would make an API call
    return of([
      {
        id: '1',
        type: 'ward',
        title: 'District 1',
        description: 'Central business district of Ho Chi Minh City',
        image: 'assets/images/district-1.jpg',
        route: '/discover/wards/district-1',
        tags: ['central', 'business', 'tourist'],
        location: 'Central HCMC'
      },
      {
        id: '2',
        type: 'landmark',
        title: 'Ben Thanh Market',
        description: 'Historic market in the heart of Ho Chi Minh City',
        image: 'assets/images/ben-thanh-market.jpg',
        route: '/discover/landmarks/ben-thanh-market',
        tags: ['shopping', 'historic', 'tourist'],
        location: 'District 1'
      },
      {
        id: '3',
        type: 'food',
        title: 'Pho',
        description: 'Traditional Vietnamese noodle soup',
        image: 'assets/images/pho.jpg',
        route: '/discover/food/pho',
        tags: ['noodles', 'soup', 'traditional'],
        rating: 4.8
      }
    ] as any).pipe(
      map(results => {
        if (!term.trim()) {
          return [];
        }

        return results.filter((result: any) => {
          const matchesTerm = (
            result.title.toLowerCase().includes(term.toLowerCase()) ||
            result.description.toLowerCase().includes(term.toLowerCase()) ||
            result.tags?.some((tag: any) => tag.toLowerCase().includes(term.toLowerCase()))
          );

          const matchesType = !types?.length || types.includes(result.type);

          return matchesTerm && matchesType;
        });
      })
    );
  }

  getSearchTypes(): { id: string, label: string }[] {
    return [
      { id: 'ward', label: 'SEARCH.TYPES.WARDS' },
      { id: 'landmark', label: 'SEARCH.TYPES.LANDMARKS' },
      { id: 'food', label: 'SEARCH.TYPES.FOOD' },
      { id: 'culture', label: 'SEARCH.TYPES.CULTURE' },
      { id: 'tip', label: 'SEARCH.TYPES.TIPS' }
    ];
  }
}
