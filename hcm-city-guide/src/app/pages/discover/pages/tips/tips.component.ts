import { Component } from '@angular/core';
import { TipsService, TipsCategory } from '@core/services';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class TipsComponent {
  tipsData$;
  constructor(private tipsService: TipsService) {
    this.tipsData$ = this.tipsService.loadTipsData();
  }

  getSectionKeys(category: TipsCategory): string[] {
    return Object.keys(category.sections);
  }

  getGuidelineKeys(section: any): string[] {
    return Object.keys(section.guidelines);
  }
}
