import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollToTopService {
  constructor(private router: Router) {
    // Subscribe to NavigationEnd events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Scroll to top with smooth behavior
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      
      // Some browsers or situations may require a more forceful approach
      // In case the smooth scroll doesn't trigger properly
      setTimeout(() => {
        const scrollingElement = document.scrollingElement || document.documentElement;
        if (scrollingElement.scrollTop !== 0) {
          scrollingElement.scrollTop = 0;
        }
      }, 100);
    });
  }
} 