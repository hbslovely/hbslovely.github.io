import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { PersonalInfo } from '../../models/cv.models';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [
    CommonModule, 
    NzIconModule, 
    NzTypographyModule, 
    NzTagModule,
    NzModalModule
  ],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent {
  @Input() info?: PersonalInfo;

  constructor(private modalService: NzModalService) {}

  showFullscreenAvatar(): void {
    this.modalService.create({
      nzContent: `<div class="fullscreen-avatar">
        <img src="assets/images/avatar.jpeg" alt="Profile Picture">
      </div>`,
      nzFooter: null,
      nzClosable: true,
      nzCentered: true,
      nzWidth: 'auto',
      nzClassName: 'avatar-modal',
      nzStyle: { 
        top: '20px'
      },
      nzBodyStyle: {
        padding: '0',
        background: 'transparent'
      }
    });
  }
} 