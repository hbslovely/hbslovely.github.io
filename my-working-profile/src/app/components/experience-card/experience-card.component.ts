import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { WatermarkComponent } from '../watermark/watermark.component';
import { WorkExperience, CompanyInfo } from '../../models/cv.models';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NzTabsModule,
    NzToolTipModule,
    TranslateModule,
    WatermarkComponent
  ]
})
export class ExperienceCardComponent {
  @Input() experience!: WorkExperience;
  @ViewChild('companyDetailDialog') companyDetailDialog!: TemplateRef<any>;

  constructor(private modalService: NzModalService) {}

  getCompanyLogo(company: string): string {
    return `${company.toLowerCase().replace(/\s+/g, '-')}.png`;
  }

  openCompanyDialog(): void {
    this.modalService.create({
      nzContent: this.companyDetailDialog,
      nzFooter: null,
      nzWidth: 800,
      nzClassName: 'company-detail-modal',
      nzCentered: true
    });
  }
}
