import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HomeData {
  featuredPlaces: {
    title: string;
    image: string;
    descriptionKey: string;
  }[];
  categories: {
    titleKey: string;
    descriptionKey: string;
    icon: string;
    route: string;
  }[];
  quickFacts: {
    key: string;
    icon: string;
  }[];
  carouselResponsiveOptions: {
    breakpoint: string;
    numVisible: number;
    numScroll: number;
  }[];
}

export interface DiscoverData {
  sections: {
    wards: {
      features: string[];
      cultures: string[];
      wardTypes: string[];
    };
    food: {
      categories: {
        id: string;
        nameKey: string;
        descriptionKey: string;
        image: string;
        dishes: {
          nameKey: string;
          descriptionKey: string;
          price: string;
          tags: string[];
          image: string;
        }[];
      }[];
    };
    culture: {
      events: {
        nameKey: string;
        descriptionKey: string;
        dateKey: string;
        image: string;
        location: string;
      }[];
      heritages: {
        nameKey: string;
        descriptionKey: string;
        image: string;
        yearBuilt: string;
        category: string;
      }[];
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly DATA_PATH = 'assets/data';

  constructor(private http: HttpClient) {}

  getHomeData(): Observable<HomeData> {
    return this.http.get<HomeData>(`${this.DATA_PATH}/home.json`);
  }

  getDiscoverData(): Observable<DiscoverData> {
    return this.http.get<DiscoverData>(`${this.DATA_PATH}/discover.json`);
  }

  /**
   * Generic method to get data from any JSON file
   * @param path Path to the JSON file relative to assets folder
   * @returns Observable of the requested data type
   */
  get<T>(path: string): Observable<T> {
    return this.http.get<T>(path);
  }
} 