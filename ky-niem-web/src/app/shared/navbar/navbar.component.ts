import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  text: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;

  menuItems: MenuItem[] = [
    { 
      text: 'Chào Mừng',
      link: '/chao-mung',
      icon: 'pi pi-calendar'
    },
    { 
      text: 'Câu Chuyện Của Tụi Mình',
      link: '/ve-chung-toi',
      icon: 'pi pi-book'
    },
    { 
      text: 'Thông Tin Vợ',
      link: '/thong-tin-vo',
      icon: 'pi pi-heart-fill'
    },
    { 
      text: 'Thông Tin Chồng',
      link: '/thong-tin-chong',
      icon: 'pi pi-user'
    },
    { 
      text: 'Album Ảnh',
      link: '/album-anh',
      icon: 'pi pi-images'
    },
    { 
      text: 'Tips Vợ Chồng',
      link: '/tips-vo-chong',
      icon: 'pi pi-star'
    }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';

    if (this.isMenuOpen) {
      const menuItems = document.querySelectorAll('.mobile-nav-item');
      menuItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('show');
        }, index * 100);
      });
    } else {
      const menuItems = document.querySelectorAll('.mobile-nav-item');
      menuItems.forEach(item => item.classList.remove('show'));
    }
  }
}
