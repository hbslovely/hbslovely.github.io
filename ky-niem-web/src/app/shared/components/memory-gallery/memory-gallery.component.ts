import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MemoryImage {
  id: number;
  src: string;
  description: string;
}

@Component({
  selector: 'app-memory-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memory-gallery.component.html',
  styleUrls: ['./memory-gallery.component.scss']
})
export class MemoryGalleryComponent {
  @Input() memories: MemoryImage[] = [];
} 