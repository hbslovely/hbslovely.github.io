import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Quote {
  quote: string;
  author: string;
  icon: string;
}

@Component({
  selector: 'app-love-quotes',
  templateUrl: './love-quotes.component.html',
  styleUrls: ['./love-quotes.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoveQuotesComponent implements OnInit {
  quotes: Quote[] = [
    {
      quote: "Tình yêu không phải là nhìn nhau mà là cùng nhìn về một hướng.",
      author: "Antoine de Saint-Exupéry",
      icon: "pi pi-heart"
    },
    {
      quote: "Yêu không phải là nhìn thấy điều hoàn hảo trong nhau, mà là học cách chấp nhận những khiếm khuyết của nhau.",
      author: "Unknown",
      icon: "pi pi-heart-fill"
    },
    {
      quote: "Hạnh phúc không phải là có được tất cả, mà là biết trân trọng những gì mình đang có.",
      author: "Unknown",
      icon: "pi pi-star"
    },
    {
      quote: "Tình yêu là khi hạnh phúc của người kia trở thành hạnh phúc của chính mình.",
      author: "Lev Tolstoy",
      icon: "pi pi-home"
    },
    {
      quote: "Yêu là cho đi mà không mong nhận lại, là hy sinh mà không hối tiếc.",
      author: "Unknown",
      icon: "pi pi-gift"
    },
    {
      quote: "Tình yêu không cần phải hoàn hảo, chỉ cần chân thành và đủ đầy.",
      author: "Unknown",
      icon: "pi pi-heart"
    }
  ];

  leftColumnQuotes: Quote[] = [];
  rightColumnQuotes: Quote[] = [];

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