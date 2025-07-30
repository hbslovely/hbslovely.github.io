import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Project } from '../../models/cv.models';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NzTagModule
  ],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent {
  @Input() project!: Project;
  @Input() viewType: 'grid' | 'list' = 'grid';
  @Input() isExpanded = false;
  @Input() selectedTechnologies: string[] = [];

  @Output() toggleExpand = new EventEmitter<void>();
  @Output() technologyClick = new EventEmitter<string>();

  getTagColor(tag: string, type: 'technology' | 'scope' | 'status' = 'technology'): string {
    const isSelected = type === 'technology' ? this.isTechnologySelected(tag) : false;
    const colorMap: Record<string, string> = {
      'Angular': '#DD0031',
      'React': '#61DAFB',
      'TypeScript': '#3178C6',
      'JavaScript': '#F7DF1E',
      'Frontend': '#1890ff',
      'Backend': '#52c41a',
      'Full Stack': '#722ed1',
      'Active': '#52c41a',
      'Completed': '#1890ff',
      'Maintenance': '#faad14'
    };

    if (isSelected) {
      return colorMap[tag] || 'processing';
    }
    return colorMap[tag] || 'default';
  }

  getTechnologyIcon(tech: string): string {
    const iconMap: Record<string, string> = {
      'Angular': 'code-sandbox',
      'React': 'code-sandbox',
      'TypeScript': 'code',
      'JavaScript': 'code',
      'Node.js': 'api',
      'HTML': 'html5',
      'CSS': 'bg-colors',
      'SCSS': 'bg-colors'
    };
    return iconMap[tech] || 'code';
  }

  isTechnologySelected(tech: string): boolean {
    return this.selectedTechnologies.includes(tech);
  }

  // Helper method to capitalize status
  capitalizeStatus(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
} 