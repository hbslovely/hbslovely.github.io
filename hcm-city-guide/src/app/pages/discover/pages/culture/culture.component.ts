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
}

interface Tradition {
  nameKey: string;
  descriptionKey: string;
  image: string;
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
  upcomingEvents: CulturalEvent[] = [];
  heritages: Heritage[] = [];
  traditions: Tradition[] = [
    {
      nameKey: 'CULTURE.TRADITIONS.AO_DAI.NAME',
      descriptionKey: 'CULTURE.TRADITIONS.AO_DAI.DESC',
      image: 'assets/images/culture/ao-dai.jpg'
    },
    {
      nameKey: 'CULTURE.TRADITIONS.COFFEE.NAME',
      descriptionKey: 'CULTURE.TRADITIONS.COFFEE.DESC',
      image: 'assets/images/culture/coffee.jpg'
    },
    {
      nameKey: 'CULTURE.TRADITIONS.MARKET.NAME',
      descriptionKey: 'CULTURE.TRADITIONS.MARKET.DESC',
      image: 'assets/images/culture/market.jpg'
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