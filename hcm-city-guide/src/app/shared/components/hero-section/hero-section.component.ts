import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() buttonText = '';
  @Input() buttonLink = '';
  @Input() backgroundImage = 'assets/images/ben-thanh-market.jpg';
} 