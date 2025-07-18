import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Song {
  title: string;
  artist: string;
  description: string;
  moment: string;
  quote?: string;
}

@Component({
  selector: 'app-our-songs',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './our-songs.component.html',
  styleUrls: ['./our-songs.component.scss']
})
export class OurSongsComponent {
  @Input() songs: Song[] = [];
  
  // Array for ngFor loops in template
  numbers = Array(8).fill(0).map((_, i) => i + 1);

  // Random quotes for songs that don't have one
  private songQuotes = [
    "Giai điệu này luôn khiến ta nhớ về nhau",
    "Mỗi nốt nhạc là một kỷ niệm đẹp",
    "Bài hát này sẽ mãi là của riêng đôi ta",
    "Âm nhạc là nhịp đập của trái tim yêu",
    "Lời ca này như được viết riêng cho tình ta"
  ];

  getRandomQuote(): string {
    return this.songQuotes[Math.floor(Math.random() * this.songQuotes.length)];
  }
} 