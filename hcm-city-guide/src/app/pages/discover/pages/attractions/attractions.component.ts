import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';

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
export class AttractionsComponent {
  attractions: Attraction[] = [
    {
      id: 'ben-thanh-market',
      nameKey: 'ATTRACTIONS.BEN_THANH.NAME',
      descriptionKey: 'ATTRACTIONS.BEN_THANH.DESC',
      address: '32-30 Lê Lợi, Phường Bến Thành, Quận 1',
      openingHours: '6:00 - 24:00',
      price: '0đ',
      images: [
        'assets/images/attractions/ben-thanh/main.jpg',
        'assets/images/attractions/ben-thanh/inside.jpg',
        'assets/images/attractions/ben-thanh/night.jpg'
      ],
      tags: ['shopping', 'food', 'historic'],
      coordinates: {
        lat: 10.772419,
        lng: 106.698244
      },
      facilities: ['parking', 'restroom', 'atm']
    },
    {
      id: 'notre-dame',
      nameKey: 'ATTRACTIONS.NOTRE_DAME.NAME',
      descriptionKey: 'ATTRACTIONS.NOTRE_DAME.DESC',
      address: '01 Công xã Paris, Bến Nghé, Quận 1',
      openingHours: '8:00 - 17:00',
      price: '0đ',
      images: [
        'assets/images/attractions/notre-dame/main.jpg',
        'assets/images/attractions/notre-dame/inside.jpg',
        'assets/images/attractions/notre-dame/detail.jpg'
      ],
      tags: ['religious', 'historic', 'architecture'],
      coordinates: {
        lat: 10.779814,
        lng: 106.699177
      },
      facilities: ['parking', 'restroom']
    },
    {
      id: 'war-remnants-museum',
      nameKey: 'ATTRACTIONS.WAR_MUSEUM.NAME',
      descriptionKey: 'ATTRACTIONS.WAR_MUSEUM.DESC',
      address: '28 Võ Văn Tần, Phường 6, Quận 3',
      openingHours: '7:30 - 18:00',
      price: '40.000đ',
      images: [
        'assets/images/attractions/war-museum/main.jpg',
        'assets/images/attractions/war-museum/exhibit.jpg',
        'assets/images/attractions/war-museum/outdoor.jpg'
      ],
      tags: ['museum', 'historic', 'educational'],
      coordinates: {
        lat: 10.779468,
        lng: 106.692154
      },
      facilities: ['parking', 'restroom', 'cafe', 'gift-shop']
    },
    {
      id: 'independence-palace',
      nameKey: 'ATTRACTIONS.INDEPENDENCE_PALACE.NAME',
      descriptionKey: 'ATTRACTIONS.INDEPENDENCE_PALACE.DESC',
      address: '135 Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1',
      openingHours: '7:30 - 17:00',
      price: '65.000đ',
      images: [
        'assets/images/attractions/independence-palace/main.jpg',
        'assets/images/attractions/independence-palace/interior.jpg',
        'assets/images/attractions/independence-palace/garden.jpg'
      ],
      tags: ['historic', 'architecture', 'museum'],
      coordinates: {
        lat: 10.777163,
        lng: 106.695628
      },
      facilities: ['parking', 'restroom', 'cafe', 'guided-tour']
    }
  ];

  getTagColor(tag: string): string {
    const colors: { [key: string]: string } = {
      shopping: 'primary',
      food: 'success',
      historic: 'warning',
      religious: 'info',
      architecture: 'warning',
      museum: 'info',
      educational: 'success'
    };
    return colors[tag] || 'primary';
  }

  getFacilityIcon(facility: string): string {
    const icons: { [key: string]: string } = {
      parking: 'fa-solid fa-parking',
      restroom: 'fa-solid fa-restroom',
      atm: 'fa-solid fa-money-bill-transfer',
      cafe: 'fa-solid fa-mug-hot',
      'gift-shop': 'fa-solid fa-gift',
      'guided-tour': 'fa-solid fa-person-walking'
    };
    return icons[facility] || 'fa-solid fa-circle-info';
  }
} 