import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thong-tin-chong',
  imports: [CommonModule],
  templateUrl: './thong-tin-chong.component.html',
  styleUrl: './thong-tin-chong.component.scss'
})
export class ThongTinChongComponent {
  
  husbandInfo = {
    name: 'Ba Heo Nhỏ',
    title: 'Người chồng tuyệt vời 💖',
    description: 'Ba Heo Nhỏ là một anh chàng IT đáng yêu với trái tim nhân hậu và luôn biết cách chăm sóc gia đình. Với nụ cười ấm áp và tính cách hài hước, anh luôn mang lại niềm vui cho mọi người xung quanh. Anh đam mê công nghệ nhưng điều anh yêu thích nhất là được đi du lịch cùng vợ yêu.',
    loveMessage: 'Em yêu anh Ba Heo Nhỏ không chỉ vì sự chăm sóc của anh, mà vì chính trái tim ấm áp của anh. Anh là người bạn đời hoàn hảo mà em luôn mơ ước. Cảm ơn anh vì đã luôn ở bên em và cùng em khám phá thế giới.'
  };

  husbandBasicInfo = [
    { icon: 'pi pi-calendar', label: 'Ngày sinh', value: '15/08/1990' },
    { icon: 'pi pi-map-marker', label: 'Nơi sinh', value: 'TP. Hồ Chí Minh, Việt Nam' },
    { icon: 'pi pi-briefcase', label: 'Nghề nghiệp', value: 'IT Specialist' },
    { icon: 'pi pi-home', label: 'Sinh sống', value: 'TP. Hồ Chí Minh' },
    { icon: 'pi pi-heart', label: 'Tình trạng', value: 'Đã có vợ yêu 💕' }
  ];

  husbandTraits = [
    { icon: 'pi pi-heart-fill', title: 'Tình cảm', description: 'Luôn quan tâm và chăm sóc' },
    { icon: 'pi pi-users', title: 'Hòa đồng', description: 'Dễ gần, thân thiện với mọi người' },
    { icon: 'pi pi-lightbulb', title: 'Thông minh', description: 'Giải quyết vấn đề một cách sáng tạo' },
    { icon: 'pi pi-smile', title: 'Hài hước', description: 'Luôn biết cách làm em cười' },
    { icon: 'pi pi-shield', title: 'Đáng tin cậy', description: 'Là chỗ dựa vững chắc cho gia đình' },
    { icon: 'pi pi-star', title: 'Tài năng', description: 'Giỏi nhiều lĩnh vực khác nhau' }
  ];

  husbandHobbies = [
    { 
      icon: 'pi pi-car', 
      name: 'Du lịch', 
      description: 'Đam mê khám phá những địa điểm mới cùng vợ yêu' 
    },
    { 
      icon: 'pi pi-heart-fill', 
      name: 'Yêu vợ', 
      description: 'Sở thích lớn nhất là chăm sóc và yêu thương vợ' 
    },
    { 
      icon: 'pi pi-desktop', 
      name: 'Công nghệ', 
      description: 'Làm việc với IT và tìm hiểu công nghệ mới' 
    },
    { 
      icon: 'pi pi-camera', 
      name: 'Chụp ảnh', 
      description: 'Ghi lại những khoảnh khắc đẹp trong chuyến du lịch' 
    },
    { 
      icon: 'pi pi-map', 
      name: 'Khám phá', 
      description: 'Tìm hiểu văn hóa và ẩm thực các vùng miền' 
    },
    { 
      icon: 'pi pi-home', 
      name: 'Gia đình', 
      description: 'Dành thời gian bên vợ và xây dựng tổ ấm' 
    }
  ];

  husbandPhotos = [
    { 
      url: 'assets/images/phat/phat-1.jpg', 
      caption: 'Ba Heo Nhỏ tại nơi làm việc' 
    },
    { 
      url: 'assets/images/phat/phat-2.jpg', 
      caption: 'Anh trong một chuyến du lịch' 
    },
    { 
      url: 'assets/images/phat/phat-3.jpg', 
      caption: 'Ba Heo Nhỏ và đam mê công nghệ' 
    },
    { 
      url: 'assets/images/phat/phat-4.jpg', 
      caption: 'Anh thư giãn trong cuối tuần' 
    },
    { 
      url: 'assets/images/phat/phat-5.jpg', 
      caption: 'Ba Heo Nhỏ khám phá địa điểm mới' 
    },
    { 
      url: 'assets/images/phat/phat-6.jpg', 
      caption: 'Anh trong khoảnh khắc hạnh phúc' 
    }
  ];

  husbandFunFacts = [
    { 
      title: 'Món ăn yêu thích', 
      description: 'Phở bò và bánh mì - những món ăn Việt Nam truyền thống' 
    },
    { 
      title: 'Thói quen buổi sáng', 
      description: 'Luôn dậy sớm để pha cà phê và chuẩn bị bữa sáng cho em' 
    },
    { 
      title: 'Bài hát yêu thích', 
      description: 'All of Me - Ed Sheeran (bài hát mà anh hay hát cho em nghe)' 
    },
    { 
      title: 'Ước mơ lớn nhất', 
      description: 'Xây dựng một gia đình hạnh phúc và du lịch khắp thế giới cùng em' 
    },
    { 
      title: 'Điều anh sợ nhất', 
      description: 'Mất em và không thể bảo vệ được những người anh yêu thương' 
    },
    { 
      title: 'Tài năng đặc biệt', 
      description: 'Có thể sửa được hầu hết mọi thứ hỏng trong nhà' 
    }
  ];
}
