import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { WorkExperience } from '../../models/cv.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, NzTimelineModule, NzTypographyModule],
  template: `
    <div class="experience-section">
      <div class="section-header">
        <h2>Work Experience</h2>
        <div class="section-subtitle">Professional journey and achievements</div>
      </div>

      <div class="section-content">
        <nz-timeline [nzPending]="experiences?.[0]?.endDate === 'Present'">
          @for (exp of experiences; track exp.company) {
            <nz-timeline-item [nzColor]="exp.endDate === 'Present' ? 'blue' : 'gray'">
              <div class="experience-item">
                <h3 nz-typography>{{ exp.position }} at {{ exp.company }}</h3>
                <div class="meta-info">
                  <span class="duration">{{ exp.startDate }} - {{ exp.endDate }}</span>
                  <span class="location">{{ exp.location }} ({{ exp.type }})</span>
                </div>

                <div class="responsibilities">
                  <h4 nz-typography>Responsibilities</h4>
                  <ul>
                    @for (resp of exp.responsibilities; track resp) {
                      <li>{{ resp }}</li>
                    }
                  </ul>
                </div>

                <div class="achievements">
                  <h4 nz-typography>Key Achievements</h4>
                  <ul>
                    @for (achievement of exp.achievements; track achievement) {
                      <li>{{ achievement }}</li>
                    }
                  </ul>
                </div>
              </div>
            </nz-timeline-item>
          }
        </nz-timeline>
      </div>
    </div>
  `,
  styles: [`
    .experience-section {
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

      .experience-item {
        padding: 1rem 0;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateX(5px);
        }

        h3 {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-color);
        }

        .meta-info {
          margin-bottom: 1.5rem;

          .duration {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            background: var(--primary-light);
            border-radius: 12px;
            color: var(--primary-color);
            font-weight: 500;
            font-size: 0.95rem;
          }

          .location {
            margin-left: 1rem;
            color: rgba(0, 0, 0, 0.45);
            font-size: 0.95rem;
          }
        }

        .responsibilities, .achievements {
          margin-bottom: 1.5rem;

          h4 {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--text-color);
          }

          ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
              position: relative;
              padding-left: 1.75rem;
              margin-bottom: 0.75rem;
              line-height: 1.6;

              &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0.6rem;
                width: 6px;
                height: 6px;
                background: var(--primary-color);
                border-radius: 50%;
                transition: all 0.3s ease;
              }

              &:hover::before {
                transform: scale(1.5);
                background: var(--primary-color);
              }
            }
          }
        }

        .achievements {
          margin-bottom: 0;
        }
      }
    }

    @media (max-width: 768px) {
      .experience-section {
        padding: 1rem;

        .section-header {
          text-align: center;
          padding: 1.25rem;

          h2::after {
            left: 50%;
            transform: translateX(-50%);
          }
        }

        .meta-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;

          .location {
            margin-left: 0;
          }
        }
      }
    }
  `]
})
export class ExperienceComponent {
  @Input() experiences?: WorkExperience[];
} 