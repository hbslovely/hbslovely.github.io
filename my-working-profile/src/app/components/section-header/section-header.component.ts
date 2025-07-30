import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule, NzIconModule, TranslateModule],
  template: `
    <div class="section-header">
      <h2>
        <span nz-icon [nzType]="icon" nzTheme="outline"></span>
        {{ title | translate }}
      </h2>
      <div class="section-subtitle" *ngIf="subtitle">{{ subtitle | translate }}</div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .section-header {
      margin-bottom: 2rem;
      padding-top: 80px; // Add padding to account for fixed navbar

      h2 {
        font-size: 2rem;
        font-weight: 600;
        color: var(--text-color);
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 0;

        [nz-icon] {
          font-size: 1.75rem;
          color: var(--primary-color);
        }
      }

      .section-subtitle {
        margin-top: 0.5rem;
        color: var(--text-secondary);
        font-size: 1rem;
      }
    }
  `]
})
export class SectionHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() icon: string = '';
} 