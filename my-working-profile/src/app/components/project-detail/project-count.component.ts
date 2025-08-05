import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project-count',
  standalone: true,
  imports: [CommonModule, NzIconModule, TranslateModule],
  template: `
    <div class="project-count">
      <span nz-icon nzType="appstore" nzTheme="outline"></span>
      <div class="count-details">
        <div class="count-numbers">
          <strong>{{ filteredCount }}</strong>
          @if (filteredCount !== totalCount) {
            <span class="total-count">/ {{ totalCount }}</span>
          }
        </div>
        <div class="count-label">
          @if (filteredCount !== totalCount) {
            {{ 'PROJECTS.COUNT.FILTERED' | translate }}
          } @else {
            {{ 'PROJECTS.COUNT.TOTAL' | translate }}
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .project-count {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: var(--background-color);
      border-radius: var(--border-radius);
      margin: 1.5rem 0;
      border: 1px solid var(--border-color);

      [nz-icon] {
        font-size: 1.25rem;
        color: var(--primary-color);
      }

      .count-details {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        .count-numbers {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          color: var(--heading-color);

          strong {
            font-size: 1.25rem;
            font-weight: 600;
          }

          .total-count {
            color: var(--text-secondary);
            font-size: 1rem;
          }
        }

        .count-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
      }
    }

    // Dark theme adjustments
    :host-context(.dark-theme) {
      .project-count {
        background: rgba(255, 255, 255, 0.05);
      }
    }

    // Mobile adjustments
    @media (max-width: 768px) {
      .project-count {
        padding: 0.5rem 0.75rem;
        margin: 1rem 0;

        [nz-icon] {
          font-size: 1.1rem;
        }

        .count-details {
          .count-numbers {
            strong {
              font-size: 1.1rem;
            }

            .total-count {
              font-size: 0.9rem;
            }
          }

          .count-label {
            font-size: 0.85rem;
          }
        }
      }
    }
  `]
})
export class ProjectCountComponent {
  @Input() filteredCount: number = 0;
  @Input() totalCount: number = 0;
} 