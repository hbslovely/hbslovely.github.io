import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LoveQuote {
  quote: string;
  author: string;
  icon: string;
}

@Component({
  selector: 'app-love-quotes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './love-quotes.component.html',
  styleUrls: ['./love-quotes.component.scss']
})
export class LoveQuotesComponent {
  @Input() quotes: LoveQuote[] = [];
} 