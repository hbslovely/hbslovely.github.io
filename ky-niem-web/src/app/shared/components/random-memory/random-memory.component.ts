import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-random-memory',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="memory-container">
      <div class="memory-frame" [style.transform]="'rotate(' + rotation + 'deg)'">
        <div class="polaroid">
          <img [src]="imageUrl" [alt]="caption" loading="lazy">
          <div class="memory-caption">
            <p>{{ caption }}</p>
            <span class="memory-date" *ngIf="date">{{ date }}</span>
          </div>
        </div>
        <div class="tape-section"></div>
      </div>
    </div>
  `,
  styles: [`
    .memory-container {
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .memory-frame {
      position: relative;
      transition: transform 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.05) rotate(0deg) !important;
        z-index: 2;
      }
    }

    .polaroid {
      background: white;
      padding: 15px 15px 50px 15px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      width: fit-content;
      max-width: 400px;

      img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 2px;
      }

      .memory-caption {
        margin-top: 15px;
        text-align: center;
        font-family: 'Indie Flower', cursive;

        p {
          margin: 0;
          font-size: 1.1rem;
          color: #333;
        }

        .memory-date {
          display: block;
          margin-top: 5px;
          font-size: 0.9rem;
          color: #666;
        }
      }
    }

    .tape-section {
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%) rotate(-5deg);
      width: 100px;
      height: 30px;
      background: rgba(255, 255, 255, 0.6);
      clip-path: polygon(0% 30%, 100% 30%, 100% 70%, 0% 70%);
      opacity: 0.5;
    }

    @media (max-width: 768px) {
      .memory-container {
        padding: 1rem;
      }

      .polaroid {
        max-width: 300px;
        padding: 10px 10px 30px 10px;

        .memory-caption {
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
export class RandomMemoryComponent {
  @Input() imageUrl: string = '';
  @Input() caption: string = '';
  @Input() date: string = '';
  @Input() rotation: number = 0;
} 