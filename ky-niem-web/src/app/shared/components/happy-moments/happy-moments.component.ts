import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Emotion {
  icon: string;
  text: string;
}

interface HappyMoment {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  emotions: Emotion[];
}

interface Category {
  id: string;
  title: string;
  icon: string;
  count: number;
}

interface Quote {
  text: string;
  author: string;
  icon: string;
}

interface FeaturedMoment {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-happy-moments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './happy-moments.component.html',
  styleUrls: ['./happy-moments.component.scss']
})
export class HappyMomentsComponent implements OnInit {
  happyMoments: HappyMoment[] = [];
  categories: Category[] = [];
  quotes: Quote[] = [];
  featuredMoment?: FeaturedMoment;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHappyMomentsData();
  }

  private loadHappyMomentsData(): void {
    this.http.get<{
      happyMoments: HappyMoment[],
      categories: Category[],
      quotes: Quote[],
      featuredMoment: FeaturedMoment
    }>('assets/data/happy-moments.json').subscribe(data => {
      this.happyMoments = data.happyMoments;
      this.categories = data.categories;
      this.quotes = data.quotes;
      this.featuredMoment = data.featuredMoment;
    });
  }
} 