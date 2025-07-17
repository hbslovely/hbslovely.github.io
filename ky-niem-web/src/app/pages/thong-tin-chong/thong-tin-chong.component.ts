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
        this.husbandFunFacts = data.husbandFunFacts;
        this.husbandSkills = data.husbandSkills || [];
        this.husbandGoals = data.husbandGoals || [];
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
      loveMessage: 'Em yêu anh Ba Heo Nhỏ không chỉ vì sự chăm sóc của anh, mà vì chính trái tim ấm áp của anh.',
      birthDate: '1992-10-10'
    };
    
    this.husbandBasicInfo = [
      { icon: 'pi pi-calendar', label: 'Ngày sinh', value: '10/10/1992' },
      { icon: 'pi pi-star', label: 'Cung hoàng đạo', value: 'Thiên Bình ♎' },
      { icon: 'pi pi-briefcase', label: 'Nghề nghiệp', value: 'IT Specialist' }
    ];

    this.husbandSkills = [
      'Angular', 'TypeScript', 'Node.js', 'React', 'Java', 'Spring Boot'
    ];

    this.husbandGoals = [
      {
        icon: 'pi pi-home',
        title: 'Xây Dựng Tổ Ấm',
        description: 'Tạo nên một mái ấm hạnh phúc cho gia đình nhỏ của chúng ta'
      },
      {
        icon: 'pi pi-chart-line',
        title: 'Phát Triển Sự Nghiệp',
        description: 'Không ngừng học hỏi và tiến bộ trong lĩnh vực công nghệ'
      },
      {
        icon: 'pi pi-globe',
        title: 'Khám Phá Thế Giới',
        description: 'Cùng em đi du lịch và trải nghiệm những điều mới mẻ'
      }
    ];

    this.husbandFunFacts = [
      {
        title: "Người Của Công Nghệ",
        description: "Luôn cập nhật những xu hướng công nghệ mới nhất và thích khám phá các công cụ, ứng dụng hiện đại."
      },
      {
        title: "Đầu Bếp Tại Gia",
        description: "Có thể nấu được nhiều món ăn ngon và đặc biệt thích sáng tạo công thức nấu ăn mới cho gia đình."
      },
      {
        title: "Người Yêu Thiên Nhiên",
        description: "Thích những chuyến đi khám phá thiên nhiên, leo núi và chụp ảnh phong cảnh đẹp."
      },
      {
        title: "Tâm Hồn Nghệ Sĩ",
        description: "Có khiếu thẩm mỹ tốt, thích thiết kế và sáng tạo những điều mới mẻ trong công việc và cuộc sống."
      },
      {
        title: "Người Chồng Chu Đáo",
        description: "Luôn nhớ và chuẩn bị những điều bất ngờ trong các dịp đặc biệt của gia đình."
      },
      {
        title: "Tính Cách Hài Hước",
        description: "Có khả năng kể chuyện vui và tạo tiếng cười cho mọi người xung quanh."
      },
      {
        title: "Người Ham Học Hỏi",
        description: "Luôn tìm tòi và học hỏi những điều mới, đặc biệt là các kỹ năng hữu ích cho gia đình."
      },
      {
        title: "Tâm Hồn Trẻ Thơ",
        description: "Vẫn giữ được sự hồn nhiên và tinh nghịch của tuổi trẻ dù đã trưởng thành."
      }
    ];
  }
}
