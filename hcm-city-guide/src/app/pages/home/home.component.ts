import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  highlights = [
    {
      title: 'District 1',
      description: 'The heart of the city with iconic landmarks like Notre-Dame Cathedral and Saigon Post Office.',
      image: 'assets/images/district-1.jpg'
    },
    {
      title: 'Cu Chi Tunnels',
      description: 'Historic tunnel network showcasing wartime ingenuity and resilience.',
      image: 'assets/images/cu-chi-tunnels.jpg'
    },
    {
      title: 'Ben Thanh Market',
      description: 'Famous market offering local goods, food, and authentic Vietnamese culture.',
      image: 'assets/images/ben-thanh-market.jpg'
    }
  ];

  districts = [
    {
      name: 'District 1',
      description: 'Central business and tourism hub',
      attractions: ['Notre-Dame Cathedral', 'Saigon Post Office', 'Nguyen Hue Walking Street']
    },
    {
      name: 'District 3',
      description: 'Historic architecture and cafes',
      attractions: ['Turtle Lake', 'Pink Church', 'War Remnants Museum']
    },
    {
      name: 'District 5',
      description: 'Chinatown (Cho Lon)',
      attractions: ['Binh Tay Market', 'Thien Hau Temple', 'Traditional Medicine Street']
    }
  ];
}
