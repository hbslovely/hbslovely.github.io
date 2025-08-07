import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileMapperService {
  mapToProfile(data: any): any {
    return {
      name: data.basicInfo.name,
      title: data.basicInfo.title,
      avatar: data.basicInfo.avatar,
      headerImage: data.basicInfo.headerImage || data.photos?.[0]?.url || data.basicInfo.avatar,
      description: data.basicInfo.description,
      loveMessage: data.basicInfo.loveMessage,
      gender: data.basicInfo.gender || 'male', // Default to male if not specified
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
