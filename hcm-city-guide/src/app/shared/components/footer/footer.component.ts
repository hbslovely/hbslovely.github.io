import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  socialLinks = [
    { icon: 'fab fa-facebook', url: 'https://facebook.com/hcmcityguide' },
    { icon: 'fab fa-instagram', url: 'https://instagram.com/hcmcityguide' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com/hcmcityguide' },
    { icon: 'fab fa-youtube', url: 'https://youtube.com/hcmcityguide' }
  ];
}
