import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Skills } from '../../models/cv.models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, NzTagModule, NzGridModule, NzTypographyModule],
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
}
