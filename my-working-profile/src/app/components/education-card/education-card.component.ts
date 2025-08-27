import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { WatermarkComponent } from '../watermark/watermark.component';

interface Thesis {
  title: string;
  description: string;
  technologies: string[];
  supervisor: string;
  grade: string;
}

interface CompanyInfo {
  description: string;
  address: string;
  website: string;
  contact?: string;
  employeeCount?: string;
  officeCount?: string;
  foundedYear?: string;
  established: string;
  studentCount: string;
  facultyCount: string;
  internationalPartners: string;
  type: string;
  accreditation: string;
  ranking: string;
  researchCenters: string;
}

interface Education {
  institution: string;
  shortName: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  location: string;
  description: string;
  thesis?: Thesis;
  achievements?: string[];
  keySubjects?: string[];
  projects?: Array<{
    name: string;
    description: string;
  }>;
  institutionInfo: CompanyInfo;
}

@Component({
  selector: 'app-education-card',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NzModalModule,
    NzTabsModule,
    TranslateModule,
    WatermarkComponent
  ],
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.scss']
})
export class EducationCardComponent {
  @Input() education!: Education;
  @ViewChild('educationDetailDialog') educationDetailDialog!: TemplateRef<any>;

  constructor(private modalService: NzModalService) {}

  openEducationDialog(): void {
    this.modalService.create({
      nzContent: this.educationDetailDialog,
      nzFooter: null,
      nzWidth: 800,
      nzClassName: 'education-detail-modal',
      nzCentered: true
    });
  }
} 