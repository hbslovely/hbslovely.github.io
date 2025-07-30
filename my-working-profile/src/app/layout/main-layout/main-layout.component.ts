import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { WatermarkComponent } from '../../components/watermark/watermark.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, WatermarkComponent, NzIconModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  readonly currentYear = new Date().getFullYear();
  readonly linkedInUrl = 'https://www.linkedin.com/in/hpphat1992/';
  readonly githubUrl = 'https://github.com/hpphat92';
}
