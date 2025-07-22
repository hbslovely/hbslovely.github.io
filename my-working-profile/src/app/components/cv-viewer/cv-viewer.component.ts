import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { CVService } from '../../services/cv.service';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ExperienceComponent } from '../experience/experience.component';

@Component({
  selector: 'app-cv-viewer',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzSpinModule,
    NzAlertComponent,
    PersonalInfoComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent
  ],
  templateUrl: './cv-viewer.component.html',
  styleUrls: ['./cv-viewer.component.scss']
})
export class CVViewerComponent {
  private cvService = inject(CVService);
  private message = inject(NzMessageService);

  readonly cv = this.cvService.cv;
  readonly isLoading = this.cvService.isLoading;
  readonly hasError = this.cvService.hasError;

  async exportToPDF() {
    try {
      await this.cvService.exportToPDF('cv-content');
      this.message.success('CV exported successfully!');
    } catch (error) {
      this.message.error('Failed to export CV');
      console.error('Export error:', error);
    }
  }
}
