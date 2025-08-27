import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) {
  }

  private getTranslationFile(section: string, lang: string): Observable<any> {
    return this.http.get<any>(`/assets/i18n/${ section.toLowerCase() }/${ section.toLowerCase() }.${ lang }.json`);
  }

  getTranslation(lang: string): Observable<any> {
    const requests = this.sections.map(section =>
      this.getTranslationFile(section, lang)
    );

    return forkJoin(requests).pipe(
      map(responses => {
        return responses.reduce((acc, response, index) => {
          const section = this.sections[index];
          acc[section] = response;
          return acc;
        }, {} as any);
      })
    );
  }
}
