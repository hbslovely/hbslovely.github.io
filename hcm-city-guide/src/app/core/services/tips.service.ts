import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable, forkJoin, map } from 'rxjs';

export interface TipsSection {
  title: string;
  description?: string;
  guidelines: string[];
}

export interface TipsCategory {
  title: string;
  sections: {
    [key: string]: {
      title: string;
      description?: string;
      guidelines: {
        [key: string]: string;
      };
    };
  };
}

export interface TipsData {
  localEtiquette: TipsCategory;
  safetyTips: TipsCategory;
  culturalAwareness: TipsCategory;
}

export interface TipsTranslations {
  LOCAL_ETIQUETTE: {
    TITLE: string;
    SECTIONS: {
      [key: string]: {
        TITLE: string;
        DESCRIPTION?: string;
        GUIDELINES: {
          [key: string]: string;
        };
      };
    };
  };
  SAFETY_TIPS: {
    TITLE: string;
    SECTIONS: {
      [key: string]: {
        TITLE: string;
        DESCRIPTION?: string;
        GUIDELINES: {
          [key: string]: string;
        };
      };
    };
  };
  CULTURAL_AWARENESS: {
    TITLE: string;
    SECTIONS: {
      [key: string]: {
        TITLE: string;
        DESCRIPTION?: string;
        GUIDELINES: {
          [key: string]: string;
        };
      };
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class TipsService {
  private readonly DATA_PATH = 'assets/data';
  private readonly TRANSLATIONS_PATH = 'assets/i18n/tips';

  constructor(
    private http: HttpClient,
    private translateService: TranslateService
  ) {}

  /**
   * Load tips data structure and translations for the current language
   */
  loadTipsData(): Observable<TipsData> {
    return forkJoin({
      localEtiquette: this.http.get<any>(`${this.DATA_PATH}/local-etiquette.json`),
      safetyTips: this.http.get<any>(`${this.DATA_PATH}/safety-tips.json`),
      culturalAwareness: this.http.get<any>(`${this.DATA_PATH}/cultural-awareness.json`),
      translations: this.http.get<TipsTranslations>(`${this.TRANSLATIONS_PATH}/tips.${this.translateService.currentLang}.json`)
    }).pipe(
      map(({ localEtiquette, safetyTips, culturalAwareness, translations }) => ({
        localEtiquette: this.mergeTipsWithTranslations(localEtiquette, translations.LOCAL_ETIQUETTE),
        safetyTips: this.mergeTipsWithTranslations(safetyTips, translations.SAFETY_TIPS),
        culturalAwareness: this.mergeTipsWithTranslations(culturalAwareness, translations.CULTURAL_AWARENESS)
      }))
    );
  }

  /**
   * Load a specific tips category
   */
  loadTipsCategory(category: keyof TipsData): Observable<TipsCategory> {
    const dataFile = this.getCategoryFileName(category);
    const translationKey = this.getTranslationKey(category);
    
    return forkJoin({
      data: this.http.get<any>(`${this.DATA_PATH}/${dataFile}`),
      translations: this.http.get<TipsTranslations>(`${this.TRANSLATIONS_PATH}/tips.${this.translateService.currentLang}.json`)
    }).pipe(
      map(({ data, translations }) => this.mergeTipsWithTranslations(data, translations[translationKey]))
    );
  }

  /**
   * Merge data structure with translations
   */
  private mergeTipsWithTranslations(data: any, translations: any): TipsCategory {
    const result: TipsCategory = {
      title: translations.TITLE,
      sections: {}
    };

    Object.keys(data.sections).forEach(sectionKey => {
      const section = data.sections[sectionKey];
      const translationKey = this.camelToUpperSnakeCase(sectionKey);
      const translatedSection = translations.SECTIONS[translationKey];

      result.sections[sectionKey] = {
        title: translatedSection.TITLE,
        ...(translatedSection.DESCRIPTION && { description: translatedSection.DESCRIPTION }),
        guidelines: section.guidelines.reduce((guidelines: { [key: string]: string }, guidelineKey: string) => {
          guidelines[guidelineKey.toLowerCase()] = translatedSection.GUIDELINES[guidelineKey];
          return guidelines;
        }, {})
      };
    });

    return result;
  }

  /**
   * Get the corresponding data file name for a category
   */
  private getCategoryFileName(category: keyof TipsData): string {
    const fileNames: Record<keyof TipsData, string> = {
      localEtiquette: 'local-etiquette.json',
      safetyTips: 'safety-tips.json',
      culturalAwareness: 'cultural-awareness.json'
    };
    return fileNames[category];
  }

  /**
   * Get the corresponding translation key for a category
   */
  private getTranslationKey(category: keyof TipsData): keyof TipsTranslations {
    const keys: Record<keyof TipsData, keyof TipsTranslations> = {
      localEtiquette: 'LOCAL_ETIQUETTE',
      safetyTips: 'SAFETY_TIPS',
      culturalAwareness: 'CULTURAL_AWARENESS'
    };
    return keys[category];
  }

  /**
   * Convert camelCase to UPPER_SNAKE_CASE
   */
  private camelToUpperSnakeCase(str: string): string {
    return str
      .split(/(?=[A-Z])/)
      .join('_')
      .toUpperCase();
  }
} 