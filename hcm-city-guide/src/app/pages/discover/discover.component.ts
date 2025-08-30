import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DataService, DiscoverData } from '@core/services';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TranslateModule
  ],
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  discoverData!: DiscoverData;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadDiscoverData();
  }

  private loadDiscoverData() {
    this.dataService.getDiscoverData().subscribe(data => {
      this.discoverData = data;
    });
  }
} 