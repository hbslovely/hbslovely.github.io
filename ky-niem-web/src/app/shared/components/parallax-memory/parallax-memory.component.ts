import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parallax-memory',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="parallax-container" [style.height]="height">
      <div class="parallax-image" 
           [style.backgroundImage]="'url(' + imageUrl + ')'"
           [style.transform]="'translateY(' + parallaxOffset + 'px)'">
      </div>
      <div class="memory-caption" *ngIf="caption">
        <div class="caption-content">
          <i class="pi pi-camera"></i>
          <p>{{ caption }}</p>
          <span class="memory-date" *ngIf="date">{{ date }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .parallax-container {
      position: relative;
      width: 100%;
      overflow: hidden;
      margin: 4rem 0;
    }

    .parallax-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      will-change: transform;
      transition: transform 0.1s linear;
    }

    .memory-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
      padding: 2rem;
      color: white;
      text-align: center;

      .caption-content {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;

        i {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 1.2rem;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .memory-date {
          font-size: 0.9rem;
          opacity: 0.8;
        }
      }
    }

    @media (max-width: 768px) {
      .parallax-container {
        margin: 2rem 0;
      }

      .memory-caption {
        padding: 1.5rem;

        .caption-content {
          p {
            font-size: 1rem;
          }

          .memory-date {
            font-size: 0.8rem;
          }
        }
      }
    }
  `]
})
export class ParallaxMemoryComponent {
  @Input() imageUrl: string = '';
  @Input() height: string = '400px';
  @Input() caption: string = '';
  @Input() date: string = '';

  parallaxOffset: number = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const element = document.querySelector('.parallax-container');
    if (element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollPosition = rect.top;
        this.parallaxOffset = scrollPosition * 0.4;
      }
    }
  }
} 