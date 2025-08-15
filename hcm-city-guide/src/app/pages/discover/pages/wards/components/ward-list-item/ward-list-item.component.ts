import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { Ward } from '../../../../../../core';

@Component({
  selector: 'app-ward-list-item',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './ward-list-item.component.html',
  styleUrls: ['./ward-list-item.component.scss']
})
export class WardListItemComponent {
  @Input() ward!: Ward;
} 