import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CVService } from '../../services/cv.service';
import { ExperiencePageProps } from './experience.types';
import {
  EXPERIENCE_PAGE_CONFIG,
  EXPERIENCE_SECTIONS,
  TIMELINE_CONFIG
} from './experience.constants';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [
    CommonModule,
    NzTimelineModule,
    NzIconModule
  ],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperiencePageComponent {
  private readonly cvService = inject(CVService);

  // Constants
  readonly config: ExperiencePageProps = EXPERIENCE_PAGE_CONFIG;
  readonly sections = EXPERIENCE_SECTIONS;
  readonly timelineConfig = TIMELINE_CONFIG;

  // State
  readonly cv = this.cvService.cv;
}
