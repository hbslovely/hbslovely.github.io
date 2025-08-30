import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StatsSectionComponent } from '@shared/components/stats-section';
import { DataService, HomeData } from '@core/services/data.service';

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
export class HomeComponent implements OnInit {
  homeData!: HomeData;
  featuredPlaces: HomeData['featuredPlaces'] = [];
  categories: HomeData['categories'] = [];
  quickFacts: HomeData['quickFacts'] = [];
  responsiveOptions: HomeData['carouselResponsiveOptions'] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadHomeData();
  }

  private loadHomeData() {
    this.dataService.getHomeData().subscribe(data => {
      this.homeData = data;
      this.featuredPlaces = data.featuredPlaces;
      this.categories = data.categories;
      this.quickFacts = data.quickFacts;
      this.responsiveOptions = data.carouselResponsiveOptions;
    });
  }
}
