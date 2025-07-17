import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-thong-tin-vo',
  imports: [CommonModule],
  templateUrl: './thong-tin-vo.component.html',
  styleUrl: './thong-tin-vo.component.scss'
})
export class ThongTinVoComponent implements OnInit {
  
  wifeInfo: any = {};
  wifeBasicInfo: any[] = [];
  wifeTraits: any[] = [];
  wifeHobbies: any[] = [];
  wifePhotos: any[] = [];
  wifeBeautyStyles: any[] = [];
  wifeFunFacts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadWifeData();
  }

  private loadWifeData() {
    this.http.get<any>('assets/data/wife-data.json').subscribe({
      next: (data) => {
        this.wifeInfo = data.wifeInfo;
        this.wifeBasicInfo = data.wifeBasicInfo;
        this.wifeTraits = data.wifeTraits;
        this.wifeHobbies = data.wifeHobbies;
        this.wifePhotos = data.wifePhotos;
        this.wifeBeautyStyles = data.wifeBeautyStyles;
        this.wifeFunFacts = data.wifeFunFacts;
      },
      error: (error) => {
        console.error('Error loading wife data:', error);
        // Fallback data in case of error
        this.setFallbackData();
      }
    });
  }

  private setFallbackData() {
    this.wifeInfo = {
      name: 'Heo Bỉm Sửa',
      title: 'Người vợ tuyệt vời 💖',
      description: 'Heo Bỉm Sửa là một cô gái dễ thương và tài năng với trái tim nhân ái và luôn biết cách chăm sóc gia đình.',
      loveMessage: 'Anh yêu em Heo Bỉm Sửa không chỉ vì vẻ đẹp bên ngoài, mà vì tấm lòng nhân ái và sự thông minh của em.'
    };
    
    this.wifeBasicInfo = [
      { icon: 'pi pi-calendar', label: 'Ngày sinh', value: '15/01/1994' },
      { icon: 'pi pi-star', label: 'Cung hoàng đạo', value: 'Ma Kết ♑' },
      { icon: 'pi pi-briefcase', label: 'Nghề nghiệp', value: 'Kế toán viên' }
    ];
  }
}
