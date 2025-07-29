import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../models/language.models';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly translateService = inject(TranslateService);
  private currentLanguage = new BehaviorSubject<Language>('en');
  language$ = this.currentLanguage.asObservable();

  constructor() {
    // Try to get language from localStorage
    const savedLang = localStorage.getItem('language') as Language;
    const browserLang = navigator.language.toLowerCase();
    
    // Set initial language
    let initialLang: Language = 'en';
    if (savedLang && (savedLang === 'en' || savedLang === 'vi')) {
      initialLang = savedLang;
    } else if (browserLang.startsWith('vi')) {
      initialLang = 'vi';
    }

    // Initialize translation service
    this.translateService.setDefaultLang('en');
    this.setLanguage(initialLang);
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage.value;
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.next(lang);
    this.translateService.use(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang);
  }
}
