import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { AboutComponent } from './components/about/about.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order/:id', component: OrderViewComponent }
];

export const routeProviders = [
  { provide: LocationStrategy, useClass: HashLocationStrategy }
];
