import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface WifeData {
  wifeInfo: {
    name: string;
    title: string;
    description: string;
    loveMessage: string;
    tags: string[];
  };
  wifeBasicInfo: Array<{
    icon: string;
    label: string;
    value: string;
  }>;
  wifeTraits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  wifeHobbies: Array<{
    icon: string;
    name: string;
    description: string;
  }>;
  wifePhotos: Array<{
    url: string;
    caption: string;
  }>;
  wifeFunFacts: Array<{
    title: string;
    description: string;
  }>;
  wifeBeautyStyle: {
    description: string;
    categories: Array<{
      title: string;
      description: string;
    }>;
  };
  wifeProfessionalSkills: Array<{
    category: string;
    skills: string[];
  }>;
}

@Component({
  selector: 'app-thong-tin-vo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thong-tin-vo.component.html',
  styleUrls: ['./thong-tin-vo.component.scss']
})
export class ThongTinVoComponent implements OnInit {
  wifeData: Partial<WifeData> = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadWifeData();
  }

  private loadWifeData() {
    this.http.get<WifeData>('assets/data/wife-data.json').subscribe({
      next: (data) => {
        this.wifeData = data;
      },
      error: (error) => {
        console.error('Error loading wife data:', error);
      }
    });
  }

  getRandomEmoji(): string {
    const emojis = ['🌸', '🎀', '💝', '💖', '✨', '🌟', '🦋', '🌺', '🎵', '💫'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }
}
