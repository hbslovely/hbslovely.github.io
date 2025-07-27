import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PersonalInfo } from '../../models/cv.models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  personalInfo: PersonalInfo = {
    name: 'Ninh Quyen',
    title: 'Senior Software Developer',
    summary: 'Results-driven Senior Web Developer with over 10 years of expertise in front-end development and modern web technologies.',
    contact: {
      email: 'hpphat1992@gmail.com',
      phone: '+84 764 74 99 64',
      linkedin: 'https://www.linkedin.com/in/hpphat1992/',
      github: 'https://github.com/hpphat92'
    }
  };
}
