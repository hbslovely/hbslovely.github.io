import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Song {
  title: string;
  artist: string;
  description: string;
  moment: string;
}

@Component({
  selector: 'app-our-songs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-songs.component.html',
  styleUrls: ['./our-songs.component.scss']
})
export class OurSongsComponent {
  @Input() songs: Song[] = [];
} 