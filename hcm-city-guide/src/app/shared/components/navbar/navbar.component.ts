import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentLang: string = 'en';
  isScrolled: boolean = false;
  isMobileMenuOpen: boolean = false;
  isSubmenuOpen: boolean = false;
  searchTerm: string = '';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });

    // Initialize current language
    this.currentLang = this.translate.currentLang;

    // Listen for scroll events
    window.addEventListener('scroll', () => {
      this.isScrolled = window.scrollY > 0;
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.isSubmenuOpen = false;
    }
  }

  toggleSubmenu(): void {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.isSubmenuOpen = false;
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.searchService.setSearchTerm(this.searchTerm);
      this.router.navigate(['/search'], { 
        queryParams: { q: this.searchTerm }
      });
      this.closeMobileMenu();
    }
  }

  switchLanguage(): void {
    const newLang = this.currentLang === 'en' ? 'vi' : 'en';
    this.translate.use(newLang);
  }
} 