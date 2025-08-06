import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunFact, Profile } from '../../models';

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent {
  @Input() profile!: Profile;
  @Input() themeClass: string = '';
  @Input() funFacts!: FunFact[];


  static mapToProfile(data: any): Profile {
    return {
      name: data.basicInfo.name,
      title: data.basicInfo.title,
      avatar: data.basicInfo.avatar,
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
      loveStory: [data.basicInfo.description]
    };
  }
}
