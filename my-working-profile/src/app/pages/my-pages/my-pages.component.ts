import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

interface MyPage {
  title: string;
  description: string;
  url: string;
  image: string;
  fallbackImage: string;
  status: 'completed' | 'in-progress';
  technologies: string[];
}

@Component({
  selector: 'app-my-pages',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzIconModule,
    NzCardModule,
    RouterModule,
    PageHeaderComponent
  ],
  templateUrl: './my-pages.component.html',
  styleUrls: ['./my-pages.component.scss']
})
export class MyPagesComponent {
  myPages: MyPage[] = [
    {
      title: 'Love Story',
      description: 'A website dedicated to the love story between my wife and me.',
      url: 'https://hbslovely.vercel.app/#/chao-mung',
      image: 'assets/images/pages/love-story.png',
      fallbackImage: 'assets/images/gallery/projects.png',
      status: 'completed',
      technologies: ['Angular', 'PrimeNG', 'SCSS']
    },
    {
      title: 'Ho Chi Minh City Guide',
      description: 'A travel guide introducing Ho Chi Minh City for visitors.',
      url: 'https://hello-hcmc.vercel.app/',
      image: 'assets/images/pages/hcmc-guide.png',
      fallbackImage: 'assets/images/gallery/projects.png',
      status: 'in-progress',
      technologies: ['Angular', 'PrimeNG', 'Font Awesome']
    }
  ];

  handleImageError(page: MyPage): void {
    // If the image fails to load, use the fallback image
    const imgElement = event?.target as HTMLImageElement;
    if (imgElement) {
      imgElement.src = page.fallbackImage;
    }
  }
}
