import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderViewComponent } from './components/order-view/order-view.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order/:id', component: OrderViewComponent },
  { path: '**', redirectTo: '' }
];
