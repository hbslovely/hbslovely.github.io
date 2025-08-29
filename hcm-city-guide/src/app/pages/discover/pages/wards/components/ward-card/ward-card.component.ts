import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

interface Ward {
  id: string;
  name: string;
  type?: string;
  image?: string;
  features?: string[];
}

@Component({
  selector: 'app-ward-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, CardModule, ButtonModule, RouterModule],
  templateUrl: './ward-card.component.html',
  styleUrls: ['./ward-card.component.scss']
})
export class WardCardComponent {
  @Input() ward!: Ward;
  isHovered = false;

  private readonly featureIcons: { [key: string]: { icon: string; color: string } } = {
    'FEATURES.HISTORIC_SITE': { icon: 'fa-landmark', color: '#d4af37' },
    'FEATURES.CULTURAL_HERITAGE': { icon: 'fa-monument', color: '#8b4513' },
    'FEATURES.COMMERCIAL_HUB': { icon: 'fa-store', color: '#4169e1' },
    'FEATURES.RESIDENTIAL_AREA': { icon: 'fa-home', color: '#808080' },
    'FEATURES.INDUSTRIAL_ZONE': { icon: 'fa-industry', color: '#696969' },
    'FEATURES.TOURIST_ATTRACTION': { icon: 'fa-camera', color: '#ff69b4' },
    'FEATURES.WATERFRONT': { icon: 'fa-water', color: '#4682b4' },
    'FEATURES.GREEN_SPACE': { icon: 'fa-tree', color: '#228b22' },
    'FEATURES.EDUCATION_HUB': { icon: 'fa-graduation-cap', color: '#9370db' },
    'FEATURES.TRADITIONAL_MARKET': { icon: 'fa-shopping-basket', color: '#cd853f' },
    'FEATURES.NATIONAL_PARK': { icon: 'fa-mountain', color: '#2e8b57' },
    'FEATURES.MODERN_DEVELOPMENT': { icon: 'fa-city', color: '#4682b4' },
    'FEATURES.ENVIRONMENTAL_CONSERVATION': { icon: 'fa-leaf', color: '#32cd32' },
    'FEATURES.COMMUNITY_CENTER': { icon: 'fa-users', color: '#ff8c00' },
    'FEATURES.PORT_FACILITY': { icon: 'fa-ship', color: '#483d8b' },
    'FEATURES.LOGISTICS_HUB': { icon: 'fa-truck', color: '#8b4513' },
    'FEATURES.TRANSPORT_HUB': { icon: 'fa-bus', color: '#4169e1' },
    'FEATURES.RELIGIOUS_SITE': { icon: 'fa-place-of-worship', color: '#800080' },
    'FEATURES.MARITIME_TRADE': { icon: 'fa-anchor', color: '#000080' },
    'FEATURES.FISHING_INDUSTRY': { icon: 'fa-fish', color: '#4682b4' },
    'FEATURES.TRADITIONAL_CRAFT': { icon: 'fa-tools', color: '#8b4513' },
    'FEATURES.ARCHITECTURAL_SIGNIFICANCE': { icon: 'fa-archway', color: '#daa520' },
    'FEATURES.PARK_AND_RECREATION': { icon: 'fa-umbrella-beach', color: '#3cb371' },
    'FEATURES.SPORTS_FACILITY': { icon: 'fa-futbol', color: '#ff4500' },
    'FEATURES.RESEARCH_CENTER': { icon: 'fa-microscope', color: '#9370db' },
    'FEATURES.TECH_ZONE': { icon: 'fa-microchip', color: '#4169e1' },
    'FEATURES.MIXED_USE': { icon: 'fa-building', color: '#696969' },
    'FEATURES.ENTERTAINMENT_ZONE': { icon: 'fa-theater-masks', color: '#ff69b4' },
    'FEATURES.SHOPPING_DISTRICT': { icon: 'fa-shopping-bag', color: '#ff1493' },
    'FEATURES.COLONIAL_ARCHITECTURE': { icon: 'fa-landmark', color: '#cd853f' },
    'FEATURES.NATURAL_HERITAGE': { icon: 'fa-mountain', color: '#228b22' },
    'FEATURES.AGRICULTURAL_HERITAGE': { icon: 'fa-tractor', color: '#8b4513' },
    'FEATURES.RURAL_COMMUNITY': { icon: 'fa-home', color: '#cd853f' },
    'FEATURES.COASTAL_AREA': { icon: 'fa-umbrella-beach', color: '#00ced1' },
    'FEATURES.MARINE_CONSERVATION': { icon: 'fa-fish', color: '#00ced1' }
  };

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }

  getFeatureIcon(feature: string): string {
    return this.featureIcons[feature]?.icon || 'fa-star';
  }

  getFeatureColor(feature: string): string {
    return this.featureIcons[feature]?.color || '#808080';
  }

  getImageFallback(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/wards/default.jpg';
  }

  onBackClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    window.history.back();
  }
}
