import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoveQuote } from '../../models';

@Component({
  selector: 'app-love-quotes',
  templateUrl: './love-quotes.component.html',
  styleUrls: ['./love-quotes.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoveQuotesComponent {
  @Input() quotes: LoveQuote[] = [];

  leftColumnQuotes: LoveQuote[] = [];
  rightColumnQuotes: LoveQuote[] = [];

  ngOnInit() {
    // Chia quotes thành 2 cột
    this.quotes.forEach((quote, index) => {
      if (index % 2 === 0) {
        this.leftColumnQuotes.push(quote);
      } else {
        this.rightColumnQuotes.push(quote);
      }
    });
  }
} 