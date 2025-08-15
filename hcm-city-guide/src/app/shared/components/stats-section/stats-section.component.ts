import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface StatItem {
  icon: string;
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.scss']
})
export class StatsSectionComponent {
  @Input() stats: StatItem[] = [
    { icon: 'fas fa-landmark', value: '24+', label: 'STATS.DISTRICTS' },
    { icon: 'fas fa-utensils', value: '1000+', label: 'STATS.RESTAURANTS' },
    { icon: 'fas fa-hotel', value: '500+', label: 'STATS.HOTELS' },
    { icon: 'fas fa-camera', value: '100+', label: 'STATS.ATTRACTIONS' }
  ];
} 