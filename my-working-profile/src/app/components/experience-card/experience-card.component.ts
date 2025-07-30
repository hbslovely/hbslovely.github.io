import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';

interface WorkExperience {
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  location: string;
  type: string;
  achievements?: string[];
  responsibilities?: string[];
}

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    TranslateModule
  ],
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss']
})
export class ExperienceCardComponent {
  @Input() experience!: WorkExperience;

  getCompanyLogo(company: string): string {
    // Convert company name to lowercase and replace spaces/special chars with hyphens
    const filename = company.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace any non-alphanumeric chars with hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    return `${filename}.png`;
  }
} 