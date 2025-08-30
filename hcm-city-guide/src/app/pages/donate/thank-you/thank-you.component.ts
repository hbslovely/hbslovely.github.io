import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

interface QuickLink {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  route: string[];
}

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    DividerModule,
    RippleModule
  ],
  template: `
    <div class="thank-you-page">
      <div class="content-wrapper">
        <!-- Success Message -->
        <div class="success-section">
          <div class="success-icon">
            <i class="pi pi-check-circle"></i>
          </div>
          <h1>{{ 'DONATE.THANK_YOU.TITLE' | translate }}</h1>
          <p class="message">{{ 'DONATE.THANK_YOU.MESSAGE' | translate: { amount: amount, donor: donor } }}</p>
          <p class="reference">{{ 'DONATE.THANK_YOU.REFERENCE' | translate: { orderId: orderId } }}</p>
          <p class="receipt">{{ 'DONATE.THANK_YOU.RECEIPT' | translate }}</p>
        </div>

        <p-divider></p-divider>

        <!-- Quick Links -->
        <div class="quick-links-section">
          <h2>{{ 'DONATE.THANK_YOU.QUICK_LINKS.TITLE' | translate }}</h2>
          <p>{{ 'DONATE.THANK_YOU.QUICK_LINKS.DESCRIPTION' | translate }}</p>
          
          <div class="quick-links-grid">
            <div *ngFor="let link of quickLinks" 
                 class="quick-link-card" 
                 [routerLink]="link.route"
                 pRipple>
              <i [class]="'pi ' + link.icon"></i>
              <div class="link-content">
                <h3>{{ link.titleKey | translate }}</h3>
                <p>{{ link.descriptionKey | translate }}</p>
              </div>
              <i class="pi pi-arrow-right arrow-icon"></i>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="actions-section">
          <p-button 
            [label]="'DONATE.THANK_YOU.BACK_HOME' | translate"
            (click)="goHome()"
            styleClass="p-button-text">
          </p-button>
          <p-button 
            [label]="'DONATE.THANK_YOU.DONATE_AGAIN' | translate"
            (click)="donateAgain()"
            styleClass="p-button-outlined">
          </p-button>
          <p-button 
            [label]="'DONATE.THANK_YOU.SHARE' | translate"
            (click)="shareExperience()"
            icon="pi pi-share-alt">
          </p-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .thank-you-page {
      min-height: calc(100vh - 200px);
      background: var(--surface-ground);
      padding: 3rem 1rem;
    }

    .content-wrapper {
      max-width: 800px;
      margin: 0 auto;
      background: var(--surface-card);
      border-radius: var(--border-radius);
      padding: 2rem;
      box-shadow: var(--card-shadow);
    }

    .success-section {
      text-align: center;
      margin-bottom: 2rem;

      .success-icon {
        font-size: 4rem;
        color: var(--green-500);
        margin-bottom: 1rem;
        
        i {
          background: var(--green-50);
          padding: 1rem;
          border-radius: 50%;
        }
      }

      h1 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        font-weight: 600;
      }

      .message {
        font-size: 1.1rem;
        color: var(--text-color);
        margin-bottom: 1rem;
        line-height: 1.5;
      }

      .reference {
        font-size: 0.9rem;
        color: var(--text-color-secondary);
        margin-bottom: 0.5rem;
        font-family: monospace;
      }

      .receipt {
        font-size: 0.9rem;
        color: var(--text-color-secondary);
      }
    }

    .quick-links-section {
      margin: 2rem 0;

      h2 {
        color: var(--text-color);
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      > p {
        color: var(--text-color-secondary);
        margin-bottom: 1.5rem;
      }

      .quick-links-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
      }

      .quick-link-card {
        display: flex;
        align-items: center;
        padding: 1rem;
        background: var(--surface-ground);
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: var(--surface-hover);
          transform: translateY(-2px);

          .arrow-icon {
            transform: translateX(4px);
          }
        }

        i {
          font-size: 1.5rem;
          color: var(--primary-color);
          margin-right: 1rem;
        }

        .link-content {
          flex: 1;

          h3 {
            color: var(--text-color);
            margin: 0 0 0.25rem 0;
            font-size: 1rem;
            font-weight: 600;
          }

          p {
            color: var(--text-color-secondary);
            margin: 0;
            font-size: 0.875rem;
          }
        }

        .arrow-icon {
          color: var(--primary-color);
          transition: transform 0.2s;
        }
      }
    }

    .actions-section {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
      flex-wrap: wrap;
    }

    @media screen and (max-width: 768px) {
      .thank-you-page {
        padding: 1rem;
      }

      .content-wrapper {
        padding: 1.5rem;
      }

      .quick-links-grid {
        grid-template-columns: 1fr !important;
      }

      .actions-section {
        flex-direction: column;
        
        ::ng-deep .p-button {
          width: 100%;
        }
      }
    }
  `]
})
export class ThankYouComponent implements OnInit {
  amount: string = '';
  donor: string = '';
  orderId: string = '';

  quickLinks: QuickLink[] = [
    {
      icon: 'pi-map',
      titleKey: 'DONATE.THANK_YOU.QUICK_LINKS.DISCOVER',
      descriptionKey: 'DONATE.THANK_YOU.QUICK_LINKS.DISCOVER_DESC',
      route: ['/discover']
    },
    {
      icon: 'pi-home',
      titleKey: 'DONATE.THANK_YOU.QUICK_LINKS.HOTELS',
      descriptionKey: 'DONATE.THANK_YOU.QUICK_LINKS.HOTELS_DESC',
      route: ['/hotels']
    },
    {
      icon: 'pi-ticket',
      titleKey: 'DONATE.THANK_YOU.QUICK_LINKS.ENTERTAINMENT',
      descriptionKey: 'DONATE.THANK_YOU.QUICK_LINKS.ENTERTAINMENT_DESC',
      route: ['/entertainment']
    },
    {
      icon: 'pi-heart',
      titleKey: 'DONATE.THANK_YOU.QUICK_LINKS.FOOD',
      descriptionKey: 'DONATE.THANK_YOU.QUICK_LINKS.FOOD_DESC',
      route: ['/discover', 'food']
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.amount = params['amount'] || '';
      this.donor = params['donor'] || '';
      this.orderId = params['orderId'] || '';
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  donateAgain() {
    this.router.navigate(['/donate']);
  }

  shareExperience() {
    // Implement social sharing
    const text = `I just supported HCM City Guide! Check out this amazing resource for exploring Ho Chi Minh City.`;
    const url = window.location.origin;
    
    if (navigator.share) {
      navigator.share({
        title: 'Support HCM City Guide',
        text: text,
        url: url
      }).catch(console.error);
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    }
  }
} 