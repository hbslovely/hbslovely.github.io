import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { ExperienceComponent } from '../experience/experience.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CVService } from '../../services/cv.service';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-cv-viewer',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzSpinModule,
    PersonalInfoComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    NavBarComponent
  ],
  templateUrl: './cv-viewer.component.html',
  styleUrls: ['./cv-viewer.component.scss']
})
export class CvViewerComponent {
  private cvService = inject(CVService);
  private pdfService = inject(PdfService);

  readonly cv = this.cvService.cv;
  readonly isLoading = this.cvService.isLoading;
  readonly hasError = this.cvService.hasError;

  async handleDownload(type: 'standard' | 'beautiful'): Promise<void> {
    const cvData = this.cv();
    if (!cvData) {
      console.error('No CV data available');
      return;
    }

    try {
      if (type === 'standard') {
        await this.pdfService.generatePdf('cv-content', 'my-cv.pdf');
      } else {
        await this.pdfService.generateBeautifulPdf(cvData);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
}
