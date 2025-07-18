import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProfileHeaderComponent } from '../../shared/components/profile-header/profile-header.component';

@Component({
  selector: 'app-thong-tin-chong',
  standalone: true,
  imports: [CommonModule, ProfileHeaderComponent],
  templateUrl: './thong-tin-chong.component.html',
  styleUrls: ['./thong-tin-chong.component.scss']
})
export class ThongTinChongComponent implements OnInit {
  husbandData: any = {};
  
  // Basic info for profile header
  profileInfo = {
    'Năm sinh': '199x',
    'Cung hoàng đạo': 'Thiên Bình ♎',
    'Nơi sinh': 'TP. Hồ Chí Minh',
    'Nghề nghiệp': 'Developer'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadHusbandData();
  }

  private loadHusbandData() {
    this.http.get<any>('assets/data/husband-data.json').subscribe({
      next: (data) => {
        this.husbandData = data;
        // Update profile info from loaded data
        if (data.personalInfo) {
          this.profileInfo = data.personalInfo.reduce((acc: any, item: any) => {
            acc[item.label] = item.value;
            return acc;
          }, {});
        }
      },
      error: (error) => {
        console.error('Error loading husband data:', error);
      }
    });
  }
}
