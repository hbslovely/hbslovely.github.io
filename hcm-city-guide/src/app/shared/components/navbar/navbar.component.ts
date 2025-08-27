import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

// Import translations
import * as menuEn from '../../../../assets/i18n/menu/menu.en.json';
import * as menuVi from '../../../../assets/i18n/menu/menu.vi.json';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    DialogModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;

  isScrolled = false;
  isMenuOpen = false;
  showSearchDialog = false;
  searchTerm = '';
  activeSubmenu: string | null = null;
  currentLanguage = 'en';

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    // Load menu translations
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.loadTranslations();
  }

  ngOnInit() {
    this.currentLanguage = this.translate.currentLang || 'en';
  }

  private loadTranslations() {
    // Load menu translations for both languages
    this.translate.setTranslation('en', menuEn);
    this.translate.setTranslation('vi', menuVi);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Close menu if clicked outside
    if (this.isMenuOpen && !(event.target as HTMLElement)?.closest('.nav-menu') && 
        !(event.target as HTMLElement)?.closest('.menu-button')) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Close search dialog on escape
    if (event.key === 'Escape' && this.showSearchDialog) {
      this.closeSearch();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.activeSubmenu = null;
    }
  }

  openSearch() {
    this.showSearchDialog = true;
    this.searchTerm = '';
    setTimeout(() => this.searchInput?.nativeElement.focus(), 100);
  }

  closeSearch() {
    this.showSearchDialog = false;
    this.searchTerm = '';
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
      this.closeSearch();
    }
  }

  toggleLanguage() {
    const newLang = this.currentLanguage === 'en' ? 'vi' : 'en';
    this.translate.use(newLang);
    this.currentLanguage = newLang;
  }

  showSubmenu(menu: string) {
    this.activeSubmenu = menu;
  }

  hideSubmenu() {
    this.activeSubmenu = null;
  }

  onDonate() {
    this.router.navigate(['/donate']);
  }
} 