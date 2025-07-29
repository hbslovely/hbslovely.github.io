import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ExportPdfComponent } from '../export-pdf/export-pdf.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    NzButtonModule,
    NzIconModule,
    ExportPdfComponent,
    LanguageSwitcherComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isMobileMenuOpen = false;
  isMobile = false;

  navItems = [
    { path: '/', label: 'NAV.ABOUT', icon: 'user', exact: true },
    { path: '/experience', label: 'NAV.EXPERIENCE', icon: 'history', exact: false },
    { path: '/skills', label: 'NAV.SKILLS', icon: 'tool', exact: false }
  ];

  @HostListener('window:resize')
  onResize() {
    this.checkMobile();
  }

  constructor() {
    this.checkMobile();
  }

  private checkMobile() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
