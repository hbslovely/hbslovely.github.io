import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

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
export class FoodComponent {
  categories: FoodCategory[] = [
    {
      id: 'street-food',
      nameKey: 'FOOD.CATEGORIES.STREET_FOOD.NAME',
      descriptionKey: 'FOOD.CATEGORIES.STREET_FOOD.DESC',
      image: 'assets/images/food/street-food.jpg',
      dishes: [
        {
          nameKey: 'FOOD.DISHES.PHO.NAME',
          descriptionKey: 'FOOD.DISHES.PHO.DESC',
          price: '45,000đ - 65,000đ',
          tags: ['breakfast', 'noodles', 'popular'],
          image: 'assets/images/food/pho.jpg'
        },
        {
          nameKey: 'FOOD.DISHES.BANH_MI.NAME',
          descriptionKey: 'FOOD.DISHES.BANH_MI.DESC',
          price: '25,000đ - 35,000đ',
          tags: ['breakfast', 'sandwich', 'quick'],
          image: 'assets/images/food/banh-mi.jpg'
        }
      ]
    },
    {
      id: 'local-specialties',
      nameKey: 'FOOD.CATEGORIES.LOCAL_SPECIALTIES.NAME',
      descriptionKey: 'FOOD.CATEGORIES.LOCAL_SPECIALTIES.DESC',
      image: 'assets/images/food/local-specialties.jpg',
      dishes: [
        {
          nameKey: 'FOOD.DISHES.COM_TAM.NAME',
          descriptionKey: 'FOOD.DISHES.COM_TAM.DESC',
          price: '40,000đ - 60,000đ',
          tags: ['lunch', 'rice', 'popular'],
          image: 'assets/images/food/com-tam.jpg'
        },
        {
          nameKey: 'FOOD.DISHES.HU_TIEU.NAME',
          descriptionKey: 'FOOD.DISHES.HU_TIEU.DESC',
          price: '35,000đ - 50,000đ',
          tags: ['breakfast', 'noodles', 'local'],
          image: 'assets/images/food/hu-tieu.jpg'
        }
      ]
    },
    {
      id: 'seafood',
      nameKey: 'FOOD.CATEGORIES.SEAFOOD.NAME',
      descriptionKey: 'FOOD.CATEGORIES.SEAFOOD.DESC',
      image: 'assets/images/food/seafood.jpg',
      dishes: [
        {
          nameKey: 'FOOD.DISHES.CRAB.NAME',
          descriptionKey: 'FOOD.DISHES.CRAB.DESC',
          price: '200,000đ - 400,000đ',
          tags: ['dinner', 'seafood', 'luxury'],
          image: 'assets/images/food/crab.jpg'
        },
        {
          nameKey: 'FOOD.DISHES.SNAILS.NAME',
          descriptionKey: 'FOOD.DISHES.SNAILS.DESC',
          price: '80,000đ - 150,000đ',
          tags: ['snack', 'seafood', 'beer-food'],
          image: 'assets/images/food/snails.jpg'
        }
      ]
    }
  ];

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