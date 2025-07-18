import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SpecialMoment {
  title: string;
  description: string;
  date: string;
  icon: string;
  color: string;
  message: string;
  author: string;
}

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
