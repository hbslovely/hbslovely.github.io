import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StatsSectionComponent } from '@shared/components/stats-section';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    StatsSectionComponent,
    ButtonModule,
    CardModule,
    RippleModule,
    ImageModule,
    CarouselModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  featuredPlaces = [
    {
      title: 'Ben Thanh Market',
      image: 'assets/images/ben-thanh-market.jpg',
      description: 'HOME.FEATURED_PLACES.BEN_THANH_MARKET'
    },
    {
      title: 'Cu Chi Tunnels',
      image: 'assets/images/cu-chi-tunnels.jpg',
      description: 'HOME.FEATURED_PLACES.CU_CHI_TUNNELS'
    },
    {
      title: 'District 1',
      image: 'assets/images/district-1.jpg',
      description: 'HOME.FEATURED_PLACES.DISTRICT_1'
    }
  ];

  categories = [
    {
      title: 'HOME.CATEGORIES.CULTURE.TITLE',
      description: 'HOME.CATEGORIES.CULTURE.DESC',
      icon: 'pi pi-compass',
      route: '/discover/culture'
    },
    {
      title: 'HOME.CATEGORIES.FOOD.TITLE',
      description: 'HOME.CATEGORIES.FOOD.DESC',
      icon: 'pi pi-heart',
      route: '/discover/food'
    },
    {
      title: 'HOME.CATEGORIES.ATTRACTIONS.TITLE',
      description: 'HOME.CATEGORIES.ATTRACTIONS.DESC',
      icon: 'pi pi-map-marker',
      route: '/discover/attractions'
    },
    {
      title: 'HOME.CATEGORIES.SHOPPING.TITLE',
      description: 'HOME.CATEGORIES.SHOPPING.DESC',
      icon: 'pi pi-shopping-bag',
      route: '/discover/shopping'
    }
  ];

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}
