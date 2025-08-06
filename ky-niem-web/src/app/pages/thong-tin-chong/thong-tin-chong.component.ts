import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FunFactsCardComponent } from '../../shared/components/fun-facts-card/fun-facts-card.component';
import { ProfileDetailComponent } from '../../shared/components/profile-detail/profile-detail.component';
import { Profile, ProfileData } from '../../shared/models';

@Component({
  selector: 'app-thong-tin-chong',
  standalone: true,
  imports: [CommonModule, FunFactsCardComponent, ProfileDetailComponent],
  templateUrl: './thong-tin-chong.component.html',
  styleUrls: ['./thong-tin-chong.component.scss'],
  host: {
    'class': 'husband-profile'
  }
})
export class ThongTinChongComponent implements OnInit {
  profileData: ProfileData | null = null;
  husbandProfile: Profile | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProfileData();
  }

  private loadProfileData() {
    this.http.get<ProfileData>('assets/data/husband-data.json').subscribe({
      next: (data) => {
        this.profileData = data;
        this.husbandProfile = ProfileDetailComponent.mapToProfile(data);
      },
      error: (error) => {
        console.error('Error loading husband data:', error);
      }
    });
  }
}
