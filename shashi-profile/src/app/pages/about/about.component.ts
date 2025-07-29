import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzIconModule,
    NzModalModule
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  protected readonly cvService = inject(CvService);
  private modal = inject(NzModalService);

  showAvatar(): void {
    this.modal.create({
      nzContent: `<div class="avatar-modal">
        <img src="assets/images/avatar.png" alt="Profile picture">
      </div>`,
      nzFooter: null,
      nzClosable: true,
      nzCentered: true,
      nzClassName: 'avatar-preview-modal',
      nzWidth: 'auto',
      nzStyle: { top: '20px' }
    });
  }
}
