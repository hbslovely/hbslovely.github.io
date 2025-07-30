import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PersonalInfo } from '../../models/cv.models';
import { CVService } from '../../services/cv.service';

@Component({
  selector: 'app-contact-button',
  standalone: true,
  imports: [CommonModule, NzIconModule],
  templateUrl: './contact-button.component.html',
  styleUrls: ['./contact-button.component.scss']
})
export class ContactButtonComponent implements OnInit {
  public cvService = inject(CVService);
  info: PersonalInfo | undefined;
  isMobile = false;

  ngOnInit() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  contact() {
    if (this.isMobile) {
      window.location.href = `tel:${this.cvService.cv()?.personalInfo?.contact.phone}`;
    } else {
      window.location.href = `mailto:${this.cvService.cv()?.personalInfo?.contact.email}`;
    }
  }
}
