import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Skills } from '../../models/cv.models';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, NzTagModule, NzGridModule, NzTypographyModule, NzIconModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('tagAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class SkillsComponent {
  @Input() skills?: Skills;

  getSkillCategories(): string[] {
    return Object.keys(this.skills?.technicalSkills || {});
  }

  getSkillsForCategory(category: string): string[] {
    return (this.skills?.technicalSkills as any)?.[category] || [];
  }

  formatCategory(category: string): string {
    return category
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getTagColor(category: string): string {
    const colorMap: { [key: string]: string } = {
      programmingLanguages: '#f50',
      frameworks: '#2db7f5',
      libraries: '#87d068',
      testing: '#108ee9',
      methodologies: '#f50',
      tools: '#87d068',
      environments: '#2db7f5',
      databases: '#722ed1',
      cloud: '#1890ff',
      mobile: '#eb2f96',
      web: '#52c41a'
    };
    return colorMap[category] || '#2db7f5';
  }

  getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      programmingLanguages: 'code',
      frameworks: 'layout',
      libraries: 'read',
      testing: 'experiment',
      methodologies: 'solution',
      tools: 'tool',
      environments: 'desktop',
      databases: 'database',
      cloud: 'cloud',
      mobile: 'mobile',
      web: 'global'
    };
    return iconMap[category] || 'tag';
  }
}
