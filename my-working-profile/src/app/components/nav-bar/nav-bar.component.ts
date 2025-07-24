import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PdfService } from '../../services/pdf.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { LanguageService } from '../../services/language.service';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule,
    NzButtonModule,
    LanguageSwitcherComponent,
    NzMenuModule,
    TranslateModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  private pdfService = inject(PdfService);
  private messageService = inject(NzMessageService);
  public languageService = inject(LanguageService);
  private translateService = inject(TranslateService);

  isExporting = false;

  readonly navItems = [
    { path: '/', label: 'NAV.ABOUT', icon: 'user', exact: true },
    { path: '/experience', label: 'NAV.EXPERIENCE', icon: 'history', exact: false },
    { path: '/skills', label: 'NAV.SKILLS', icon: 'tool', exact: false },
    { path: '/projects', label: 'NAV.PROJECTS', icon: 'project', exact: false }
  ];

  constructor() {
    // Initialize with English as default language
    this.translateService.setDefaultLang('en');
    this.translateService.use(this.languageService.getCurrentLanguage());

    // Subscribe to language changes
    this.languageService.language$.subscribe(lang => {
      this.translateService.use(lang);
    });
  }

  async exportToPDF(): Promise<void> {
    if (this.isExporting) return;

    this.isExporting = true;
    const loadingMessage = this.messageService.loading('Generating PDF...');

    try {
      // Use the CV container ID for PDF generation
      await this.pdfService.generateBeautifulPdf();
      this.messageService.success('PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      this.messageService.error('Failed to generate PDF. Please try again.');
    } finally {
      this.messageService.remove(loadingMessage.messageId);
      this.isExporting = false;
    }
  }
}
