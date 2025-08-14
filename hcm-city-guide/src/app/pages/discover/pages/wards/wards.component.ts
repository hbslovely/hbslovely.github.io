import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

interface Ward {
  id: string;
  nameKey: string;
  descriptionKey: string;
  image: string;
  attractions: string[];
}

@Component({
  selector: 'app-wards',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './wards.component.html',
  styleUrls: ['./wards.component.scss']
})
export class WardsComponent {
  wards: Ward[] = [
    {
      id: 'ben-nghe',
      nameKey: 'WARDS.BEN_NGHE.NAME',
      descriptionKey: 'WARDS.BEN_NGHE.DESC',
      image: 'assets/images/wards/ben-nghe.jpg',
      attractions: [
        'ATTRACTIONS.BITEXCO_TOWER',
        'ATTRACTIONS.NGUYEN_HUE',
        'ATTRACTIONS.SAIGON_RIVER'
      ]
    },
    {
      id: 'ben-thanh',
      nameKey: 'WARDS.BEN_THANH.NAME',
      descriptionKey: 'WARDS.BEN_THANH.DESC',
      image: 'assets/images/wards/ben-thanh.jpg',
      attractions: [
        'ATTRACTIONS.BEN_THANH_MARKET',
        'ATTRACTIONS.SEPTEMBER_23_PARK',
        'ATTRACTIONS.TAX_CENTER'
      ]
    },
    {
      id: 'da-kao',
      nameKey: 'WARDS.DA_KAO.NAME',
      descriptionKey: 'WARDS.DA_KAO.DESC',
      image: 'assets/images/wards/da-kao.jpg',
      attractions: [
        'ATTRACTIONS.JADE_PAGODA',
        'ATTRACTIONS.REVOLUTIONARY_MUSEUM',
        'ATTRACTIONS.ANTIQUE_STREET'
      ]
    }
  ];
} 