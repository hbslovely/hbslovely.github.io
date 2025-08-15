import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbIconModule } from '@nebular/theme';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, NbIconModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {}
