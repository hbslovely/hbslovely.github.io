import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { Project } from '../../models/cv.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTagModule,
    NzCollapseModule
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  @Input() projects?: Project[];

  // Track open state for project details
  expandedProjects: {[key: number]: boolean} = {};

  toggleProject(index: number): void {
    this.expandedProjects[index] = !this.expandedProjects[index];
  }

  isProjectExpanded(index: number): boolean {
    return !!this.expandedProjects[index];
  }
}
