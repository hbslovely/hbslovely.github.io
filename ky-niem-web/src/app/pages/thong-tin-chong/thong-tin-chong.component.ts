import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-thong-tin-chong',
  imports: [CommonModule],
  templateUrl: './thong-tin-chong.component.html',
  styleUrl: './thong-tin-chong.component.scss'
})
export class ThongTinChongComponent implements OnInit {
  
  husbandInfo: any = {};
  husbandBasicInfo: any[] = [];
  husbandTraits: any[] = [];
  husbandHobbies: any[] = [];
  husbandPhotos: any[] = [];
  husbandFunFacts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadHusbandData();
  }

  private loadHusbandData() {
    this.http.get<any>('assets/data/husband-data.json').subscribe({
      next: (data) => {
        this.husbandInfo = data.husbandInfo;
        this.husbandBasicInfo = data.husbandBasicInfo;
        this.husbandTraits = data.husbandTraits;
        this.husbandHobbies = data.husbandHobbies;
        this.husbandPhotos = data.husbandPhotos;
        this.husbandFunFacts = data.husbandFunFacts;
      },
      error: (error) => {
        console.error('Error loading husband data:', error);
        // Fallback data in case of error
        this.setFallbackData();
      }
    });
  }

  private setFallbackData() {
    this.husbandInfo = {
      name: 'Ba Heo Nhỏ',
      title: 'Người chồng tuyệt vời 💖',
      description: 'Ba Heo Nhỏ là một anh chàng IT đáng yêu với trái tim nhân hậu và luôn biết cách chăm sóc gia đình.',
      loveMessage: 'Em yêu anh Ba Heo Nhỏ không chỉ vì sự chăm sóc của anh, mà vì chính trái tim ấm áp của anh.'
    };
    
    this.husbandBasicInfo = [
      { icon: 'pi pi-calendar', label: 'Ngày sinh', value: '10/10/1992' },
      { icon: 'pi pi-star', label: 'Cung hoàng đạo', value: 'Thiên Bình ♎' },
      { icon: 'pi pi-briefcase', label: 'Nghề nghiệp', value: 'IT Specialist' }
    ];
  }
}
