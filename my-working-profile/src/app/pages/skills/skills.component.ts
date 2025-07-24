import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CVService } from '../../services/cv.service';
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NzTagModule,
    SectionHeaderComponent
  ],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  private readonly cvService = inject(CVService);
  cv = this.cvService.cv;

  config = {
    className: 'skills-page',
    maxWidth: 1200
  };

  protected readonly Object = Object;

  getTechnologyIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      frontEnd: 'layout',
      backEnd: 'api',
      database: 'database',
      devOps: 'cloud-server',
      tools: 'tool',
      languages: 'code',
      frameworks: 'cluster',
      testing: 'bug',
      mobile: 'mobile',
      other: 'appstore'
    };
    return iconMap[category] || 'code';
  }

  getTagColor(skill: string): string {
    const colorMap: { [key: string]: string } = {
      Angular: '#DD0031',
      React: '#61DAFB',
      TypeScript: '#3178C6',
      JavaScript: '#F7DF1E',
      Node: '#339933',
      Python: '#3776AB',
      Java: '#007396',
      Spring: '#6DB33F',
      Docker: '#2496ED',
      Kubernetes: '#326CE5',
      AWS: '#FF9900',
      Azure: '#0089D6',
      MongoDB: '#47A248',
      PostgreSQL: '#336791',
      MySQL: '#4479A1'
    };
    return colorMap[skill] || 'blue';
  }

  formatCategory(category: string): string {
    return category
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
