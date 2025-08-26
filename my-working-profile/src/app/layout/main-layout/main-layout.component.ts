import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ContactButtonComponent } from '../../components/contact-button/contact-button.component';
import { WatermarkComponent } from '../../components/watermark/watermark.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { ScrollToTopDirective } from '../../directives/scroll-to-top.directive';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavBarComponent,
    FooterComponent,
    ContactButtonComponent,
    WatermarkComponent,
    ScrollToTopDirective
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class MainLayoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Ensure we scroll to top on navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.scrollToTop();
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  private scrollToTop() {
    // Reset scroll position
    window.scrollTo(0, 0);
    
    // For cases where the above might not be sufficient
    if (typeof document !== 'undefined') {
      const scrollingElement = document.scrollingElement || document.documentElement;
      if (scrollingElement) {
        scrollingElement.scrollTop = 0;
      }
    }
  }
}
