import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationLoaderService {
  private readonly sections: string[] = [
    'HOME',
    'MENU',
    'ATTRACTIONS',
    'PRIVACY',
    'TERMS',
    'FOOTER'
  ];

  constructor(private http: HttpClient) {}

  private getTranslationFile(section: string, lang: string): Observable<any> {
    return this.http.get<any>(`/assets/i18n/${section.toLowerCase()}/${section.toLowerCase()}.${lang}.json`);
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
