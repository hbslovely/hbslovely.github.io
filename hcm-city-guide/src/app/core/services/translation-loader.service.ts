import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationLoaderService {
  private readonly sections: string[] = [
    'ATTRACTIONS',
    'COMMON',
    'CONTACT',
    'CULTURES',
    'DISCOVER',
    'DONATE',
    'ENTERTAINMENT',
    'FEATURES',
    'FOOD',
    'FOOTER',
    'HOME',
    'HOTELS',
    'LANDMARKS',
    'MENU',
    'PAGINATION',
    'PRIVACY',
    'SEARCH',
    'STATS',
    'TIPS',
    'TERMS',
    'WARD',
    'WARDS',
    'WARD_TYPES'
  ];

  constructor(private http: HttpClient) {}

  private getTranslationFile(section: string, lang: string): Observable<any> {
    return this.http.get<any>(`/assets/i18n/${section.toLowerCase()}/${section.toLowerCase()}.${lang}.json`)
      .pipe(
        catchError(() => {
          // If section file not found, try root folder
          return this.http.get<any>(`/assets/i18n/${section.toLowerCase()}.${lang}.json`)
            .pipe(
              catchError(() => of({})) // Return empty object if neither exists
            );
        })
      );
  }

  private getRootTranslation(lang: string): Observable<any> {
    return this.http.get<any>(`/assets/i18n/${lang}.json`)
      .pipe(
        catchError(() => of({}))
      );
  }

  getTranslation(lang: string): Observable<any> {
    // Get both section translations and root translation
    const sectionRequests = this.sections.map(section =>
      this.getTranslationFile(section, lang)
    );
    const rootRequest = this.getRootTranslation(lang);

    return forkJoin([...sectionRequests, rootRequest]).pipe(
      map(responses => {
        const result = {} as any;
        
        // Process section responses
        responses.slice(0, -1).forEach((response, index) => {
          const section = this.sections[index];
          result[section] = response;
        });

        // Merge root translation
        const rootTranslation = responses[responses.length - 1];
        Object.assign(result, rootTranslation);

        return result;
      })
    );
  }
}
