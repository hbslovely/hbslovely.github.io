import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent as SkillsListComponent } from '../../components/skills/skills.component';
import { CVService } from '../../services/cv.service';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [
    CommonModule,
    SkillsListComponent
  ],
  template: `
    <div class="skills-page">
      <app-skills [skills]="cv()?.skills"></app-skills>
    </div>
  `,
  styles: [`
    .skills-page {
      max-width: 1000px;
      margin: 0 auto;
    }
  `]
})
export class SkillsPageComponent {
  // @ts-ignore
  readonly cv = this.cvService.cv;

  constructor(private cvService: CVService) {}
}
