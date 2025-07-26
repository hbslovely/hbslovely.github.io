import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-album-header',
  template: `
    <div class="album-header">
      <div class="header-background">
        <div class="pattern-overlay"></div>
        <div class="gradient-overlay"></div>
      </div>
      <div class="header-content">
        <h1 class="title">Album Ảnh</h1>
        <p class="subtitle">{{ totalPhotos }} khoảnh khắc đáng nhớ</p>
        <div class="floating-photos">
          <div class="photo" *ngFor="let photo of previewPhotos">
            <img [src]="photo" alt="Preview photo">
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .album-header {
      position: relative;
      height: 400px;
      overflow: hidden;
      background: #f8f9fa;
    }

    .header-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .pattern-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: radial-gradient(#4CAF50 1px, transparent 1px);
      background-size: 20px 20px;
      opacity: 0.1;
    }

    .gradient-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #4CAF50 0%, #81C784 100%);
      opacity: 0.1;
    }

    .header-content {
      position: relative;
      z-index: 1;
      max-width: 1200px;
      margin: 0 auto;
      padding: 60px 20px;
      text-align: center;
      color: #2E7D32;
    }

    .title {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 1rem;
      animation: slideUp 0.6s ease-out;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.8;
      margin-bottom: 2rem;
      animation: slideUp 0.6s ease-out 0.2s both;
    }

    .floating-photos {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 40px;
    }

    .photo {
      width: 150px;
      height: 150px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      transform: rotate(-5deg);
      transition: transform 0.3s ease;
      animation: floatIn 0.6s ease-out forwards;

      &:nth-child(2n) {
        transform: rotate(5deg);
      }

      &:hover {
        transform: rotate(0) scale(1.05);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes floatIn {
      from {
        opacity: 0;
        transform: translateY(50px) rotate(-5deg);
      }
      to {
        opacity: 1;
        transform: translateY(0) rotate(-5deg);
      }
    }
  `]
})
export class AlbumHeaderComponent {
  @Input() totalPhotos: number = 0;
  @Input() previewPhotos: string[] = [];
} 