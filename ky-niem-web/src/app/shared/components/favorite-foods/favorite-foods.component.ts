import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonFilterPipe } from '../../pipes/person-filter.pipe';
import { Food } from '../../models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-favorite-foods',
  standalone: true,
  imports: [CommonModule, PersonFilterPipe],
  templateUrl: './favorite-foods.component.html',
  styleUrls: ['./favorite-foods.component.scss']
})
export class FavoriteFoodsComponent implements OnInit {
  foods: Food[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ favoriteFoods: Food[] }>('assets/data/favorite-foods.json')
      .subscribe(data => {
        this.foods = data.favoriteFoods;
      });
  }
}
