import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from '../../components/personal-info/personal-info.component';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { CVService } from '../../services/cv.service';
import { AboutPageProps } from './about.types';
import { ABOUT_PAGE_CONFIG, ABOUT_PAGE_SECTIONS } from './about.constants';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RouterModule } from '@angular/router';
import { Project } from '../../models/cv.models';
import { CustomModalService } from '../../services/custom-modal.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    PersonalInfoComponent,
    PageHeaderComponent,
    NzIconModule,
    RouterModule,
    NzModalModule,
    TranslateModule
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  private readonly cvService = inject(CVService);
  private readonly modalService = inject(CustomModalService);

  // Constants
  readonly config: AboutPageProps = ABOUT_PAGE_CONFIG;
  readonly sections = ABOUT_PAGE_SECTIONS;

  // State
  readonly cv = this.cvService.cv;

  // Featured projects - get the 3 most recent major projects
  readonly featuredProjects = computed(() => {
    const projects = this.cv()?.projects?.projects || [];
    return projects
      .filter(project => !project.minor && !project.excludeFromPdf)
      .slice(0, 3);
  });

  // Featured skill categories - get the 2 most important categories
  readonly featuredSkillCategories = computed(() => {
    const skills = this.cv()?.skills?.technicalSkills || {};
    // Prioritize frameworks and libraries as they're most relevant
    const priorityCategories = ['frameworks', 'libraries'];

    return Object.keys(skills)
      .filter(category => priorityCategories.includes(category))
      .slice(0, 2);
  });

  // Helper methods for skills
  getSkillsForCategory(category: string): string[] {
    const skills = this.cv()?.skills?.technicalSkills?.[category] || [];
    // Return only the top 3 skills per category
    return skills.slice(0, 3);
  }

  formatCategoryName(category: string): string {
    return category
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  }

  showFullscreenAvatar(): void {
    this.modalService.create({
      nzTitle: undefined,
      nzFooter: null,
      nzClosable: true,
      nzMaskClosable: true,
      nzCentered: true,
      nzClassName: 'avatar-modal',
      nzContent: `
        <div style="display: flex; justify-content: center; align-items: center; width: 100%; padding: 0;">
          <img 
            src="assets/images/avatar.jpeg" 
            alt="Profile Picture" 
            style="max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 4px;"
          >
        </div>
      `,
      nzWidth: 'auto',
      nzBodyStyle: { padding: '0' },
      nzStyle: { top: '50px' }
    });
  }
}
