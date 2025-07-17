import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface FunFact {
  title: string;
  description: string;
  image: string;
}

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
  husbandFunFacts: FunFact[] = [
    {
      title: 'Nụ Cười Ấm Áp',
      description: 'Nụ cười của anh luôn mang đến cho em cảm giác bình yên và hạnh phúc, là nguồn năng lượng tích cực mỗi ngày.',
      image: 'assets/images/gallery/nu-cuoi.png'
    },
    {
      title: 'Vòng Tay Bảo Vệ',
      description: 'Vòng tay anh luôn là nơi em cảm thấy an toàn và được che chở nhất, là nơi em muốn ở mãi.',
      image: 'assets/images/gallery/cai-om.png'
    },
    {
      title: 'Người Dẫn Lối',
      description: 'Anh luôn là người dẫn lối cho em trong mọi chuyến đi, là người bạn đồng hành tuyệt vời nhất.',
      image: 'assets/images/gallery/chuyen-di.png'
    },
    {
      title: 'Khoảnh Khắc Xúc Động',
      description: 'Những giọt nước mắt hạnh phúc của anh là khoảnh khắc em thấy anh đáng yêu và chân thành nhất.',
      image: 'assets/images/gallery/giot-nuoc-mat-hanh-phuc.png'
    },
    {
      title: 'Ngày Bên Nhau',
      description: 'Mỗi ngày bên anh đều là một ngày tràn ngập tiếng cười và hạnh phúc, là động lực để em yêu đời hơn.',
      image: 'assets/images/gallery/ngay-ben-nhau.png'
    },
    {
      title: 'Sự Quan Tâm',
      description: 'Anh luôn biết cách quan tâm và chăm sóc em, là người luôn lắng nghe và thấu hiểu em nhất.',
      image: 'assets/images/gallery/su-an-ui.png'
    }
  ];
  husbandSkills: string[] = [];
  husbandGoals: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadHusbandData();
  }

  calculateAge(): number {
    const birthDate = new Date(this.husbandInfo.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  private loadHusbandData() {
    this.http.get<any>('assets/data/husband-data.json').subscribe({
      next: (data) => {
        this.husbandInfo = data.husbandInfo;
        this.husbandBasicInfo = data.husbandBasicInfo;
        this.husbandTraits = data.husbandTraits;
        this.husbandHobbies = data.husbandHobbies;
        this.husbandPhotos = data.husbandPhotos;
        this.husbandFunFacts = data.husbandFunFacts || [];
        this.husbandSkills = data.husbandSkills || [];
        this.husbandGoals = data.husbandGoals || [];
      },
      error: (error) => {
        console.error('Error loading husband data:', error);
      }
    });
  }
}
