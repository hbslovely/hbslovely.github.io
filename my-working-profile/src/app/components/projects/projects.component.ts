import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Project } from '../../models/cv.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzGridModule,
    NzTagModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    NzSpaceModule,
    NzCollapseModule,
    NzTimelineModule,
    NzDividerModule,
    NzEmptyModule,
    NzButtonModule,
    NzToolTipModule
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input() projects: Project[] = [];
  
  searchText: string = '';
  selectedTech: string[] = [];
  filteredProjects: Project[] = [];
  allTechnologies: string[] = [];

  // Technology color mapping
  private techColorMap: { [key: string]: string } = {
    'Angular': 'red',
    'React': 'blue',
    'TypeScript': 'cyan',
    'JavaScript': 'orange',
    'Node.js': 'green',
    'Python': 'geekblue',
    'Java': 'volcano',
    'Spring': 'lime',
    'Docker': 'blue',
    'Kubernetes': 'blue',
    'AWS': 'orange',
    'Azure': 'blue',
    'MongoDB': 'green',
    'PostgreSQL': 'cyan',
    'MySQL': 'blue'
  };

  ngOnInit() {
    this.filteredProjects = [...this.projects];
    this.extractAllTechnologies();
  }

  private extractAllTechnologies() {
    const techSet = new Set<string>();
    this.projects.forEach(project => {
      project.technologies?.forEach(tech => techSet.add(tech));
    });
    this.allTechnologies = Array.from(techSet).sort();
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter(project => {
      const matchesSearch = !this.searchText || 
        project.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        project.description?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        project.company?.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesTech = this.selectedTech.length === 0 ||
        this.selectedTech.every(tech => project.technologies?.includes(tech));

      return matchesSearch && matchesTech;
    });
  }

  getTechColor(tech: string): string {
    return this.techColorMap[tech] || 'purple';
  }

  getEnvDescription(env: string): string {
    const descriptions: { [key: string]: string } = {
      'Production': 'Live environment serving end users',
      'Development': 'Local development environment',
      'Staging': 'Pre-production testing environment',
      'QA': 'Quality assurance testing environment',
      'CI/CD': 'Continuous Integration/Continuous Deployment pipeline'
    };
    return descriptions[env] || env;
  }

  openLink(url: string | undefined) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  showProjectDetails(project: Project) {
    // Implement modal or detailed view logic here
    console.log('Showing details for:', project.name);
  }

  resetFilters() {
    this.searchText = '';
    this.selectedTech = [];
    this.filterProjects();
  }
}
