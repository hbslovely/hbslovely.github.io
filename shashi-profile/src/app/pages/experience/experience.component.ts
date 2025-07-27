import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzTimelineModule,
    NzIconModule
  ],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  protected readonly cvService = inject(CvService);
}
