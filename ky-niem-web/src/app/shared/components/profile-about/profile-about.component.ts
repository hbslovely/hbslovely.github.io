import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionContainerComponent } from '../section-container/section-container.component';

@Component({
  selector: 'app-profile-about',
  standalone: true,
  imports: [CommonModule, SectionContainerComponent],
  template: `
    <app-section-container title="Giới Thiệu" icon="pi pi-user">
      <p>{{ description }}</p>
    </app-section-container>
  `
})
export class ProfileAboutComponent {
  @Input() description: string = '';
} 