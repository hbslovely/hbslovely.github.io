import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-songs',
  templateUrl: './our-songs.component.html',
  styleUrls: ['./our-songs.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class OurSongsComponent {
  numbers = Array(12).fill(0).map((_, i) => i);
} 