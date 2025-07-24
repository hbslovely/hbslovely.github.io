import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent as ExperienceListComponent } from '../../components/experience/experience.component';
import { CVService } from '../../services/cv.service';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [
    CommonModule,
    ExperienceListComponent
  ],
  template: `
    <div class="experience-page">
      <app-experience
        [workExperience]="cv()?.experience?.workExperience"
        [education]="cv()?.education?.education">
      </app-experience>
    </div>
  `,
  styles: [`
    .experience-page {
      max-width: 1000px;
      margin: 0 auto;
    }
  `]
})
export class ExperiencePageComponent {
  // @ts-ignore
  readonly cv = this.cvService.cv;

  constructor(private cvService: CVService) {}
}
