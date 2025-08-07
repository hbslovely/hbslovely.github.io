import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hobby } from '../../models/profile.model';

@Component({
  selector: 'app-profile-hobbies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-hobbies.component.html',
  styleUrls: ['./profile-hobbies.component.scss']
})
export class ProfileHobbiesComponent {
  @Input() hobbies: Hobby[] = [];
} 