import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProfileHeaderComponent } from '../../shared/components/profile-header/profile-header.component';

@Component({
  selector: 'app-thong-tin-vo',
  standalone: true,
  imports: [CommonModule, ProfileHeaderComponent],
  templateUrl: './thong-tin-vo.component.html',
  styleUrls: ['./thong-tin-vo.component.scss']
})
export class ThongTinVoComponent implements OnInit {
  wifeData: any = {};

  // Basic info for profile header
  profileInfo = {
    'Năm sinh': '199x',
    'Cung hoàng đạo': 'Ma Kết ♑',
    'Nghề nghiệp': 'Kế toán viên',
    'Tình trạng': 'Đã có chồng 💕'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadWifeData();
  }

  private loadWifeData() {
    this.http.get<any>('assets/data/wife-data.json').subscribe({
      next: (data) => {
        this.wifeData = data;
        // Update profile info from loaded data
        if (data.wifeBasicInfo) {
          this.profileInfo = data.wifeBasicInfo.reduce((acc: any, item: any) => {
            acc[item.label] = item.value;
            return acc;
          }, {});
        }
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

  getTraitPercentage(description: string): string {
    const match = description.match(/(\d+)([%.]?\d*)/);
    if (match) {
      const value = parseFloat(match[0]);
      return `${value}%`;
    }
    return '50%';
  }

  getTraitValue(description: string): string {
    const match = description.match(/(\d+)([%.]?\d*)/);
    if (match) {
      return match[0];
    }
    return '';
  }

  getTraitDescription(description: string): string {
    return description.replace(/\d+([%.]?\d*)\s*-\s*/, '');
  }
}
