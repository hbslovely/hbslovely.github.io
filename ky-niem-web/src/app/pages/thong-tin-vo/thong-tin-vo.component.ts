import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thong-tin-vo',
  imports: [CommonModule],
  templateUrl: './thong-tin-vo.component.html',
  styleUrl: './thong-tin-vo.component.scss'
})
export class ThongTinVoComponent {
  
  wifeInfo = {
    name: 'Heo Bỉm Sửa',
    title: 'Người vợ tuyệt vời 💖',
    description: 'Heo Bỉm Sửa là một cô gái dễ thương và tài năng với trái tim nhân ái và luôn biết cách chăm sóc gia đình. Với nụ cười rạng rỡ và tính cách dịu dàng, cô luôn mang lại ánh sáng cho mọi người xung quanh. Cô có tài năng trong lĩnh vực kế toán và điều cô yêu thích nhất là được đi du lịch cùng chồng.',
    loveMessage: 'Anh yêu em Heo Bỉm Sửa không chỉ vì vẻ đẹp bên ngoài, mà vì tấm lòng nhân ái và sự thông minh của em. Em là người phụ nữ hoàn hảo mà anh luôn mơ ước. Cảm ơn em vì đã luôn ở bên anh và cùng anh chinh phục mọi hành trình.'
  };

  wifeBasicInfo = [
    { icon: 'pi pi-calendar', label: 'Ngày sinh', value: '22/03/1992' },
    { icon: 'pi pi-map-marker', label: 'Nơi sinh', value: 'TP. Hồ Chí Minh, Việt Nam' },
    { icon: 'pi pi-briefcase', label: 'Nghề nghiệp', value: 'Kế toán viên' },
    { icon: 'pi pi-home', label: 'Sinh sống', value: 'TP. Hồ Chí Minh' },
    { icon: 'pi pi-heart', label: 'Tình trạng', value: 'Đã có chồng yêu 💕' }
  ];

  wifeTraits = [
    { icon: 'pi pi-heart-fill', title: 'Dịu dàng', description: 'Luôn nhẹ nhàng và ân cần' },
    { icon: 'pi pi-palette', title: 'Nghệ thuật', description: 'Có khiếu thẩm mỹ tuyệt vời' },
    { icon: 'pi pi-sun', title: 'Tích cực', description: 'Luôn lạc quan và tràn đầy năng lượng' },
    { icon: 'pi pi-gift', title: 'Chu đáo', description: 'Quan tâm đến từng chi tiết nhỏ' },
    { icon: 'pi pi-home', title: 'Gia đình', description: 'Biết cách tạo nên tổ ấm hạnh phúc' },
    { icon: 'pi pi-sparkles', title: 'Tỏa sáng', description: 'Luôn rạng rỡ và quyến rũ' }
  ];

  wifeHobbies = [
    { 
      icon: 'pi pi-car', 
      name: 'Du lịch', 
      description: 'Đam mê khám phá thế giới cùng chồng yêu' 
    },
    { 
      icon: 'pi pi-heart-fill', 
      name: 'Yêu chồng', 
      description: 'Sở thích lớn nhất là chăm sóc và yêu thương chồng' 
    },
    { 
      icon: 'pi pi-calculator', 
      name: 'Kế toán', 
      description: 'Làm việc với số liệu và quản lý tài chính' 
    },
    { 
      icon: 'pi pi-camera', 
      name: 'Chụp ảnh', 
      description: 'Ghi lại những khoảnh khắc đẹp trong chuyến đi' 
    },
    { 
      icon: 'pi pi-map', 
      name: 'Lên kế hoạch', 
      description: 'Sắp xếp các chuyến du lịch hoàn hảo' 
    },
    { 
      icon: 'pi pi-home', 
      name: 'Gia đình', 
      description: 'Xây dựng tổ ấm hạnh phúc bên chồng' 
    }
  ];

  wifePhotos = [
    { 
      url: 'assets/images/quyen/quyen-1.jpg', 
      caption: 'Heo Bỉm Sửa tại nơi làm việc' 
    },
    { 
      url: 'assets/images/quyen/quyen-2.jpg', 
      caption: 'Em trong một chuyến du lịch' 
    },
    { 
      url: 'assets/images/quyen/quyen-3.jpg', 
      caption: 'Heo Bỉm Sửa và công việc kế toán' 
    },
    { 
      url: 'assets/images/quyen/quyen-4.jpg', 
      caption: 'Em thư giãn cuối tuần' 
    },
    { 
      url: 'assets/images/quyen/quyen-5.jpg', 
      caption: 'Heo Bỉm Sửa khám phá địa điểm mới' 
    },
    { 
      url: 'assets/images/quyen/quyen-6.jpg', 
      caption: 'Em trong khoảnh khắc hạnh phúc' 
    }
  ];

  wifeBeautyStyles = [
    { 
      emoji: '💄', 
      title: 'Makeup', 
      description: 'Luôn biết cách trang điểm để tôn lên vẻ đẹp tự nhiên' 
    },
    { 
      emoji: '👗', 
      title: 'Thời trang', 
      description: 'Phong cách thời trang tinh tế và thanh lịch' 
    },
    { 
      emoji: '💅', 
      title: 'Nail Art', 
      description: 'Yêu thích làm nail với những mẫu xinh xắn' 
    },
    { 
      emoji: '🌸', 
      title: 'Chăm sóc da', 
      description: 'Skincare routine đều đặn để có làn da mịn màng' 
    },
    { 
      emoji: '💆‍♀️', 
      title: 'Spa', 
      description: 'Thư giãn với các liệu pháp spa và massage' 
    },
    { 
      emoji: '🎀', 
      title: 'Phụ kiện', 
      description: 'Biết cách phối đồ với phụ kiện một cách hoàn hảo' 
    }
  ];

  wifeFunFacts = [
    { 
      title: 'Đồ uống yêu thích', 
      description: 'Trà sữa và cà phê latte với hình trái tim dễ thương' 
    },
    { 
      title: 'Thói quen buổi tối', 
      description: 'Luôn skincare cẩn thận và đọc sách trước khi ngủ' 
    },
    { 
      title: 'Bài hát yêu thích', 
      description: 'Perfect - Ed Sheeran (bài hát mà em hay hát theo)' 
    },
    { 
      title: 'Ước mơ lớn nhất', 
      description: 'Mở studio thiết kế riêng và có gia đình nhỏ hạnh phúc' 
    },
    { 
      title: 'Điều em sợ nhất', 
      description: 'Côn trùng và xem phim kinh dị một mình' 
    },
    { 
      title: 'Tài năng đặc biệt', 
      description: 'Có thể làm món ăn ngon chỉ với nguyên liệu đơn giản' 
    }
  ];
}
