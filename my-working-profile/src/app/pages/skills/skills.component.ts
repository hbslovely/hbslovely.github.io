import { Component, OnInit, ViewChild, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CVService } from '../../services/cv.service';
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';
import { SkillItemComponent } from '../../components/skill-item/skill-item.component';
import { SkillDetailComponent, SkillInfo } from '../../components/skill-detail/skill-detail.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NzIconModule,
    NzModalModule,
    SectionHeaderComponent,
    SkillItemComponent,
    SkillDetailComponent
  ],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  @ViewChild('skillDetailDialog') skillDetailDialog!: TemplateRef<any>;

  selectedSkill: SkillInfo | null = null;
  selectedSkillProjectCount = 0;

  private readonly cvService = inject(CVService);
  private readonly modalService = inject(NzModalService);
  private readonly translate = inject(TranslateService);
  cv = this.cvService.cv;
  modalRef: any;

  config = {
    className: 'skills-page',
    maxWidth: 1200
  };

  protected readonly Object = Object;
  private skillsInfo: { [key: string]: SkillInfo } = {};

  async ngOnInit() {
    await this.loadSkillDetails();
    this.translate.onLangChange.subscribe(() => {
      this.loadSkillDetails();
    });
  }

  private async loadSkillDetails() {
    try {
      const response = await fetch(`/assets/json/skill-detail.${this.translate.currentLang}.json`);
      this.skillsInfo = await response.json();
    } catch (error) {
      console.error('Error loading skill details:', error);
    }
  }

  getTechnologyIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      frontEnd: 'layout',
      backEnd: 'api',
      database: 'database',
      devOps: 'cloud-server',
      tools: 'tool',
      languages: 'code',
      frameworks: 'cluster',
      libraries: 'appstore',
      testing: 'bug',
      mobile: 'mobile',
      cloud: 'cloud',
      methodologies: 'deployment-unit',
      environments: 'desktop',
      other: 'appstore'
    };
    return iconMap[category] || 'code';
  }

  getTagColor(skill: string): string {
    const colorMap: { [key: string]: string } = {
      Angular: '#DD0031',
      'AngularJS': '#E23237',
      ReactJS: '#61DAFB',
      TypeScript: '#3178C6',
      JavaScript: '#F7DF1E',
      'HTML5': '#E34F26',
      'CSS': '#1572B6',
      'RxJS': '#B7178C',
      'NgRx': '#BA2BD2',
      'Chart.js': '#FF6384',
      'KendoUI': '#FF6358',
      'D3.js': '#F9A03C',
      'jQuery': '#0769AD',
      Git: '#F05032'
    };
    return colorMap[skill] || '#1890ff';
  }

  getExperienceBackground(skill: string, darker = false): string {
    const years = this.getExperienceYears(skill);
    if (years === 0) return '#1e3c72';

    // Base color: #1e3c72 (lighter) to #0c1f3d (darker)
    const opacity = Math.min(1, years / 8); // Max intensity at 8 years
    const baseColor = darker ? '#0c1f3d' : '#1e3c72';
    const overlayColor = darker ? '#0a1a33' : '#162f5d';

    return this.blendColors(baseColor, overlayColor, opacity);
  }

  private blendColors(color1: string, color2: string, ratio: number): string {
    const hex1 = color1.substring(1);
    const hex2 = color2.substring(1);

    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);

    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);

    const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    const b = Math.round(b1 * (1 - ratio) + b2 * ratio);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  formatCategory(category: string): string {
    return category
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getSkillExperience(skill: string): string {
    const experienceMap: { [key: string]: string } = {
      'HTML5': this.calculateYearsOfExperience(2015),
      'CSS': this.calculateYearsOfExperience(2015),
      'JavaScript': this.calculateYearsOfExperience(2015),
      'Angular': this.calculateYearsOfExperience(2017),
      'AngularJS': '2 years',
      'ReactJS': '4+ years',
      'KendoUI': '1 year',
      'RxJS': '6+ years',
      'NgRx': '4+ years',
      'TypeScript': this.calculateYearsOfExperience(2017),
      'D3.js': '1 year',
      'jQuery': '1.5 years',
      'Chart.js': '1 year'
    };

    const yearsExp = experienceMap[skill];
    if (yearsExp) return yearsExp;

    // If no years experience, check projects count
    const projectCount = this.getProjectCount(skill);
    if (projectCount > 0) {
      return `${projectCount} project${projectCount > 1 ? 's' : ''}`;
    }

    return '';
  }

  private getProjectCount(skill: string): number {
    const info = this.skillsInfo[skill];
    if (info?.isCommonTool) {
      // For common tools/methodologies, assume used in all projects
      return (this.cv()?.projects?.projects || []).length;
    }

    const projects = this.cv()?.projects?.projects || [];
    return projects.filter(project =>
      project.technologies.some(tech =>
        tech.toLowerCase() === skill.toLowerCase()
      )
    ).length;
  }

  private getExperienceYears(skill: string): number {
    const experience = this.getSkillExperience(skill);
    if (!experience) return 0;

    if (experience.includes('project')) {
      const projectCount = parseInt(experience);
      return Math.min(projectCount / 2, 10); // 2 projects = 1 year equivalent, max 10 years
    }

    const years = parseFloat(experience);
    return isNaN(years) ? 0 : years;
  }

  getExperiencePercentage(skill: string): number {
    const years = this.getExperienceYears(skill);
    if (years === 0) return 0;

    // Calculate percentage (max 10 years = 100%)
    return Math.min(100, (years / 10) * 100);
  }

  showSkillInfo(skill: string): void {
    const info = this.skillsInfo[skill];
    if (!info) return;

    this.selectedSkill = info;
    this.selectedSkillProjectCount = this.getProjectCount(skill);

    this.modalRef = this.modalService.create({
      nzContent: this.skillDetailDialog,
      nzFooter: null,
      nzWidth: '800px',
      nzClassName: 'skill-modal project-detail-dialog',
      nzCentered: true,
      nzMaskClosable: true,
      nzBodyStyle: { padding: 0 } as any
    });
  }

  closeSkillDetailDialog(){
    this.modalRef.close();
  }

  private calculateYearsOfExperience(startYear: number): string {
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    return `${years}+ years`;
  }
}
