import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  template: `
    <div class="about-section">
      <div class="personal-info" *ngIf="cvService.cv()?.personalInfo as info">
        <div class="info-header">
          <div class="info-text">
            <h1>
              <span class="prefix">{{ info.prefix }}</span>
              {{ info.name }}
            </h1>
            <h2>{{ info.title }}</h2>
            <p class="summary">{{ info.shortSummary }}</p>
          </div>
          <div class="avatar">
            <img src="assets/images/avatar.png" alt="Profile picture">
          </div>
        </div>
        <div class="contact-info">
          <div class="info-item">
            <strong>Location:</strong>
            <span>{{ info.location.address }}, {{ info.location.city }}, {{ info.location.country }}</span>
          </div>
          <div class="info-item">
            <strong>Email:</strong>
            <a [href]="'mailto:' + info.contact.email">{{ info.contact.email }}</a>
          </div>
          <div class="info-item">
            <strong>Phone:</strong>
            <a [href]="'tel:' + info.contact.phone">{{ info.contact.phone }}</a>
          </div>
        </div>
        <div class="additional-info">
          <div class="languages">
            <h3>Languages</h3>
            <div class="language-item" *ngFor="let lang of info.languages">
              <span class="language-name">{{ lang.name }}</span>
              <span class="language-level">{{ lang.level }}</span>
            </div>
          </div>
          <div class="interests">
            <h3>Interests</h3>
            <div class="interest-tags">
              <span class="interest-tag" *ngFor="let interest of info.interests">
                {{ interest }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-section {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .personal-info {
      .info-header {
        display: flex;
        gap: 3rem;
        margin-bottom: 3rem;
        align-items: center;

        .info-text {
          flex: 1;

          h1 {
            font-size: 2.5rem;
            margin: 0;
            color: var(--primary-color);
            font-weight: 500;
            display: flex;
            align-items: baseline;
            gap: 0.5rem;

            .prefix {
              font-size: 1.5rem;
              color: var(--text-secondary);
              font-weight: normal;
            }
          }

          h2 {
            font-size: 1.5rem;
            margin: 0.75rem 0;
            color: var(--text-secondary);
            font-weight: normal;
          }

          .summary {
            font-size: 1.1rem;
            line-height: 1.6;
            color: var(--text-color);
            margin: 1.5rem 0 0 0;
          }
        }

        .avatar {
          width: 200px;
          height: 200px;
          border-radius: 4px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top center;
          }
        }
      }

      .contact-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 4px;

        .info-item {
          display: flex;
          gap: 0.75rem;
          align-items: center;

          strong {
            color: var(--text-color);
            font-weight: 500;
            min-width: 80px;
          }

          a {
            color: var(--text-color);
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
              color: var(--primary-color);
            }
          }
        }
      }

      .additional-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;

        h3 {
          color: var(--text-color);
          margin: 0 0 1.5rem 0;
          font-size: 1.25rem;
          font-weight: 500;
          position: relative;
          padding-bottom: 0.5rem;

          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40px;
            height: 2px;
            background: var(--text-color);
          }
        }

        .languages {
          .language-item {
            display: flex;
            justify-content: space-between;
            padding: 1rem 0;
            border-bottom: 1px solid #eee;

            &:last-child {
              border-bottom: none;
            }

            .language-name {
              font-weight: 500;
              color: var(--text-color);
            }

            .language-level {
              color: var(--text-secondary);
            }
          }
        }

        .interests {
          .interest-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;

            .interest-tag {
              background: #f8f9fa;
              color: var(--text-color);
              padding: 0.5rem 1rem;
              border-radius: 4px;
              font-size: 0.9rem;
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      .about-section {
        padding: 1rem;
      }

      .personal-info {
        .info-header {
          flex-direction: column-reverse;
          gap: 2rem;
          text-align: center;

          .avatar {
            width: 180px;
            height: 180px;
            margin: 0 auto;
          }

          .info-text {
            h1 {
              font-size: 2rem;
              justify-content: center;

              .prefix {
                font-size: 1.25rem;
              }
            }

            h2 {
              font-size: 1.25rem;
            }
          }
        }

        .contact-info {
          grid-template-columns: 1fr;
          text-align: left;
        }

        .additional-info {
          grid-template-columns: 1fr;
          gap: 2rem;

          h3 {
            text-align: left;
          }

          .languages .language-item {
            text-align: left;
          }

          .interests .interest-tags {
            justify-content: flex-start;
          }
        }
      }
    }
  `]
})
export class AboutComponent {
  cvService = inject(CvService);
}
