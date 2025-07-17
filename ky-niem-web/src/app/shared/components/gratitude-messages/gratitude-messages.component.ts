import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gratitude-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gratitude-messages.component.html',
  styleUrls: ['./gratitude-messages.component.scss'],
  host: {
    'style': `
      @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,700;1,400;1,700&display=swap');
    `
  }
})
export class GratitudeMessagesComponent {} 