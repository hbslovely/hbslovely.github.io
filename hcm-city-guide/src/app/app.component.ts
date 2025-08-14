import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ScrollService } from './core/services/scroll.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    InputTextModule,
    CardModule,
    RippleModule,
    StyleClassModule,
    TranslateModule,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  currentLang: string = 'en';
  isScrolled: boolean = false;
  isMobileMenuOpen: boolean = false;

  constructor(
    private translate: TranslateService,
    private scrollService: ScrollService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      // Handle any language change specific logic here
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50;
  }

  switchLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'vi' : 'en';
    this.translate.use(this.currentLang);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onSearch(event: any) {
    const searchTerm = event.target.value;
    console.log('Searching for:', searchTerm);
  }

  getRouteState(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || outlet?.activatedRoute?.component?.name || 'none';
  }
}
