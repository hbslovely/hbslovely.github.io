import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule, NzIconModule],
  template: `
    <div class="section-header">
      <h2>
        <span nz-icon [nzType]="icon" nzTheme="outline"></span>
        {{ title }}
      </h2>
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
    }
  `]
})
export class SectionHeaderComponent {
  @Input() title: string = '';
  @Input() icon: string = '';
} 