import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HappyMoment, Category } from '../../models/love.model';

@Component({
  selector: 'app-happy-moments',
  templateUrl: './happy-moments.component.html',
  styleUrls: ['./happy-moments.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HappyMomentsComponent implements OnInit {
  happyMoments: HappyMoment[] = [
    {
      id: 1,
      title: 'Lần Đầu Gặp Nhau',
      description: 'Khoảnh khắc đầu tiên khi chúng ta gặp nhau, một ngày không thể quên với nhiều cảm xúc đặc biệt.',
      date: '15/03/2023',
      image: 'assets/images/gallery/ngay-dau-ben-nhau.png',
      emotions: [
        { icon: 'pi-heart', text: 'Rung động' },
        { icon: 'pi-star', text: 'Đặc biệt' }
      ]
    },
    {
      id: 2,
      title: 'Chuyến Du Lịch Đầu Tiên',
      description: 'Chuyến đi đầu tiên của chúng ta, nơi chúng ta thực sự hiểu nhau hơn và có nhiều kỷ niệm đáng nhớ.',
      date: '20/05/2023',
      image: 'assets/images/gallery/chuyen-di-dau-tien.png',
      emotions: [
        { icon: 'pi-heart', text: 'Hạnh phúc' },
        { icon: 'pi-camera', text: 'Kỷ niệm' }
      ]
    },
    {
      id: 3,
      title: 'Những Ngày Bên Nhau',
      description: 'Mỗi ngày bên nhau đều là một hành trình tuyệt vời, đầy ắp tiếng cười và những khoảnh khắc đáng nhớ.',
      date: '10/08/2023',
      image: 'assets/images/gallery/ben-nhau.png',
      emotions: [
        { icon: 'pi-heart', text: 'Yêu thương' },
        { icon: 'pi-home', text: 'Ấm áp' }
      ]
    },
    {
      id: 4,
      title: 'Nụ Cười Hạnh Phúc',
      description: 'Những nụ cười rạng rỡ khi ở bên nhau, làm cho cuộc sống thêm tươi đẹp và ý nghĩa.',
      date: '25/12/2023',
      image: 'assets/images/gallery/nu-cuoi.png',
      emotions: [
        { icon: 'pi-heart', text: 'Hạnh phúc' },
        { icon: 'pi-sun', text: 'Rạng rỡ' }
      ]
    },
    {
      id: 5,
      title: 'Khoảnh Khắc Yêu Thương',
      description: 'Những phút giây bình yên bên nhau, lắng nghe và chia sẻ mọi điều trong cuộc sống.',
      date: '01/01/2024',
      image: 'assets/images/gallery/nam-tay-yeu-thuong.png',
      emotions: [
        { icon: 'pi-heart', text: 'Yêu thương' },
        { icon: 'pi-heart-fill', text: 'Ngọt ngào' }
      ]
    },
    {
      id: 6,
      title: 'Sự An Ủi Ấm Áp',
      description: 'Luôn ở bên và là chỗ dựa vững chắc cho nhau trong mọi hoàn cảnh của cuộc sống.',
      date: '14/02/2024',
      image: 'assets/images/gallery/su-an-ui.png',
      emotions: [
        { icon: 'pi-heart', text: 'Ấm áp' },
        { icon: 'pi-shield', text: 'Che chở' }
      ]
    },
    {
      id: 7,
      title: 'Bên Nhau Mọi Lúc',
      description: 'Dù vui hay buồn, chúng ta luôn có nhau và cùng nhau vượt qua mọi thử thách.',
      date: '08/03/2024',
      image: 'assets/images/gallery/su-ben-nhau-moi-luc.png',
      emotions: [
        { icon: 'pi-heart', text: 'Gắn kết' },
        { icon: 'pi-users', text: 'Đồng hành' }
      ]
    }
  ];

  categories: Category[] = [
    {
      title: 'Những Chuyến Đi',
      icon: 'pi-map-marker',
      count: 12
    },
    {
      title: 'Khoảnh Khắc Đặc Biệt',
      icon: 'pi-heart',
      count: 25
    },
    {
      title: 'Ngày Lễ & Kỷ Niệm',
      icon: 'pi-calendar',
      count: 8
    },
    {
      title: 'Những Bữa Ăn',
      icon: 'pi-heart-fill',
      count: 15
    },
    {
      title: 'Hoạt Động Cùng Nhau',
      icon: 'pi-users',
      count: 20
    }
  ];

  timelineEvents = [
    {
      date: '15/03/2023',
      title: 'Ngày Đầu Gặp Nhau',
      description: 'Khoảnh khắc đầu tiên khi ta bắt đầu câu chuyện tình yêu của mình',
      image: 'assets/images/gallery/ngay-dau-ben-nhau.png'
    },
    {
      date: '20/05/2023',
      title: 'Chuyến Đi Đầu Tiên',
      description: 'Những kỷ niệm đẹp trong chuyến đi đầu tiên của chúng ta',
      image: 'assets/images/gallery/chuyen-di-dau-tien.png'
    },
    {
      date: '10/08/2023',
      title: 'Những Ngày Bên Nhau',
      description: 'Mỗi ngày bên nhau đều là một kỷ niệm đáng trân trọng',
      image: 'assets/images/gallery/ben-nhau.png'
    },
    {
      date: '25/12/2023',
      title: 'Giáng Sinh Ấm Áp',
      description: 'Cùng nhau đón một mùa Giáng sinh đầy yêu thương và hạnh phúc',
      image: 'assets/images/gallery/nu-cuoi.png'
    },
    {
      date: '01/01/2024',
      title: 'Năm Mới Bên Nhau',
      description: 'Chào đón năm mới với nhiều ước mơ và dự định cho tương lai',
      image: 'assets/images/gallery/nam-tay-yeu-thuong.png'
    },
    {
      date: '14/02/2024',
      title: 'Valentine Ngọt Ngào',
      description: 'Cùng nhau tận hưởng ngày lễ tình nhân đầy lãng mạn và ý nghĩa',
      image: 'assets/images/gallery/su-an-ui.png'
    }
  ];

  galleryImages = [
    {
      src: 'assets/images/gallery/nu-cuoi.png',
      alt: 'Nụ cười hạnh phúc'
    },
    {
      src: 'assets/images/gallery/su-an-ui.png',
      alt: 'Sự an ủi'
    },
    {
      src: 'assets/images/gallery/su-ben-nhau-moi-luc.png',
      alt: 'Bên nhau mọi lúc'
    },
    {
      src: 'assets/images/gallery/nam-tay-yeu-thuong.png',
      alt: 'Nắm tay yêu thương'
    },
    {
      src: 'assets/images/gallery/ben-nhau.png',
      alt: 'Bên nhau'
    },
    {
      src: 'assets/images/gallery/chuyen-di.png',
      alt: 'Chuyến đi'
    },
    {
      src: 'assets/images/gallery/ngay-dau-ben-nhau.png',
      alt: 'Ngày đầu bên nhau'
    },
    {
      src: 'assets/images/gallery/chuyen-di-dau-tien.png',
      alt: 'Chuyến đi đầu tiên'
    }
  ];

  emotionalQuotes = [
    {
      icon: 'pi-heart',
      text: 'Yêu không phải là nhìn nhau, mà là cùng nhìn về một hướng',
      author: 'Antoine de Saint-Exupéry'
    },
    {
      icon: 'pi-star',
      text: 'Tình yêu không làm cho thế giới quay, tình yêu làm cho chuyến đi đáng giá',
      author: 'Franklin P. Jones'
    },
    {
      icon: 'pi-heart-fill',
      text: 'Hạnh phúc đơn giản là được ở bên người mình yêu thương',
      author: 'Anonymous'
    },
    {
      icon: 'pi-home',
      text: 'Nhà là nơi có em',
      author: 'Unknown'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
} 