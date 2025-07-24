import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  UserOutline,
  HistoryOutline,
  ToolOutline,
  ProjectOutline,
  FilePdfOutline,
  LinkedinOutline,
  GithubOutline,
  GlobalOutline,
  MenuOutline,
  CloseOutline,
  LoadingOutline
} from '@ant-design/icons-angular/icons';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideNzIcons } from './icons-provider';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

registerLocaleData(en);

const icons: IconDefinition[] = [
  UserOutline,
  HistoryOutline,
  ToolOutline,
  ProjectOutline,
  FilePdfOutline,
  LinkedinOutline,
  GithubOutline,
  GlobalOutline,
  MenuOutline,
  CloseOutline,
  LoadingOutline
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideNzI18n(en_US),
    provideAnimations(),
    { provide: NZ_I18N, useValue: en_US },
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    provideNzIcons(),
    importProvidersFrom(
      FormsModule,
    )
  ]
};
