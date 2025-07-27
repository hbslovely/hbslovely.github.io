import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  private router = inject(Router);
  public languageService = inject(LanguageService);

  isMobile = window.innerWidth < 768;
  isMobileMenuOpen = false;

  navItems = [
    { path: '', label: 'NAV.ABOUT', exact: true },
    { path: 'experience', label: 'NAV.EXPERIENCE', exact: false },
    { path: 'skills', label: 'NAV.SKILLS', exact: false }
  ];

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
