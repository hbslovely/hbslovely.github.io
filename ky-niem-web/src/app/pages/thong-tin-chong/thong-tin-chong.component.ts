import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface HusbandData {
  basicInfo: {
    name: string;
    title: string;
    description: string;
    loveMessage: string;
    tags: string[];
    stats: Array<{
      icon: string;
      label: string;
      value: string;
    }>;
  };
  traits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  hobbies: Array<{
    icon: string;
    name: string;
    description: string;
  }>;
  professionalSkills: string[];
  softSkills: string[];
  funFacts: Array<{
    title: string;
    description: string;
  }>;
}

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
