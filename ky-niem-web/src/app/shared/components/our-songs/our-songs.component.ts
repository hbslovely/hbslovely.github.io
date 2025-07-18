import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Song {
  title: string;
  artist: string;
  composer?: string;
  lyrics: string;
  moment: string;
  icon: string;
}

@Component({
  selector: 'app-our-songs',
  templateUrl: './our-songs.component.html',
  styleUrls: [ './our-songs.component.scss' ],
  standalone: true,
  imports: [ CommonModule ]
})
export class OurSongsComponent {
  @Input() songs: Song[] = [];

  numbers = Array(12).fill(0).map((_, i) => i);
}
