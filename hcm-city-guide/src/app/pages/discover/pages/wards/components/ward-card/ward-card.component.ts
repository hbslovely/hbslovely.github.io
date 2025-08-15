import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, Router } from '@angular/router';
import { Ward } from '@core/services/wards.service';

type FeatureKey = keyof typeof FEATURE_ICONS;

const FEATURE_ICONS = {
  // Historic and Cultural
  'FEATURES.HISTORIC_SITE': { icon: 'fa-landmark', color: '#d4af37' },
  'FEATURES.CULTURAL_HERITAGE': { icon: 'fa-theater-masks', color: '#8b4513' },
  'FEATURES.DI_TICH_LICH_SU': { icon: 'fa-landmark', color: '#d4af37' },
  'FEATURES.DI_SAN_VAN_HOA': { icon: 'fa-theater-masks', color: '#8b4513' },

  // Commercial and Markets
  'FEATURES.COMMERCIAL_HUB': { icon: 'fa-store', color: '#4169e1' },
  'FEATURES.TRADITIONAL_MARKET': { icon: 'fa-shopping-basket', color: '#ff4500' },
  'FEATURES.TRUNG_TAM_THUONG_MAI': { icon: 'fa-store', color: '#4169e1' },
  'FEATURES.CHO_TRUYEN_THONG': { icon: 'fa-shopping-basket', color: '#ff4500' },

  // Residential and Community
  'FEATURES.RESIDENTIAL_AREA': { icon: 'fa-home', color: '#6b8e23' },
  'FEATURES.COMMUNITY_CENTER': { icon: 'fa-users', color: '#9370db' },
  'FEATURES.KHU_DAN_CU': { icon: 'fa-home', color: '#6b8e23' },
  'FEATURES.TRUNG_TAM_CONG_DONG': { icon: 'fa-users', color: '#9370db' },

  // Industrial and Development
  'FEATURES.INDUSTRIAL_ZONE': { icon: 'fa-industry', color: '#696969' },
  'FEATURES.MODERN_DEVELOPMENT': { icon: 'fa-city', color: '#4682b4' },
  'FEATURES.KHU_CONG_NGHIEP': { icon: 'fa-industry', color: '#696969' },
  'FEATURES.PHAT_TRIEN_HIEN_DAI': { icon: 'fa-city', color: '#4682b4' },

  // Tourism and Recreation
  'FEATURES.TOURIST_ATTRACTION': { icon: 'fa-camera', color: '#ff69b4' },
  'FEATURES.WATERFRONT': { icon: 'fa-water', color: '#00bfff' },
  'FEATURES.DIEM_DU_LICH': { icon: 'fa-camera', color: '#ff69b4' },
  'FEATURES.VEN_SONG': { icon: 'fa-water', color: '#00bfff' },

  // Nature and Environment
  'FEATURES.GREEN_SPACE': { icon: 'fa-tree', color: '#228b22' },
  'FEATURES.NATIONAL_PARK': { icon: 'fa-mountain', color: '#2e8b57' },
  'FEATURES.KHONG_GIAN_XANH': { icon: 'fa-tree', color: '#228b22' },
  'FEATURES.VUON_QUOC_GIA': { icon: 'fa-mountain', color: '#2e8b57' },

  // Education and Culture
  'FEATURES.EDUCATION_HUB': { icon: 'fa-graduation-cap', color: '#800080' },
  'FEATURES.CULTURAL_CENTER': { icon: 'fa-palette', color: '#da70d6' },
  'FEATURES.TRUNG_TAM_GIAO_DUC': { icon: 'fa-graduation-cap', color: '#800080' },
  'FEATURES.TRUNG_TAM_VAN_HOA': { icon: 'fa-palette', color: '#da70d6' },

  // Agriculture and Rural
  'FEATURES.AGRICULTURAL_HERITAGE': { icon: 'fa-tractor', color: '#8b4513' },
  'FEATURES.TRADITIONAL_FARMING': { icon: 'fa-seedling', color: '#556b2f' },
  'FEATURES.DI_SAN_NONG_NGHIEP': { icon: 'fa-tractor', color: '#8b4513' },
  'FEATURES.NONG_NGHIEP_TRUYEN_THONG': { icon: 'fa-seedling', color: '#556b2f' },

  // Marine and Fishing
  'FEATURES.MARINE_CONSERVATION': { icon: 'fa-fish', color: '#00ced1' },
  'FEATURES.FISHING_INDUSTRY': { icon: 'fa-ship', color: '#191970' },
  'FEATURES.BAO_TON_BIEN': { icon: 'fa-fish', color: '#00ced1' },
  'FEATURES.NGANH_DANH_BAT': { icon: 'fa-ship', color: '#191970' },

  // Community and Rural
  'FEATURES.RURAL_COMMUNITY': { icon: 'fa-house-user', color: '#cd853f' },
  'FEATURES.ENVIRONMENTAL_CONSERVATION': { icon: 'fa-leaf', color: '#32cd32' },
  'FEATURES.CONG_DONG_NONG_THON': { icon: 'fa-house-user', color: '#cd853f' },
  'FEATURES.BAO_TON_MOI_TRUONG': { icon: 'fa-leaf', color: '#32cd32' }
} as const;

@Component({
  selector: 'app-ward-card',
  templateUrl: './ward-card.component.html',
  styleUrls: ['./ward-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink
  ]
})
export class WardCardComponent {
  @Input() ward!: Ward;
  isHovered = false;

  constructor(private router: Router) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }

  onBackClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/discover']);
  }

  getFeatureIcon(feature: string): string {
    return (FEATURE_ICONS[feature as FeatureKey]?.icon || 'fa-star') as string;
  }

  getFeatureColor(feature: string): string {
    return (FEATURE_ICONS[feature as FeatureKey]?.color || '#ffd700') as string;
  }

  getFeatureClass(feature: string): string {
    const baseClass = 'feature';
    const type = feature.split('.')[1]?.toLowerCase() || '';
    return `${baseClass} ${type}`;
  }

  getImageFallback(event: any) {
    event.target.src = 'assets/images/wards/default.jpg';
  }
}
