import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    NzMenuModule,
    NzLayoutModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzDrawerModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Output() onDownload = new EventEmitter<'standard' | 'beautiful'>();
  
  isDrawerVisible = false;

  menuItems = [
    { id: 'about', icon: 'user', label: 'About' },
    { id: 'experience', icon: 'history', label: 'Experience' },
    { id: 'skills', icon: 'tool', label: 'Skills' },
    { id: 'projects', icon: 'project', label: 'Projects' }
  ];

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.isDrawerVisible = false;
    }
  }

  downloadPdf(type: 'standard' | 'beautiful'): void {
    this.onDownload.emit(type);
    this.isDrawerVisible = false;
  }

  toggleDrawer(): void {
    this.isDrawerVisible = !this.isDrawerVisible;
  }
} 