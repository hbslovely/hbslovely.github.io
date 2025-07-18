import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  constructor() { }

  ngOnInit(): void {
  }
} 