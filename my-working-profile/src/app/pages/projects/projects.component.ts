import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule } from '@angular/forms';
import { CVService } from '../../services/cv.service';
import { ProjectsPageProps } from './projects.types';
import { PROJECTS_PAGE_CONFIG } from './projects.constants';
import { Project } from '../../models/cv.models';

// Tag color mapping
const TAG_COLORS = {
  // Frontend
  'React': 'blue',
  'Angular': 'red',
  'Vue': 'green',
  'TypeScript': 'geekblue',
  'JavaScript': 'orange',
  'HTML': 'orange',
  'CSS': 'blue',
  'SCSS': 'pink',
  'Redux': 'purple',
  'Next.js': 'black',
  'Gatsby': 'purple',

  // Backend
  'Node.js': 'green',
  'ASP NET': 'green',
  'Python': 'blue',
  'Java': 'red',
  'Spring': 'green',
  'Express': 'black',
  'MongoDB': 'green',
  'PostgreSQL': 'blue',
  'MySQL': 'orange',
  'GraphQL': 'pink',
  'REST': 'cyan',

  // DevOps & Tools
  'Docker': 'blue',
  'Kubernetes': 'blue',
  'AWS': 'orange',
  'Azure': 'blue',
  'GCP': 'red',
  'Git': 'red',
  'Jenkins': 'red',
  'CircleCI': 'black',
  'Terraform': 'purple',

  // Mobile
  'React Native': 'blue',
  'Flutter': 'blue',
  'iOS': 'black',
  'Android': 'green',
  'Swift': 'orange',
  'Kotlin': 'purple',

  // Testing
  'Jest': 'red',
  'Cypress': 'black',
  'Selenium': 'green',
  'JUnit': 'red',
  'TestNG': 'green',

  // Default colors for scopes
  'Frontend': 'blue',
  'Backend': 'green',
  'Full Stack': 'purple',
  'DevOps': 'orange',
  'Mobile': 'cyan',
  'Design': 'pink',

  // Default colors for status
  'active': 'green',
  'completed': 'blue',
  'maintenance': 'orange'
} as const;

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NzTagModule,
    FormsModule
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsPageComponent {
  private readonly cvService = inject(CVService);

  // Constants
  readonly config: ProjectsPageProps = PROJECTS_PAGE_CONFIG;

  // State
  readonly cv = this.cvService.cv;

  // Filter state
  selectedTechnologies = signal<string[]>([]);
  selectedScopes = signal<string[]>([]);
  selectedStatuses = signal<string[]>([]);

  // Computed values for filter options
  readonly allTechnologies = computed(() => {
    const techs = new Set<string>();
    this.cv()?.projects?.projects.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  });

  readonly allScopes = computed(() => {
    const scopes = new Set<string>();
    this.cv()?.projects?.projects.forEach(project => {
      if (project.scope) scopes.add(project.scope);
    });
    return Array.from(scopes).sort();
  });

  readonly allStatuses = computed(() => {
    const statuses = new Set<string>();
    this.cv()?.projects?.projects.forEach(project => {
      if (project.status) statuses.add(project.status);
    });
    return Array.from(statuses).sort();
  });

  // Filtered projects
  readonly filteredProjects = computed(() => {
    const projects = this.cv()?.projects?.projects || [];
    return projects.filter(project => {
      const matchesTech = this.selectedTechnologies().length === 0 ||
        project.technologies.some(tech => this.selectedTechnologies().includes(tech));

      const matchesScope = this.selectedScopes().length === 0 ||
        (project.scope && this.selectedScopes().includes(project.scope));

      const matchesStatus = this.selectedStatuses().length === 0 ||
        (project.status && this.selectedStatuses().includes(project.status));

      return matchesTech && matchesScope && matchesStatus;
    });
  });

  // Filter handlers
  toggleTechnologyFilter(tech: string): void {
    const current = this.selectedTechnologies();
    if (current.includes(tech)) {
      this.selectedTechnologies.set(current.filter(t => t !== tech));
    } else {
      this.selectedTechnologies.set([...current, tech]);
    }
  }

  toggleScopeFilter(scope: string): void {
    const current = this.selectedScopes();
    if (current.includes(scope)) {
      this.selectedScopes.set(current.filter(s => s !== scope));
    } else {
      this.selectedScopes.set([...current, scope]);
    }
  }

  toggleStatusFilter(status: string): void {
    const current = this.selectedStatuses();
    if (current.includes(status)) {
      this.selectedStatuses.set(current.filter(s => s !== status));
    } else {
      this.selectedStatuses.set([...current, status]);
    }
  }

  clearFilters(): void {
    this.selectedTechnologies.set([]);
    this.selectedScopes.set([]);
    this.selectedStatuses.set([]);
  }

  // Helper method to get tag color
  getTagColor(tag: string): string {
    return TAG_COLORS[tag.trim() as keyof typeof TAG_COLORS] || 'default';
  }
}
