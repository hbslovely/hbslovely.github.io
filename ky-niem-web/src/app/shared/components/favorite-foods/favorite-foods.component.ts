import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonFilterPipe } from '../../pipes/person-filter.pipe';
import { Food } from '../../models';

@Component({
  selector: 'app-favorite-foods',
  standalone: true,
  imports: [CommonModule, PersonFilterPipe],
  templateUrl: './favorite-foods.component.html',
  styleUrls: ['./favorite-foods.component.scss']
})
export class FavoriteFoodsComponent {
  @Input() foods: Food[] = [];
}
