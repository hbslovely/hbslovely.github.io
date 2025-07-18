import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Milestone } from '../../models/love.model';

@Component({
  selector: 'app-love-milestones',
  templateUrl: './love-milestones.component.html',
  styleUrls: ['./love-milestones.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoveMilestonesComponent implements OnInit {
  daysTogether: number = 0;
  photosTaken: number = 256;
  placesVisited: number = 8;

  constructor() {}

  ngOnInit(): void {
    this.updateMilestones();
  }

  private calculateDaysTogether(): number {
    const startDate = new Date('2023-03-15'); // Ngày bắt đầu yêu nhau
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private updateMilestones(): void {
    this.daysTogether = this.calculateDaysTogether();
  }
}
