import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent as ProjectsListComponent } from '../../components/projects/projects.component';
import { CVService } from '../../services/cv.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    CommonModule,
    ProjectsListComponent
  ],
  template: `
    <div class="projects-page">
      <app-projects [projects]="$any(cv()?.projects?.projects)"></app-projects>
    </div>
  `,
  styles: [`
    .projects-page {
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class ProjectsPageComponent {
  // @ts-ignore
  readonly cv = this.cvService.cv;

  constructor(private cvService: CVService) {}

}
