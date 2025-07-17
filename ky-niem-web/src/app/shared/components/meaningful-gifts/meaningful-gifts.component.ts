import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MeaningfulGift {
  gift: string;
  occasion: string;
  meaning: string;
  emotion: string;
}

@Component({
  selector: 'app-meaningful-gifts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meaningful-gifts.component.html',
  styleUrls: ['./meaningful-gifts.component.scss']
})
export class MeaningfulGiftsComponent {
  @Input() gifts: MeaningfulGift[] = [];
} 