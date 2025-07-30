import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watermark',
  standalone: true,
  imports: [ CommonModule, NzIconModule ],
  templateUrl: './watermark.component.html',
  styleUrls: [ './watermark.component.scss' ]
})
export class WatermarkComponent {
}
