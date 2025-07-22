import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { PersonalInfo } from '../../models/cv.models';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule, NzIconModule, NzTypographyModule],
  template: `
    <div class="personal-info-section">
      <div class="personal-info-header">
        <div class="avatar-container">
          <img src="assets/images/avatar.jpeg" alt="Professional photo" />
        </div>
        <div class="info-container">
          <h1 nz-typography>{{ info?.name }}</h1>
          <h2 nz-typography>{{ info?.title }}</h2>
          <p nz-typography>{{ info?.summary }}</p>
        </div>
      </div>

      <div class="contact-info">
        <div>
          <span nz-icon nzType="mail"></span>
          {{ info?.email }}
        </div>
        <div>
          <span nz-icon nzType="phone"></span>
          {{ info?.phone }}
        </div>
        <div>
          <span nz-icon nzType="environment"></span>
          {{ info?.address }}
        </div>
        <div>
          <a [href]="info?.linkedin" target="_blank">
            <span nz-icon nzType="linkedin"></span>
            LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .personal-info-section {
      padding: 2rem;
      background: white;
      border-radius: var(--border-radius);
      margin-bottom: 2rem;
    }

    .personal-info-header {
      display: flex;
      align-items: flex-start;
      gap: 3rem;

      .avatar-container {
        flex-shrink: 0;
        
        img {
          width: 180px;
          height: 180px;
          border-radius: var(--border-radius);
          object-fit: cover;
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.05) rotate(2deg);
          }
        }
      }

      .info-container {
        flex-grow: 1;

        h1 {
          font-size: 2.8rem;
          line-height: 1.2;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, var(--text-color) 0%, rgba(0, 0, 0, 0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.5px;
        }

        h2 {
          margin: 0.75rem 0 1.5rem;
          font-size: 1.6rem;
          color: rgba(0, 0, 0, 0.65);
          font-weight: 500;
        }

        p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(0, 0, 0, 0.65);
          margin: 0;
        }
      }
    }

    .contact-info {
      margin: 2rem 0 0;
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(0, 0, 0, 0.06);
      
      > div {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        background: var(--background-light);
        border-radius: 20px;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
        }
      }

      [nz-icon] {
        margin-right: 0.75rem;
        color: var(--primary-color);
        font-size: 1.2rem;
      }

      a {
        color: var(--primary-color);
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
          color: darken(var(--primary-color), 10%);
          transform: translateY(-1px);
        }
      }
    }

    @media (max-width: 768px) {
      .personal-info-header {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 2rem;

        .avatar-container {
          margin-bottom: 0;
        }

        .info-container {
          h1 {
            font-size: 2.2rem;
          }

          h2 {
            font-size: 1.4rem;
          }
        }
      }

      .contact-info {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        
        > div {
          width: 100%;
          justify-content: center;
        }
      }
    }
  `]
})
export class PersonalInfoComponent {
  @Input() info?: PersonalInfo;
} 