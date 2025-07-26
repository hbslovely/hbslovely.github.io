import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fun-facts-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fun-facts-card.component.html',
  styleUrls: ['./fun-facts-card.component.scss']
})
export class FunFactsCardComponent {
  @Input() facts: any[] = [];
  @Input() title: string = 'Những điều thú vị';
} 