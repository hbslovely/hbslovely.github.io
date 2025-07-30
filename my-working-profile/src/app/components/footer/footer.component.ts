import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    TranslateModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  socialLinks = [
    {
      icon: 'github',
      url: 'https://github.com/hpphat92',
      label: 'GitHub'
    },
    {
      icon: 'linkedin',
      url: 'https://www.linkedin.com/in/hpphat1992/',
      label: 'LinkedIn'
    }
  ];
} 