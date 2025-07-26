import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FunFactsCardComponent } from '../../shared/components/fun-facts-card/fun-facts-card.component';

@Component({
  selector: 'app-thong-tin-chong',
  standalone: true,
  imports: [ CommonModule, FunFactsCardComponent ],
  templateUrl: './thong-tin-chong.component.html',
  styleUrls: [ './thong-tin-chong.component.scss' ],
  host: {
    'class': 'husband-profile'
  }
})
export class ThongTinChongComponent implements OnInit {
  husbandData: any = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loadHusbandData();
  }

  private loadHusbandData() {
    this.http.get<any>('assets/data/husband-data.json').subscribe({
      next: (data) => {
        this.husbandData = data;
      },
      error: (error) => {
        console.error('Error loading husband data:', error);
      }
    });
  }

  getTraitPercentage(description: string) {
    const match = description.match(/(\d+)([%.]?\d*)/);
    if (match) {
      const value = parseFloat(match[0]);
      return `${ value }%`;
    }
    return '50%';
  }

  getTraitValue(description: string) {
    const match = description.match(/(\d+)([%.]?\d*)/);
    if (match) {
      return match[0];
    }
    return '';
  }

  getTraitDescription(description: string) {
    return description.replace(/\d+([%.]?\d*)\s*-\s*/, '');
  }
}
