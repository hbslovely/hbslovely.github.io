import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Promise, Goal } from '../../../shared/models';

@Component({
  selector: 'app-future-promises',
  templateUrl: './future-promises.component.html',
  styleUrls: ['./future-promises.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class FuturePromisesComponent implements OnInit {
  promises: Promise[] = [
    {
      id: 1,
      title: 'Luôn Bên Nhau',
      description: 'Hứa sẽ luôn ở bên nhau, chia sẻ mọi niềm vui nỗi buồn và cùng nhau vượt qua mọi khó khăn.',
      icon: 'pi-heart',
      tags: ['Tình yêu', 'Cam kết']
    },
    {
      id: 2,
      title: 'Xây Dựng Tổ Ấm',
      description: 'Cùng nhau xây dựng một tổ ấm hạnh phúc, nơi chúng ta có thể chia sẻ những khoảnh khắc đáng nhớ.',
      icon: 'pi-home',
      tags: ['Gia đình', 'Tương lai']
    }
  ];

  goals: Goal[] = [
    {
      id: 1,
      title: 'Mua Nhà Chung',
      timeframe: 'Trong 2 năm tới',
      icon: 'pi-home'
    },
    {
      id: 2,
      title: 'Du Lịch Châu Âu',
      timeframe: 'Trong 3 năm tới',
      icon: 'pi-globe'
    },
    {
      id: 3,
      title: 'Sinh Em Bé',
      timeframe: 'Trong 1 năm tới',
      icon: 'pi-heart'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
} 