import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoveTimelineData } from '../../models/content.model';

@Component({
  selector: 'app-love-timeline',
  templateUrl: './love-timeline.component.html',
  styleUrls: ['./love-timeline.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoveTimelineComponent implements OnInit {
  // Array for floating elements
  floatingElements = Array(15).fill(0);
  timelineData!: LoveTimelineData;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadTimelineData();
  }

  private loadTimelineData(): void {
    this.http.get<LoveTimelineData>('assets/data/love-timeline.json')
      .subscribe({
        next: (data) => {
          this.timelineData = data;
        },
        error: (error) => {
          console.error('Error loading timeline data:', error);
        }
      });
  }
} 