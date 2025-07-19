import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LoveStatistics {
  daysTogether: number;
  photosTaken: number;
  placesVisited: number;
}

@Component({
  selector: 'app-love-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './love-statistics.component.html',
  styleUrls: ['./love-statistics.component.scss']
})
export class LoveStatisticsComponent {
  @Input() statistics: LoveStatistics = {
    daysTogether: 0,
    photosTaken: 0,
    placesVisited: 0
  };

  // Remove unused methods since we're using direct properties now
}
