import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FavoriteFood {
  dish: string;
  person: string;
  story: string;
  feeling: string;
}

@Component({
  selector: 'app-favorite-foods',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-foods.component.html',
  styleUrls: ['./favorite-foods.component.scss']
})
export class FavoriteFoodsComponent {
  @Input() foods: FavoriteFood[] = [];
} 