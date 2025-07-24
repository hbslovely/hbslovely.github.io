import { Component, HostListener, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { animate, style, transition, trigger } from '@angular/animations';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule,
    NzToolTipModule,
    NzDrawerModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class NavBarComponent implements OnInit {
  private readonly pdfService = inject(PdfService);
  private readonly message = inject(NzMessageService);
  
  isMobile = false;
  isExporting = false;
  isMenuOpen = false;
  isScrolled = false;
  readonly logoText = 'My Portfolio';

  readonly navItems = [
    { path: '/', icon: 'user', label: 'About' },
    { path: '/experience', icon: 'laptop', label: 'Experience' },
    { path: '/skills', icon: 'tool', label: 'Skills' },
    { path: '/projects', icon: 'project', label: 'Projects' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      this.checkScrollPosition();
    }
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('window:scroll')
  checkScrollPosition() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 20;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  async exportToPDF() {
    if (this.isExporting) return;
    
    let loadingMessage: any;
    try {
      this.isExporting = true;
      loadingMessage = this.message.loading('Generating PDF...', { nzDuration: 0 }).messageId;
      
      // Close mobile menu if open
      if (this.isMobile && this.isMenuOpen) {
        this.closeMenu();
      }

      await this.pdfService.generateBeautifulPdf('cv-container');
      this.message.remove(loadingMessage);
      this.message.success('PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      this.message.error('Failed to generate PDF. Please try again.');
    } finally {
      if (loadingMessage) {
        this.message.remove(loadingMessage);
      }
      this.isExporting = false;
    }
  }
}
