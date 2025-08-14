import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TranslateModule
  ],
  template: `
    <div class="discover-container">
      <div class="discover-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .discover-container {
      padding: 2rem 0;
    }

    .discover-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
  `]
})
export class DiscoverComponent {} 