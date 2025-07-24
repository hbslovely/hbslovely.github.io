import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isMobile = window.innerWidth <= 768;
  readonly logoText = 'My Portfolio';

  readonly navItems = [
    { path: '/about', icon: 'user', label: 'About' },
    { path: '/experience', icon: 'laptop', label: 'Experience' },
    { path: '/skills', icon: 'tool', label: 'Skills' },
    { path: '/projects', icon: 'project', label: 'Projects' }
  ];

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }
}
