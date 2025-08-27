import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { DataService } from '@core/services';

interface Attraction {
  id: string;
  nameKey: string;
  descriptionKey: string;
  address: string;
  openingHours: string;
  price: string;
  images: string[];
  tags: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  facilities: string[];
}

interface AttractionsData {
  attractions: Attraction[];
  tagColors: { [key: string]: string };
  facilityIcons: { [key: string]: string };
}

@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CardModule,
    ButtonModule,
    GalleriaModule,
    TagModule
  ],
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss']
})
export class AttractionsComponent implements OnInit {
  attractions: Attraction[] = [];
  private tagColors: { [key: string]: string } = {};
  private facilityIcons: { [key: string]: string } = {};

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadAttractionsData();
  }

  private loadAttractionsData() {
    this.dataService.get<AttractionsData>('assets/data/attractions.json')
      .subscribe(data => {
        this.attractions = data.attractions;
        this.tagColors = data.tagColors;
        this.facilityIcons = data.facilityIcons;
      });
  }

  getTagColor(tag: string): string {
    return this.tagColors[tag] || 'primary';
  }

  getFacilityIcon(facility: string): string {
    return this.facilityIcons[facility] || 'fa-solid fa-circle-info';
  }
} 