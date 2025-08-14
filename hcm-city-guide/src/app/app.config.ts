import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationLoaderService } from './core/services/translation-loader.service';
import { provideAnimations } from '@angular/platform-browser/animations';

export function createTranslateLoader(service: TranslationLoaderService) {
  return {
    getTranslation: (lang: string) => service.getTranslation(lang)
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [TranslationLoaderService]
        }
      })
    )
  ]
};
