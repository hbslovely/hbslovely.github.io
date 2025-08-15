import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Ward {
  id: string;
  name: string;
  description: string;
  type?: string;
  area: string;
  features: string[];
  cultures?: string[];
  landmarks?: {
    id: string;
    name: string;
    images: string[];
  }[];
  image?: string;
  province?: string;
  interesting_facts?: string[];
  neighboring_wards?: {
    id: string;
    name: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class WardsService {
  constructor(private http: HttpClient) {}

  getWards(lang: string): Observable<Ward[]> {
    return this.http.get<Record<string, any>>(`/assets/i18n/wards/wards.${lang}.json`).pipe(
      map(wardsObj => {
        // Convert object to array and transform the data structure
        return Object.entries(wardsObj).map(([key, ward]) => ({
          id: ward.id,
          name: ward.name,
          description: ward.description,
          type: ward.type,
          area: ward.area,
          features: ward.features,
          landmarks: ward.landmarks,
          province: ward.province,
          interesting_facts: ward.interesting_facts,
          neighboring_wards: ward.neighboring_wards,
          image: `assets/images/wards/${ward.id}.jpg` // Assuming images follow this naming convention
        }));
      })
    );
  }
} 