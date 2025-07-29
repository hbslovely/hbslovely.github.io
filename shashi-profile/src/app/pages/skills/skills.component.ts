import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CvService } from '../../services/cv.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzIconModule
  ],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  protected readonly cvService = inject(CvService);

  getCategories(skills: Record<string, string[]>): string[] {
    return Object.keys(skills);
  }

  getCategoryIcon(category: string): string {
    const iconMap: Record<string, string> = {
      'accounting': 'account-book',
      'humanResources': 'team',
      'software': 'laptop',
      'compliance': 'safety-certificate',
      'softSkills': 'solution',
      'administration': 'setting'
    };
    return iconMap[category] || 'appstore';
  }
}

