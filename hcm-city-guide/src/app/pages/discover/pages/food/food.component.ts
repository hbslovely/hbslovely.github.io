import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DataService, DiscoverData } from '@core/services';

interface FoodCategory {
  id: string;
  nameKey: string;
  descriptionKey: string;
  image: string;
  dishes: Dish[];
}

interface Dish {
  nameKey: string;
  descriptionKey: string;
  price: string;
  tags: string[];
  image: string;
}

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CardModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  categories: FoodCategory[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadFoodData();
  }

  private loadFoodData() {
    this.dataService.getDiscoverData().subscribe(data => {
      this.categories = data.sections.food.categories;
    });
  }

  getTagSeverity(tag: string): string {
    const severities: { [key: string]: string } = {
      breakfast: 'info',
      lunch: 'success',
      dinner: 'warning',
      popular: 'danger',
      quick: 'info',
      luxury: 'warning',
      local: 'success',
      seafood: 'info',
      noodles: 'warning',
      rice: 'success',
      sandwich: 'info',
      snack: 'warning',
      'beer-food': 'danger'
    };
    return severities[tag] || 'info';
  }
}
