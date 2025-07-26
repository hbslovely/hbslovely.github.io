import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-album-header',
  imports: [CommonModule],
  templateUrl: './album-header.component.html',
  styleUrls: ['./album-header.component.scss']
})
export class AlbumHeaderComponent {
  @Input() totalPhotos: number = 0;
  @Input() previewPhotos: string[] = [];
}
