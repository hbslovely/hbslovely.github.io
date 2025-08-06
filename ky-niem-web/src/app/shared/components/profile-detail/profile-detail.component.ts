import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunFact, Profile } from '../../models/profile.model';
import { SweetMomentsComponent } from '../sweet-moments/sweet-moments.component';

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [CommonModule, SweetMomentsComponent],
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
  host: {
    '[style.--primary-color-transparent]': 'getThemeTransparentColor()'
  }
})
export class ProfileDetailComponent implements OnInit {
  @Input() profile!: Profile;
  @Input() themeClass: string = '';
  @Input() funFacts!: FunFact[];

  ngOnInit() {
    // Initialize theme colors
    this.getThemeTransparentColor();
  }

  getThemeTransparentColor(): string {
    return this.themeClass.includes('wife-theme')
      ? 'rgba(219, 112, 147, 0.8)'  // Pink theme
      : 'rgba(70, 130, 180, 0.8)';  // Blue theme
  }

  static mapToProfile(data: any): Profile {
    return {
      name: data.basicInfo.name,
      title: data.basicInfo.title,
      avatar: data.basicInfo.avatar,
      headerImage: data.basicInfo.headerImage || data.photos?.[0]?.url || data.basicInfo.avatar,
      description: data.basicInfo.description,
      loveMessage: data.basicInfo.loveMessage,
      basicInfo: [
        { label: 'Ngày sinh', value: data.basicInfo.stats[0].value, icon: 'fas fa-birthday-cake' },
        { label: 'Nơi sinh', value: data.basicInfo.stats[1].value, icon: 'fas fa-home' },
        { label: 'Nghề nghiệp', value: data.basicInfo.stats[2].value, icon: 'fas fa-briefcase' }
      ],
      hobbies: data.hobbies.map((hobby: any) => ({
        name: hobby.name,
        icon: hobby.icon
      })),
      lifeGoals: data.traits.map((trait: any) => trait.description),
      loveStory: [data.basicInfo.description],
      sweetMoments: data.photos?.slice(0, 6).map((photo: any) => ({
        imageUrl: photo.url,
        title: photo.caption,
        description: photo.description,
        date: photo.date
      })) || []
    };
  }
}
