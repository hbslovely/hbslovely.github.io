import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-detail-header',
  templateUrl: './album-detail-header.component.html',
  imports: [
    CommonModule
  ],
  styleUrls: [ './album-detail-header.component.scss' ]
})
export class AlbumDetailHeaderComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() coverImage: string = '';
  @Input() photoCount: number = 0;
  @Input() date: Date = new Date();
  @Input() previewPhotos: string[] = [];
  @Output() onBack = new EventEmitter<void>();
}
