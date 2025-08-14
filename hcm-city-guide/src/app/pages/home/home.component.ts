import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    CarouselModule,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  highlights = [
    {
      titleKey: 'WARDS.BEN_NGHE.NAME',
      descriptionKey: 'WARDS.BEN_NGHE.HIGHLIGHT_DESC',
      image: 'assets/images/district-1.jpg'
    },
    {
      titleKey: 'HIGHLIGHTS.CU_CHI.TITLE',
      descriptionKey: 'HIGHLIGHTS.CU_CHI.DESC',
      image: 'assets/images/cu-chi-tunnels.jpg'
    },
    {
      titleKey: 'HIGHLIGHTS.BEN_THANH.TITLE',
      descriptionKey: 'HIGHLIGHTS.BEN_THANH.DESC',
      image: 'assets/images/ben-thanh-market.jpg'
    }
  ];

  areas = [
    {
      nameKey: 'WARDS.BEN_NGHE.NAME',
      descriptionKey: 'WARDS.BEN_NGHE.DESC',
      attractions: [
        'ATTRACTIONS.SAIGON_RIVER',
        'ATTRACTIONS.BITEXCO_TOWER',
        'ATTRACTIONS.NGUYEN_HUE'
      ]
    },
    {
      nameKey: 'WARDS.BEN_THANH.NAME',
      descriptionKey: 'WARDS.BEN_THANH.DESC',
      attractions: [
        'ATTRACTIONS.BEN_THANH_MARKET',
        'ATTRACTIONS.SEPTEMBER_23_PARK',
        'ATTRACTIONS.TAX_CENTER'
      ]
    },
    {
      nameKey: 'WARDS.DA_KAO.NAME',
      descriptionKey: 'WARDS.DA_KAO.DESC',
      attractions: [
        'ATTRACTIONS.JADE_PAGODA',
        'ATTRACTIONS.REVOLUTIONARY_MUSEUM',
        'ATTRACTIONS.ANTIQUE_STREET'
      ]
    }
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    // Subscribe to language changes if needed
    this.translate.onLangChange.subscribe(() => {
      // Handle any language change specific logic here
    });
  }
}
