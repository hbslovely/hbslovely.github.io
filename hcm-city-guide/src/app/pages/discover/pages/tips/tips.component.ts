import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';

interface TipAction {
  label: string;
  icon: string;
  class?: string;
  type: 'link' | 'download' | 'share';
  data?: any;
}

interface TravelTip {
  categoryKey: string;
  icon: string;
  tips: {
    titleKey: string;
    contentKey: string;
    important?: boolean;
    icon?: string;
    actions?: TipAction[];
  }[];
}

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CardModule,
    ButtonModule,
    AccordionModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent {
  travelTips: TravelTip[] = [
    {
      categoryKey: 'TIPS.TRANSPORTATION.TITLE',
      icon: 'fa-solid fa-bus',
      tips: [
        {
          titleKey: 'TIPS.TRANSPORTATION.GRAB.TITLE',
          contentKey: 'TIPS.TRANSPORTATION.GRAB.CONTENT',
          icon: 'fa-solid fa-car',
          actions: [
            {
              label: 'TIPS.ACTIONS.DOWNLOAD_APP',
              icon: 'pi pi-download',
              type: 'link',
              data: 'https://grab.com/vn/download/'
            }
          ]
        },
        {
          titleKey: 'TIPS.TRANSPORTATION.BUS.TITLE',
          contentKey: 'TIPS.TRANSPORTATION.BUS.CONTENT',
          icon: 'fa-solid fa-bus'
        },
        {
          titleKey: 'TIPS.TRANSPORTATION.MOTORBIKE.TITLE',
          contentKey: 'TIPS.TRANSPORTATION.MOTORBIKE.CONTENT',
          important: true,
          icon: 'fa-solid fa-motorcycle'
        }
      ]
    },
    {
      categoryKey: 'TIPS.SAFETY.TITLE',
      icon: 'fa-solid fa-shield-alt',
      tips: [
        {
          titleKey: 'TIPS.SAFETY.VALUABLES.TITLE',
          contentKey: 'TIPS.SAFETY.VALUABLES.CONTENT',
          important: true,
          icon: 'fa-solid fa-shield-halved'
        },
        {
          titleKey: 'TIPS.SAFETY.TRAFFIC.TITLE',
          contentKey: 'TIPS.SAFETY.TRAFFIC.CONTENT',
          icon: 'fa-solid fa-traffic-light'
        },
        {
          titleKey: 'TIPS.SAFETY.SCAMS.TITLE',
          contentKey: 'TIPS.SAFETY.SCAMS.CONTENT',
          icon: 'fa-solid fa-triangle-exclamation'
        }
      ]
    },
    {
      categoryKey: 'TIPS.ETIQUETTE.TITLE',
      icon: 'fa-solid fa-hands',
      tips: [
        {
          titleKey: 'TIPS.ETIQUETTE.TEMPLES.TITLE',
          contentKey: 'TIPS.ETIQUETTE.TEMPLES.CONTENT',
          icon: 'fa-solid fa-gopuram'
        },
        {
          titleKey: 'TIPS.ETIQUETTE.DRESS.TITLE',
          contentKey: 'TIPS.ETIQUETTE.DRESS.CONTENT',
          icon: 'fa-solid fa-shirt'
        },
        {
          titleKey: 'TIPS.ETIQUETTE.BARGAINING.TITLE',
          contentKey: 'TIPS.ETIQUETTE.BARGAINING.CONTENT',
          icon: 'fa-solid fa-hand-holding-dollar'
        }
      ]
    },
    {
      categoryKey: 'TIPS.WEATHER.TITLE',
      icon: 'fa-solid fa-cloud-sun',
      tips: [
        {
          titleKey: 'TIPS.WEATHER.RAINY.TITLE',
          contentKey: 'TIPS.WEATHER.RAINY.CONTENT',
          icon: 'fa-solid fa-cloud-rain'
        },
        {
          titleKey: 'TIPS.WEATHER.HEAT.TITLE',
          contentKey: 'TIPS.WEATHER.HEAT.CONTENT',
          important: true,
          icon: 'fa-solid fa-temperature-high'
        },
        {
          titleKey: 'TIPS.WEATHER.BEST_TIME.TITLE',
          contentKey: 'TIPS.WEATHER.BEST_TIME.CONTENT',
          icon: 'fa-solid fa-calendar-check'
        }
      ]
    }
  ];

  essentials = [
    {
      titleKey: 'TIPS.ESSENTIALS.VISA.TITLE',
      contentKey: 'TIPS.ESSENTIALS.VISA.CONTENT',
      icon: 'fa-solid fa-passport'
    },
    {
      titleKey: 'TIPS.ESSENTIALS.MONEY.TITLE',
      contentKey: 'TIPS.ESSENTIALS.MONEY.CONTENT',
      icon: 'fa-solid fa-money-bill-wave'
    },
    {
      titleKey: 'TIPS.ESSENTIALS.PHONE.TITLE',
      contentKey: 'TIPS.ESSENTIALS.PHONE.CONTENT',
      icon: 'fa-solid fa-mobile-alt'
    }
  ];

  emergencyContacts = [
    {
      name: 'Police',
      number: '113',
      icon: 'fa-solid fa-building-shield'
    },
    {
      name: 'Ambulance',
      number: '115',
      icon: 'fa-solid fa-truck-medical'
    },
    {
      name: 'Fire',
      number: '114',
      icon: 'fa-solid fa-fire-extinguisher'
    }
  ];

  onTipAction(action: TipAction) {
    switch (action.type) {
      case 'link':
        if (action.data) {
          window.open(action.data, '_blank');
        }
        break;
      case 'download':
        // Handle download action
        break;
      case 'share':
        // Handle share action
        break;
    }
  }
} 