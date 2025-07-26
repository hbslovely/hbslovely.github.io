import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HusbandData } from '../../shared/models';

@Component({
  selector: 'app-thong-tin-chong',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thong-tin-chong.component.html',
  styleUrls: ['./thong-tin-chong.component.scss']
})
export class ThongTinChongComponent implements OnInit {
  husbandData: Partial<HusbandData> = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadHusbandData();
  }

  private loadHusbandData() {
    this.http.get<HusbandData>('assets/data/husband-data.json').subscribe({
      next: (data) => {
        this.husbandData = data;
      },
      error: (error) => {
        console.error('Error loading husband data:', error);
      }
    });
  }

  getTraitDescription(description: string): string {
    return description.replace(/\d+([%.]?\d*)\s*-\s*/, '');
  }
}
