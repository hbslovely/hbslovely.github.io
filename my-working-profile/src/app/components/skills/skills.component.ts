import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Skills } from '../../models/cv.models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, NzTagModule, NzGridModule, NzTypographyModule, NzIconModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
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
      programmingLanguages: 'magenta',
      frameworks: 'blue',
      libraries: 'purple',
      testing: 'orange',
      methodologies: 'cyan',
      tools: 'green',
      environments: 'gold'
    };
    return colorMap[category] || 'blue';
  }

  getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      programmingLanguages: 'code',
      frameworks: 'layout',
      libraries: 'read',
      testing: 'experiment',
      methodologies: 'solution',
      tools: 'tool',
      environments: 'desktop'
    };
    return iconMap[category] || 'tag';
  }
}
