import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { WifeData } from '../../shared/models';

@Component({
  selector: 'app-thong-tin-vo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thong-tin-vo.component.html',
  styleUrls: ['./thong-tin-vo.component.scss']
})
export class ThongTinVoComponent implements OnInit {
  wifeData: Partial<WifeData> = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadWifeData();
  }

  private loadWifeData() {
    this.http.get<WifeData>('assets/data/wife-data.json').subscribe({
      next: (data) => {
        this.wifeData = data;
      },
      error: (error) => {
        console.error('Error loading wife data:', error);
      }
    });
  }

  getRandomEmoji(): string {
    const emojis = ['🌸', '🎀', '💝', '💖', '✨', '🌟', '🦋', '🌺', '🎵', '💫'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }
}
