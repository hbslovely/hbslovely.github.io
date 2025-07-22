import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Project } from '../../models/cv.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    NzTagModule,
    NzTypographyModule
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  @Input() projects?: Project[];
}
