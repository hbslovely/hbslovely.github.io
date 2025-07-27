import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CvService } from '../../services/cv.service';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzTimelineModule
  ],
  template: `
    <div class="experience-section">
      <div class="work-experience" *ngIf="cvService.cv()?.experience as exp">
        <h2>{{ 'NAV.EXPERIENCE' | translate }}</h2>
        <nz-timeline>
          <nz-timeline-item *ngFor="let job of exp.workExperience">
            <div class="timeline-content">
              <div class="job-header">
                <h3>{{ job.position }}</h3>
                <span class="company">{{ job.company }}</span>
              </div>
              <div class="job-meta">
                <span class="duration">{{ job.startDate }} - {{ job.endDate || 'Present' }}</span>
                <span class="location">{{ job.location }}</span>
              </div>
              <div class="responsibilities">
                <h4>{{ 'EXPERIENCE.RESPONSIBILITIES' | translate }}:</h4>
                <ul>
                  <li *ngFor="let resp of job.responsibilities">{{ resp }}</li>
                </ul>
              </div>
              <div class="achievements" *ngIf="job.achievements?.length">
                <h4>{{ 'EXPERIENCE.KEY_ACHIEVEMENTS' | translate }}:</h4>
                <ul>
                  <li *ngFor="let achievement of job.achievements">{{ achievement }}</li>
                </ul>
              </div>
            </div>
          </nz-timeline-item>
        </nz-timeline>
      </div>

      <div class="education" *ngIf="cvService.cv()?.education as edu">
        <h2>Education</h2>
        <div class="education-item" *ngFor="let item of edu.education">
          <div class="edu-header">
            <h3>{{ item.degree }}</h3>
            <span class="field">{{ item.field }}</span>
          </div>
          <div class="institution">{{ item.institution }} – {{ item.location }}</div>
          <div class="duration">{{ item.startDate }} - {{ item.endDate }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .experience-section {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem 1rem;

      h2 {
        color: var(--text-color);
        margin-bottom: 2.5rem;
        font-size: 2rem;
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

    .work-experience {
      margin-bottom: 4rem;

      ::ng-deep .ant-timeline {
        color: var(--text-color);

        .ant-timeline-item-tail {
          border-left: 2px solid #eee;
        }

        .ant-timeline-item-head {
          background: #fff;
          border: 2px solid var(--text-color);
        }
      }

      .timeline-content {
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 4px;
        margin-bottom: 1rem;

        .job-header {
          margin-bottom: 0.75rem;

          h3 {
            color: var(--text-color);
            margin: 0;
            font-size: 1.25rem;
            font-weight: 500;
          }

          .company {
            color: var(--text-color);
            font-weight: 500;
            font-size: 1.1rem;
          }
        }

        .job-meta {
          display: flex;
          gap: 1.5rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .responsibilities, .achievements {
          h4 {
            color: var(--text-color);
            margin: 1.5rem 0 1rem;
            font-size: 1.1rem;
            font-weight: 500;
          }

          ul {
            margin: 0;
            padding-left: 1.25rem;

            li {
              color: var(--text-color);
              margin-bottom: 0.75rem;
              line-height: 1.5;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }

    .education {
      .education-item {
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 4px;
        margin-bottom: 1.5rem;

        &:last-child {
          margin-bottom: 0;
        }

        .edu-header {
          margin-bottom: 0.75rem;

          h3 {
            color: var(--text-color);
            margin: 0;
            font-size: 1.25rem;
            font-weight: 500;
          }

          .field {
            color: var(--text-color);
            font-weight: 500;
            font-size: 1.1rem;
          }
        }

        .institution {
          color: var(--text-color);
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }

        .duration {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
      }
    }

    @media (max-width: 768px) {
      .experience-section {
        padding: 1rem;

        h2 {
          font-size: 1.75rem;
          margin-bottom: 2rem;
        }
      }

      .work-experience {
        margin-bottom: 3rem;

        .timeline-content {
          padding: 1rem;

          .job-meta {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      }

      .education {
        .education-item {
          padding: 1rem;
        }
      }
    }
  `]
})
export class ExperienceComponent {
  protected readonly cvService = inject(CvService);
}
