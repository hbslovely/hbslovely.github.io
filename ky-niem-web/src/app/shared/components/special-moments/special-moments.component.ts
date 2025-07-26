import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialMoment } from '../../models';

@Component({
  selector: 'app-special-moments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './special-moments.component.html',
  styleUrls: ['./special-moments.component.scss']
})
export class SpecialMomentsComponent {
  @Input() moments: SpecialMoment[] = [];
}
