import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { PersonalInfo } from '../../models/cv.models';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule, NzIconModule, NzTypographyModule],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent {
  @Input() info?: PersonalInfo;
} 