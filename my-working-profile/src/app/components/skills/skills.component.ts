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
  template: `
    <div class="skills-section">
      <div class="section-header">
        <h2>Technical Skills</h2>
        <div class="section-subtitle">Technologies and tools I work with</div>
      </div>

      <div class="section-content">
        <div nz-row [nzGutter]="[16, 16]">
          @for (category of getSkillCategories(); track category) {
            <div nz-col [nzSpan]="12">
              <div class="skill-category">
                <h4 nz-typography>{{ formatCategory(category) }}</h4>
                @for (skill of getSkillsForCategory(category); track skill) {
                  <nz-tag [nzColor]="'blue'">{{ skill }}</nz-tag>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skills-section {
      padding: 2rem;
      margin-bottom: 2rem;

      .section-header {
        margin-bottom: 2rem;
        background: white;
        padding: 1.5rem 2rem;
        border-radius: var(--border-radius);

        h2 {
          font-size: 2rem;
          margin: 0;
          font-weight: 600;
          letter-spacing: -0.5px;
          position: relative;
          display: inline-block;
          color: var(--text-color);

          &::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 40%;
            height: 3px;
            background: var(--primary-color);
            border-radius: 3px;
            transition: width 0.3s ease;
          }
        }

        .section-subtitle {
          color: rgba(0, 0, 0, 0.45);
          margin-top: 1rem;
          font-size: 1.1rem;
        }

        &:hover h2::after {
          width: 60%;
        }
      }

      .section-content {
        background: white;
        padding: 2rem;
        border-radius: var(--border-radius);
      }

      .skill-category {
        margin-bottom: 2rem;

        h4 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-color);
          position: relative;
          display: inline-block;
          padding-bottom: 0.5rem;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: var(--primary-light);
            border-radius: 1px;
          }
        }

        :host ::ng-deep {
          .ant-tag {
            margin: 0.25rem;
            padding: 0.25rem 0.75rem;
            font-size: 0.9rem;
            border-radius: 4px;
            background: var(--primary-light);
            color: var(--primary-color);
            border: none;
            transition: all 0.3s ease;
            cursor: default;

            &:hover {
              transform: translateY(-2px);
              background: var(--primary-light);
              color: var(--primary-color);
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      .skills-section {
        padding: 1rem;

        .section-header {
          text-align: center;
          padding: 1.25rem;

          h2::after {
            left: 50%;
            transform: translateX(-50%);
          }
        }

        .skill-category {
          text-align: center;

          h4::after {
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  `]
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
