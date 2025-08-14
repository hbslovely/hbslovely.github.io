import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenubarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menuItems: MenuItem[] = [];

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Home',
        icon: 'fas fa-home',
        routerLink: ['/']
      },
      {
        label: 'Discover',
        icon: 'fas fa-compass',
        items: [
          {
            label: 'Districts',
            icon: 'fas fa-map'
          },
          {
            label: 'Attractions',
            icon: 'fas fa-camera'
          },
          {
            label: 'Food & Dining',
            icon: 'fas fa-utensils'
          }
        ]
      },
      {
        label: 'Culture',
        icon: 'fas fa-users',
        items: [
          {
            label: 'History',
            icon: 'fas fa-book'
          },
          {
            label: 'Local Life',
            icon: 'fas fa-globe'
          },
          {
            label: 'Events',
            icon: 'fas fa-calendar'
          }
        ]
      },
      {
        label: 'Travel Tips',
        icon: 'fas fa-info-circle'
      },
      {
        label: 'Contact',
        icon: 'fas fa-envelope'
      }
    ];
  }
}
