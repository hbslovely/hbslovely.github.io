import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-education-card',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    TranslateModule
  ],
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.scss']
})
export class EducationCardComponent {
  @Input() education: any; // Replace 'any' with your education interface type
} 