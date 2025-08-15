import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  NbLayoutModule,
  NbButtonModule,
  NbIconModule,
  NbBadgeModule
} from '@nebular/theme';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    NbBadgeModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getCartItems().subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }
} 