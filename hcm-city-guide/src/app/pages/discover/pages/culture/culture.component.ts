import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';

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
export class CultureComponent {
  upcomingEvents: CulturalEvent[] = [
    {
      nameKey: 'CULTURE.EVENTS.TET.NAME',
      descriptionKey: 'CULTURE.EVENTS.TET.DESC',
      dateKey: 'CULTURE.EVENTS.TET.DATE',
      image: 'assets/images/culture/tet.jpg',
      location: 'Nguyen Hue Walking Street'
    },
    {
      nameKey: 'CULTURE.EVENTS.MID_AUTUMN.NAME',
      descriptionKey: 'CULTURE.EVENTS.MID_AUTUMN.DESC',
      dateKey: 'CULTURE.EVENTS.MID_AUTUMN.DATE',
      image: 'assets/images/culture/mid-autumn.jpg',
      location: 'District 5'
    },
    {
      nameKey: 'CULTURE.EVENTS.LANTERN.NAME',
      descriptionKey: 'CULTURE.EVENTS.LANTERN.DESC',
      dateKey: 'CULTURE.EVENTS.LANTERN.DATE',
      image: 'assets/images/culture/lantern.jpg',
      location: 'Various Temples'
    }
  ];

  heritages: Heritage[] = [
    {
      nameKey: 'CULTURE.HERITAGE.NOTRE_DAME.NAME',
      descriptionKey: 'CULTURE.HERITAGE.NOTRE_DAME.DESC',
      image: 'assets/images/culture/notre-dame.jpg',
      yearBuilt: '1880',
      category: 'architecture'
    },
    {
      nameKey: 'CULTURE.HERITAGE.OPERA_HOUSE.NAME',
      descriptionKey: 'CULTURE.HERITAGE.OPERA_HOUSE.DESC',
      image: 'assets/images/culture/opera-house.jpg',
      yearBuilt: '1897',
      category: 'architecture'
    },
    {
      nameKey: 'CULTURE.HERITAGE.THIEN_HAU.NAME',
      descriptionKey: 'CULTURE.HERITAGE.THIEN_HAU.DESC',
      image: 'assets/images/culture/thien-hau.jpg',
      yearBuilt: '1760',
      category: 'religious'
    },
    {
      nameKey: 'CULTURE.HERITAGE.HISTORY_MUSEUM.NAME',
      descriptionKey: 'CULTURE.HERITAGE.HISTORY_MUSEUM.DESC',
      image: 'assets/images/culture/history-museum.jpg',
      yearBuilt: '1929',
      category: 'museum'
    }
  ];

  traditions = [
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
} 