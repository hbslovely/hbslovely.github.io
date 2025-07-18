import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Song {
  title: string;
  artist: string;
  description: string;
  moment: string;
  icon?: string;  // Optional since it's not in the JSON data
}

@Component({
  selector: 'app-our-songs',
  templateUrl: './our-songs.component.html',
  styleUrls: ['./our-songs.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class OurSongsComponent implements OnInit {
  @Input() songs: Song[] = [];
  numbers = Array(12).fill(0).map((_, i) => i);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSongs();
  }

  private loadSongs() {
    this.http.get<{ourSongs: Song[]}>('assets/data/memories-data.json')
      .subscribe(data => {
        // Map the songs and add default icons if not present
        this.songs = data.ourSongs.map(song => ({
          ...song,
          icon: song.icon || this.getDefaultIcon()
        }));
      });
  }

  private getDefaultIcon(): string {
    const icons = [
      'pi pi-heart-fill',
      'pi pi-music',
      'pi pi-volume-up',
      'pi pi-video',
      'pi pi-star-fill'
    ];
    return icons[Math.floor(Math.random() * icons.length)];
  }
}
