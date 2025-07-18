import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {
  @Input() name: string = '';
  @Input() nickname: string = '';
  @Input() backgroundImage: string = '';
  @Input() avatarImage: string = '';
  @Input() basicInfo: any = {};

  // Animation states
  isVisible = false;

  ngOnInit() {
    // Trigger animation after component loads
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }
} 