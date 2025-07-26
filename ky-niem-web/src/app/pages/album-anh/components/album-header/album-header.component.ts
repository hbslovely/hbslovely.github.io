import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-album-header',
  templateUrl: './album-header.component.html',
  styleUrls: ['./album-header.component.scss']
})
export class AlbumHeaderComponent {
  @Input() totalPhotos: number = 0;
  @Input() previewPhotos: string[] = [];
} 