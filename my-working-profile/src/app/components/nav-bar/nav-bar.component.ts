import { Component, signal, HostListener, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { ExportPdfComponent } from '../export-pdf/export-pdf.component';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NzIconModule,
    LanguageSwitcherComponent,
    ExportPdfComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit, OnDestroy {
  isMobileMenuOpen = signal(false);
  isMobileView = signal(false);
  indicatorStyles: { [key: string]: string } = {};
  
  @ViewChild('navIndicator') navIndicator!: ElementRef;
  @ViewChildren('navItem') navItems!: QueryList<ElementRef>;
  
  private routerSubscription!: Subscription;
  
  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    
    // Subscribe to router events to update indicator on route changes
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => {
          this.updateIndicatorPosition();
        }, 100); // Small delay to ensure DOM is updated
      });
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateIndicatorPosition();
    }, 200); // Initial position after view is initialized
    
    // Listen for changes in the nav items
    this.navItems.changes.subscribe(() => {
      this.updateIndicatorPosition();
    });
  }
  
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
    // Close mobile menu on resize to desktop
    if (!this.isMobileView()) {
      this.closeMobileMenu();
      this.updateIndicatorPosition();
    }
  }
  
  updateIndicatorPosition(): void {
    if (this.isMobileView() || !this.navItems || !this.navIndicator) return;
    
    let activeElement: HTMLElement | null = null;
    
    // Find the active anchor element
    this.navItems.forEach(item => {
      if (item.nativeElement.classList.contains('active')) {
        activeElement = item.nativeElement;
      }
    });
    
    // If no direct match, check each nav item's children
    if (!activeElement) {
      for (let i = 0; i < this.navItems.length; i++) {
        const el = this.navItems.get(i)?.nativeElement;
        if (el.classList.contains('active')) {
          activeElement = el;
          break;
        }
      }
    }
    
    // If still no match, try one more approach: checking if the element has active class
    if (!activeElement) {
      const allNavAnchors = document.querySelectorAll('.nav-links li a');
      for (let i = 0; i < allNavAnchors.length; i++) {
        const anchor = allNavAnchors[i] as HTMLElement;
        if (anchor.classList.contains('active')) {
          activeElement = anchor;
          break;
        }
      }
    }
    
    if (activeElement) {
      this.positionIndicator(activeElement);
    } else {
      // Hide the indicator if no active element found
      this.indicatorStyles = {
        opacity: '0'
      };
    }
  }
  
  private positionIndicator(activeElement: HTMLElement): void {
    if (!this.navIndicator) return;
    
    const rect = activeElement.getBoundingClientRect();
    
    // Calculate indicator position and width
    this.indicatorStyles = {
      left: `${activeElement.offsetLeft}px`,
      width: `${rect.width}px`,
      opacity: '1'
    };
  }
  
  checkScreenSize(): void {
    this.isMobileView.set(window.innerWidth <= 768);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
    
    // Prevent body scrolling when menu is open
    if (this.isMobileMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    if (this.isMobileMenuOpen()) {
      this.isMobileMenuOpen.set(false);
      document.body.style.overflow = '';
    }
  }
}
