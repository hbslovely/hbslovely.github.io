import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { WorkExperience } from '../../models/cv.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, NzTimelineModule, NzTypographyModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  @Input() experiences?: WorkExperience[];
} 