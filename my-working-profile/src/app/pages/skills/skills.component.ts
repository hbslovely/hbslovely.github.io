import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from '../../components/skills/skills.component';
import { CVService } from '../../services/cv.service';
import { SkillsPageProps } from './skills.types';
import { SKILLS_PAGE_CONFIG } from './skills.constants';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [
    CommonModule,
    SkillsComponent
  ],
  template: `
    <div [class]="config.className">
      <app-skills [skills]="cv()?.skills"></app-skills>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class SkillsPageComponent {
  private readonly cvService = inject(CVService);

  readonly config: SkillsPageProps = SKILLS_PAGE_CONFIG;
  readonly cv = this.cvService.cv;
}
