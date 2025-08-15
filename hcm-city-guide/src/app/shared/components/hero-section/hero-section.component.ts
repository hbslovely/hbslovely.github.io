import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TooltipModule } from 'primeng/tooltip';

interface SearchSuggestion {
  name: string;
  category: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    AutoCompleteModule,
    TooltipModule
  ],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() buttonText = '';
  @Input() buttonLink = '';
  @Input() backgroundImage = 'assets/images/ben-thanh-market.jpg';
  @Input() showSearch = true;
  @Input() overlay = true;

  searchQuery = '';
  suggestions: SearchSuggestion[] = [];
  filteredSuggestions: SearchSuggestion[] = [];

  readonly allSuggestions: SearchSuggestion[] = [
    { name: 'Ben Thanh Market', category: 'ATTRACTIONS', icon: 'pi pi-map-marker', route: '/discover/attractions/ben-thanh-market' },
    { name: 'Cu Chi Tunnels', category: 'ATTRACTIONS', icon: 'pi pi-map-marker', route: '/discover/attractions/cu-chi-tunnels' },
    { name: 'War Remnants Museum', category: 'CULTURE', icon: 'pi pi-compass', route: '/discover/culture/war-remnants-museum' },
    { name: 'Saigon Street Food', category: 'FOOD', icon: 'pi pi-heart', route: '/discover/food/street-food' },
    { name: 'District 1', category: 'DISTRICTS', icon: 'pi pi-map', route: '/discover/districts/district-1' },
    { name: 'Pham Ngu Lao Street', category: 'NIGHTLIFE', icon: 'pi pi-star', route: '/discover/nightlife/pham-ngu-lao' },
    { name: 'Saigon Notre-Dame Cathedral', category: 'CULTURE', icon: 'pi pi-compass', route: '/discover/culture/notre-dame-cathedral' },
    { name: 'Bitexco Financial Tower', category: 'ATTRACTIONS', icon: 'pi pi-map-marker', route: '/discover/attractions/bitexco-tower' }
  ];

  onSearch(event: { query: string }) {
    const query = event.query.toLowerCase();
    this.filteredSuggestions = this.allSuggestions.filter(suggestion =>
      suggestion.name.toLowerCase().includes(query) ||
      suggestion.category.toLowerCase().includes(query)
    );
  }

  onSelect(suggestion: SearchSuggestion) {
    // Router navigation will be handled by the template
    this.searchQuery = '';
  }

  getBackgroundStyle(): { [key: string]: string } {
    const overlayColor = this.overlay ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)';
    return {
      'background-image': `linear-gradient(${overlayColor}, ${overlayColor}), url('${this.backgroundImage}')`,
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat'
    };
  }
} 