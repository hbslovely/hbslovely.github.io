import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface FunFact {
  title: string;
  description: string;
  image: string;
}

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
  wifeBeautyStyle: any = {};
  wifeProfessionalSkills: any[] = [];
  wifeFunFacts: FunFact[] = [
    {
      title: 'Nụ Cười Tỏa Nắng',
      description: 'Nụ cười của em luôn làm anh cảm thấy ấm áp và hạnh phúc, như ánh nắng ban mai sưởi ấm trái tim anh.',
      image: 'assets/images/gallery/nu-cuoi.png'
    },
    {
      title: 'Vòng Tay Yêu Thương',
      description: 'Mỗi cái ôm của em đều khiến anh cảm thấy được che chở và yêu thương vô điều kiện.',
      image: 'assets/images/gallery/cai-om.png'
    },
    {
      title: 'Người Bạn Đồng Hành',
      description: 'Em luôn là người đồng hành tuyệt vời nhất trong mọi chuyến đi, mọi khoảnh khắc của cuộc sống.',
      image: 'assets/images/gallery/chuyen-di.png'
    },
    {
      title: 'Giọt Nước Mắt Hạnh Phúc',
      description: 'Những giọt nước mắt hạnh phúc của em là khoảnh khắc đẹp nhất, là minh chứng cho tình yêu chúng ta.',
      image: 'assets/images/gallery/giot-nuoc-mat-hanh-phuc.png'
    },
    {
      title: 'Ngày Bên Nhau',
      description: 'Mỗi ngày bên em là một ngày tràn ngập niềm vui và hạnh phúc, là động lực để anh cố gắng hơn.',
      image: 'assets/images/gallery/ngay-ben-nhau.png'
    },
    {
      title: 'Sự An Ủi',
      description: 'Em luôn biết cách an ủi và động viên anh trong những lúc khó khăn, là điểm tựa vững chắc của anh.',
      image: 'assets/images/gallery/su-an-ui.png'
    }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadWifeData();
  }

  getFactIcon(index: number): string {
    const icons = [
      'pi pi-heart-fill text-pink-500',      // Đồ uống yêu thích
      'pi pi-star-fill text-pink-500',       // Ước mơ tương lai
      'pi pi-bolt text-pink-500',            // Điểm mạnh
      'pi pi-exclamation-circle text-pink-500', // Điểm yếu
      'pi pi-check-circle text-pink-500',    // Sở trường
      'pi pi-gift text-pink-500'             // Điều thú vị
    ];
    return icons[index] || 'pi pi-heart-fill text-pink-500';
  }

  private loadWifeData() {
    this.http.get<any>('assets/data/wife-data.json').subscribe({
      next: (data) => {
        this.wifeInfo = data.wifeInfo;
        this.wifeBasicInfo = data.wifeBasicInfo;
        this.wifeTraits = data.wifeTraits;
        this.wifeHobbies = data.wifeHobbies;
        this.wifePhotos = data.wifePhotos;
        this.wifeBeautyStyle = data.wifeBeautyStyle;
        this.wifeProfessionalSkills = data.wifeProfessionalSkills;
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
      { icon: 'pi pi-calendar', label: 'Năm sinh', value: '1994' },
      { icon: 'pi pi-star', label: 'Cung hoàng đạo', value: 'Ma Kết ♑' },
      { icon: 'pi pi-briefcase', label: 'Nghề nghiệp', value: 'Kế toán viên' }
    ];

    this.wifeBeautyStyle = {
      description: 'Phong cách của Heo Bỉm Sửa là sự kết hợp hoàn hảo giữa vẻ đẹp tự nhiên và sự tinh tế trong việc chăm sóc bản thân.',
      categories: [
        { title: 'Trang điểm', description: 'Theo đuổi phong cách trang điểm tự nhiên, nhẹ nhàng' },
        { title: 'Thời trang', description: 'Yêu thích những items basic, dễ phối đồ và thanh lịch' },
        { title: 'Chăm sóc', description: 'Chú trọng skincare, tập yoga và giữ gìn sức khỏe' }
      ]
    };

    this.wifeProfessionalSkills = [
      { category: 'Kỹ năng chuyên môn', skills: ['Kế toán tổng hợp', 'Phân tích tài chính', 'Lập trình web'] },
      { category: 'Kỹ năng mềm', skills: ['Giao tiếp hiệu quả', 'Tổ chức công việc', 'Làm việc nhóm'] }
    ];
  }
}
