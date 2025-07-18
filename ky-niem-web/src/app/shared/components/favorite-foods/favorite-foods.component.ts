import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonFilterPipe } from '../../pipes/person-filter.pipe';

interface Food {
  person: string;
  dish: string;
  story: string;
  feeling: string;
}

@Component({
  selector: 'app-favorite-foods',
  standalone: true,
  imports: [CommonModule, PersonFilterPipe],
  templateUrl: './favorite-foods.component.html',
  styleUrls: ['./favorite-foods.component.scss']
})
export class FavoriteFoodsComponent {
  foods: Food[] = [
    {
      person: 'Chồng',
      dish: 'Bún bò Huế',
      story: 'Món ăn yêu thích từ thời sinh viên',
      feeling: 'Nhớ mãi hương vị quê nhà'
    },
    {
      person: 'Chồng',
      dish: 'Cơm tấm sườn',
      story: 'Bữa sáng năng lượng cho ngày mới',
      feeling: 'Hương vị Sài Gòn thân thương'
    },
    {
      person: 'Chồng',
      dish: 'Bánh canh cua',
      story: 'Món ngon cuối tuần thư giãn',
      feeling: 'Ấm bụng, ấm lòng'
    },
    {
      person: 'Vợ',
      dish: 'Phở gà',
      story: 'Món ăn truyền thống gia đình',
      feeling: 'Ấm áp tình thương'
    },
    {
      person: 'Vợ', 
      dish: 'Bánh mì thịt nướng',
      story: 'Bữa sáng yêu thích mỗi ngày',
      feeling: 'Năng lượng tràn đầy'
    },
    {
      person: 'Vợ',
      dish: 'Bún chả',
      story: 'Món ngon đậm đà Hà Nội',
      feeling: 'Hương vị khó quên'
    }
  ];
} 