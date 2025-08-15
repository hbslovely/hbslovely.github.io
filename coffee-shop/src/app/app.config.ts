import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes, routeProviders } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    ...routeProviders,
    PrimeNGConfig
  ]
};
