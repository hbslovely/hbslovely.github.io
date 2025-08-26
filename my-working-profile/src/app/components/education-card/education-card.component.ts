import { Component, Input, ViewChild, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { WatermarkComponent } from '../watermark/watermark.component';
import { CustomModalService } from '../../services/custom-modal.service';

@Component({
  selector: 'app-education-card',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    TranslateModule,
    NzModalModule,
    NzTagModule,
    WatermarkComponent,
  ],
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.scss']
})
export class EducationCardComponent {
  @Input() education: any; // Replace 'any' with your education interface type
  @ViewChild('educationDetailDialog', { static: true }) educationDetailDialog!: TemplateRef<any>;

  private modalService = inject(CustomModalService);

  openEducationDialog(): void {
    this.modalService.create({
      nzContent: this.educationDetailDialog,
      nzFooter: null,
      nzWidth: '800px',
      nzClassName: 'education-detail-modal',
      nzCentered: true,
      nzMaskClosable: true
    });
  }
} 