import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { DataService, DiscoverData } from '@core/services';

interface CulturalEvent {
  nameKey: string;
  descriptionKey: string;
  dateKey: string;
  image: string;
  location: string;
}

interface Heritage {
  nameKey: string;
  descriptionKey: string;
  image: string;
  yearBuilt: string;
  category: string;
  features?: string[];
}

interface Tradition {
  nameKey: string;
  descriptionKey: string;
  image: string;
  type?: string;
  season?: string;
}

interface CulturalCategory {
  titleKey: string;
  descriptionKey: string;
  icon: string;
  features: string[];
}

@Component({
  selector: 'app-culture',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CardModule,
    ButtonModule,
    TimelineModule
  ],
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.scss']
})
export class CultureComponent implements OnInit {
  culturalCategories: CulturalCategory[] = [
    {
      titleKey: 'CULTURES.CATEGORIES.VIETNAMESE.TITLE',
      descriptionKey: 'CULTURES.CATEGORIES.VIETNAMESE.DESCRIPTION',
      icon: 'fas fa-dragon',
      features: [
        'CULTURES.CATEGORIES.VIETNAMESE.FEATURES.0',
        'CULTURES.CATEGORIES.VIETNAMESE.FEATURES.1',
        'CULTURES.CATEGORIES.VIETNAMESE.FEATURES.2',
        'CULTURES.CATEGORIES.VIETNAMESE.FEATURES.3'
      ]
    },
    {
      titleKey: 'CULTURES.CATEGORIES.CHINESE.TITLE',
      descriptionKey: 'CULTURES.CATEGORIES.CHINESE.DESCRIPTION',
      icon: 'fas fa-temple-buddhist',
      features: [
        'CULTURES.CATEGORIES.CHINESE.FEATURES.0',
        'CULTURES.CATEGORIES.CHINESE.FEATURES.1',
        'CULTURES.CATEGORIES.CHINESE.FEATURES.2',
        'CULTURES.CATEGORIES.CHINESE.FEATURES.3'
      ]
    },
    {
      titleKey: 'CULTURES.CATEGORIES.FRENCH_COLONIAL.TITLE',
      descriptionKey: 'CULTURES.CATEGORIES.FRENCH_COLONIAL.DESCRIPTION',
      icon: 'fas fa-building-columns',
      features: [
        'CULTURES.CATEGORIES.FRENCH_COLONIAL.FEATURES.0',
        'CULTURES.CATEGORIES.FRENCH_COLONIAL.FEATURES.1',
        'CULTURES.CATEGORIES.FRENCH_COLONIAL.FEATURES.2',
        'CULTURES.CATEGORIES.FRENCH_COLONIAL.FEATURES.3'
      ]
    },
    {
      titleKey: 'CULTURES.CATEGORIES.MODERN.TITLE',
      descriptionKey: 'CULTURES.CATEGORIES.MODERN.DESCRIPTION',
      icon: 'fas fa-city',
      features: [
        'CULTURES.CATEGORIES.MODERN.FEATURES.0',
        'CULTURES.CATEGORIES.MODERN.FEATURES.1',
        'CULTURES.CATEGORIES.MODERN.FEATURES.2',
        'CULTURES.CATEGORIES.MODERN.FEATURES.3'
      ]
    }
  ];

  upcomingEvents: CulturalEvent[] = [];
  heritages: Heritage[] = [];
  traditions: Tradition[] = [
    {
      nameKey: 'CULTURES.TRADITIONS.AO_DAI.NAME',
      descriptionKey: 'CULTURES.TRADITIONS.AO_DAI.DESC',
      image: 'assets/images/culture/ao-dai.jpg',
      type: 'CULTURES.FEATURES.TRADITIONAL',
      season: 'CULTURES.SEASONS.ALL_YEAR'
    },
    {
      nameKey: 'CULTURES.TRADITIONS.COFFEE.NAME',
      descriptionKey: 'CULTURES.TRADITIONS.COFFEE.DESC',
      image: 'assets/images/culture/coffee.jpg',
      type: 'CULTURES.FEATURES.CONTEMPORARY',
      season: 'CULTURES.SEASONS.ALL_YEAR'
    },
    {
      nameKey: 'CULTURES.TRADITIONS.MARKET.NAME',
      descriptionKey: 'CULTURES.TRADITIONS.MARKET.DESC',
      image: 'assets/images/culture/market.jpg',
      type: 'CULTURES.FEATURES.TRADITIONAL',
      season: 'CULTURES.SEASONS.MORNING'
    }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadCultureData();
  }

  private loadCultureData() {
    this.dataService.getDiscoverData().subscribe(data => {
      this.upcomingEvents = data.sections.culture.events;
      this.heritages = data.sections.culture.heritages;
    });
  }
} 