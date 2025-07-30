import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watermark',
  standalone: true,
  imports: [CommonModule, NzIconModule],
  template: `
    <div class="watermark-container">
      <span 
        nz-icon 
        class="watermark-icon" 
        nzType="code-sandbox" 
        nzTheme="outline">
      </span>
    </div>
  `
})
export class WatermarkComponent {} 