import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() icon = '';
  @Input() image = '';
} 