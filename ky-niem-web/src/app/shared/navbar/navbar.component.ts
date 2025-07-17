import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  imports: [ 
    CommonModule,
    MenubarModule, 
    ButtonModule,
    RouterLink, 
    RouterLinkActive 
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  menuItems: MenuItem[] = [
    {
      label: '🏠 Tổ Ấm Tình Yêu',
      icon: 'pi pi-home',
      routerLink: '/ky-niem'
    },
    {
      label: '📸 Bộ Sưu Tập Kỷ Niệm',
      icon: 'pi pi-images',
      routerLink: '/album-anh'
    },
    {
      label: '💕 Những Khoảnh Khắc Yêu Thích',
      icon: 'pi pi-heart-fill',
      routerLink: '/anh-yeu-thich'
    },
    {
      label: '⏰ Hành Trình Tình Yêu',
      icon: 'pi pi-history',
      routerLink: '/dong-thoi-gian'
    },
    {
      label: '👨‍💼 Hoàng Tử Của Em',
      icon: 'pi pi-user',
      routerLink: '/thong-tin-chong'
    },
    {
      label: '👸 Công Chúa Của Anh',
      icon: 'pi pi-crown',
      routerLink: '/thong-tin-vo'
    },
    {
      label: '🎯 Từ Khóa Tình Yêu',
      icon: 'pi pi-tags',
      routerLink: '/image-cloud'
    },
    {
      label: '💌 Thư Tình Gửi Nhau',
      icon: 'pi pi-send',
      routerLink: '/thong-diep'
    },
    {
      label: '💑 Câu Chuyện Của Chúng Ta',
      icon: 'pi pi-users',
      routerLink: '/ve-chung-toi'
    }
  ];
}
