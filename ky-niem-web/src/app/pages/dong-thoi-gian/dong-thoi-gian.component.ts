import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'app-dong-thoi-gian',
  imports: [ CommonModule, TimelineModule ],
  templateUrl: './dong-thoi-gian.component.html',
  styleUrls: [ './dong-thoi-gian.component.scss' ]
})
export class DongThoiGianComponent {
  events = [
    { status: 'Bắt đầu quen nhau', date: '01/01/2020', icon: 'pi pi-heart' },
    { status: 'Kỷ niệm 1 năm', date: '01/01/2021', icon: 'pi pi-gift' },
    { status: 'Chuyến du lịch đầu tiên', date: '07/07/2021', icon: 'pi pi-plane' }
  ];
}
