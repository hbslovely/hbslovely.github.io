import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface MenuItem {
  text: string;
  link: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  menuItems: MenuItem[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMenuItems();
  }

  private loadMenuItems() {
    this.http.get<{menuItems: MenuItem[]}>('assets/data/navigation.json')
      .subscribe(data => {
        this.menuItems = data.menuItems;
      });
  }

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
