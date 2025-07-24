import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent as SkillsListComponent } from '../../components/skills/skills.component';
import { CVService } from '../../services/cv.service';
import { SkillsPageProps } from './skills.types';
import { SKILLS_PAGE_CONFIG } from './skills.constants';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [
    CommonModule,
    SkillsListComponent
  ],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsPageComponent {
  private readonly cvService = inject(CVService);

  // Constants
  readonly config: SkillsPageProps = SKILLS_PAGE_CONFIG;

  // State
  readonly cv = this.cvService.cv;
}
