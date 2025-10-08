import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ChatWidgetComponent } from './shared/components/chat-widget/chat-widget.component';
import { IframeEmbedComponent } from './shared/components/iframe-embed/iframe-embed.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TranslateModule,
    FooterComponent,
    NavbarComponent,
    ChatWidgetComponent,
    IframeEmbedComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  // Global iframe properties (fixes reload issue)
  analyticsWidgetUrl: string = '';
  socialMediaWidgetUrl: string = '';
  weatherWidgetUrl: string = '';
  
  // Control flags for iframe visibility
  showAnalyticsWidget: boolean = false;
  showSocialMediaWidget: boolean = false;
  showWeatherWidget: boolean = false;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    // Set default language
    this.translate.setDefaultLang('en');
    // Use browser language if available, otherwise use default
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|vi/) ? browserLang : 'en');
    
    // Initialize iframe URLs
    this.initializeIframeUrls();
  }

  private initializeIframeUrls() {
    // Example: Google Analytics embed (replace with actual URLs)
    this.analyticsWidgetUrl = 'https://analytics.google.com/analytics/web/';
    
    // Example: Social media widget
    this.socialMediaWidgetUrl = 'https://www.facebook.com/plugins/page.php';
    
    // Example: Weather widget
    this.weatherWidgetUrl = 'https://weatherwidget.io/';
    
    // Set visibility flags based on environment or user preferences
    this.showAnalyticsWidget = false; // Set to true if needed
    this.showSocialMediaWidget = false; // Set to true if needed
    this.showWeatherWidget = false; // Set to true if needed
  }

  // Method to update iframe URLs dynamically (without causing reload)
  updateIframeUrl(type: 'analytics' | 'social' | 'weather', url: string) {
    switch (type) {
      case 'analytics':
        if (this.analyticsWidgetUrl !== url) {
          this.analyticsWidgetUrl = url;
        }
        break;
      case 'social':
        if (this.socialMediaWidgetUrl !== url) {
          this.socialMediaWidgetUrl = url;
        }
        break;
      case 'weather':
        if (this.weatherWidgetUrl !== url) {
          this.weatherWidgetUrl = url;
        }
        break;
    }
  }

  // Method to toggle iframe visibility
  toggleIframeVisibility(type: 'analytics' | 'social' | 'weather') {
    switch (type) {
      case 'analytics':
        this.showAnalyticsWidget = !this.showAnalyticsWidget;
        break;
      case 'social':
        this.showSocialMediaWidget = !this.showSocialMediaWidget;
        break;
      case 'weather':
        this.showWeatherWidget = !this.showWeatherWidget;
        break;
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
}
