import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG icons
import { ButtonModule } from 'primeng/button';

interface MemoryPlace {
  name: string;
  date: string;
  image: string;
  description: string;
  emotions: string[];
  icon: string;
}

@Component({
  selector: 'app-memory-places',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './memory-places.component.html',
  styleUrls: ['./memory-places.component.scss']
})
export class MemoryPlacesComponent implements OnInit, OnDestroy {
  @Input() places: MemoryPlace[] = [];

  currentSlide = 0;
  currentTranslate = 0;
  private autoSlideInterval: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.goToSlide(this.currentSlide - 1);
    }
  }

  nextSlide() {
    if (this.currentSlide < this.places.length - 1) {
      this.goToSlide(this.currentSlide + 1);
    } else {
      this.goToSlide(0);
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.currentTranslate = -index * 100;
  }

  private startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
} 