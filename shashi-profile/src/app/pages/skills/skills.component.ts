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
      <h2 class="section-header">{{ 'NAV.SKILLS' | translate }}</h2>
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
    .section-header {
      position: relative;
      color: var(--text-color);
      margin-bottom: 2rem;
      padding-bottom: 0.75rem;
      font-size: 1.75rem;
      font-weight: 500;
      cursor: default;

      &::before, &::after {
        content: '';
        position: absolute;
        bottom: 0;
        height: 2px;
        width: 0;
        transition: width 0.4s ease-in-out;
      }

      &::before {
        left: 0;
        background: var(--nav-text);
      }

      &::after {
        right: 0;
        background: var(--nav-active);
        transition-delay: 0.2s;
      }

      &:hover {
        &::before {
          width: 60%;
        }
        &::after {
          width: 40%;
        }
      }
    }

    .skills-section {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem 1rem;
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
          position: relative;
          color: var(--text-color);
          margin: 0;
          font-size: 1.1rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding-bottom: 0.5rem;
          display: inline-block;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 20px;
            height: 2px;
            background: var(--nav-text);
            transition: width 0.3s ease;
          }

          &:hover::after {
            width: 100%;
          }
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
      border: 1px solid #e6f4ff;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--nav-text);
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

        .section-header {
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

