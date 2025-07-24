import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from '../../components/personal-info/personal-info.component';
import { CVService } from '../../services/cv.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    PersonalInfoComponent
  ],
  template: `
    <div class="about-page">
      <app-personal-info [info]="cv()?.personalInfo"></app-personal-info>
    </div>
  `,
  styles: [`
    .about-page {
      max-width: 800px;
      margin: 0 auto;
    }
  `]
})
export class AboutComponent {

  constructor(private cvService: CVService) {
    this.cv = this.cvService.cv;
  }

  // @ts-ignore
  cv;
}
