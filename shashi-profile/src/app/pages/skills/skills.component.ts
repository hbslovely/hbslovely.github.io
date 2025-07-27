import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  template: `
    <div class="skills-section" *ngIf="cvService.cv()?.skills as skills">
      <h2>{{ 'NAV.SKILLS' | translate }}</h2>
      <div class="skills-content">
        <div class="skill-category" *ngFor="let category of getCategories(skills.technicalSkills)">
          <div class="category-header">
            <h3>{{ formatCategory(category) }}</h3>
          </div>
          <div class="skills-list">
            <div class="skill-item" *ngFor="let skill of skills.technicalSkills[category]">
              {{ skill }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skills-section {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem 1rem;

      h2 {
        color: var(--text-color);
        margin-bottom: 2rem;
        font-size: 1.75rem;
        font-weight: 500;
        position: relative;
        padding-bottom: 0.5rem;

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: var(--text-color);
        }
      }
    }

    .skills-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .skill-category {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 4px;

      .category-header {
        margin-bottom: 1rem;

        h3 {
          color: var(--text-color);
          margin: 0;
          font-size: 1.1rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
    }

    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .skill-item {
      background: white;
      padding: 0.4rem 0.75rem;
      border-radius: 3px;
      font-size: 0.9rem;
      color: var(--text-color);
      border: 1px solid #e9ecef;
      transition: all 0.2s ease;

      &:hover {
        border-color: #dee2e6;
        transform: translateY(-1px);
      }
    }

    @media (max-width: 992px) {
      .skills-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }

    @media (max-width: 768px) {
      .skills-section {
        padding: 1rem;

        h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }
      }

      .skill-category {
        padding: 1rem;
      }
    }
  `]
})
export class SkillsComponent {
  protected readonly cvService = inject(CvService);

  protected getCategories(skills: Record<string, string[]>): string[] {
    return Object.keys(skills);
  }

  protected formatCategory(category: string): string {
    return category
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

