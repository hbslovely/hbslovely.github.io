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
      label: 'Trang Chủ',
      icon: 'pi pi-home',
      routerLink: '/ky-niem'
    },
    {
      label: 'Album Ảnh',
      icon: 'pi pi-images',
      routerLink: '/album-anh'
    },
    {
      label: 'Ảnh Yêu Thích',
      icon: 'pi pi-heart-fill',
      routerLink: '/anh-yeu-thich'
    },
    {
      label: 'Dòng Thời Gian',
      icon: 'pi pi-history',
      routerLink: '/dong-thoi-gian'
    },
    {
      label: 'Thông Tin Chồng',
      icon: 'pi pi-user',
      routerLink: '/thong-tin-chong'
    },
    {
      label: 'Thông Tin Vợ',
      icon: 'pi pi-crown',
      routerLink: '/thong-tin-vo'
    },
    {
      label: 'Từ Khóa',
      icon: 'pi pi-tags',
      routerLink: '/image-cloud'
    },
    {
      label: 'Thông Điệp',
      icon: 'pi pi-send',
      routerLink: '/thong-diep'
    },
    {
      label: 'Về Chúng Tôi',
      icon: 'pi pi-users',
      routerLink: '/ve-chung-toi'
    }
  ];
}
