import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FunFactsCardComponent } from '../../shared/components/fun-facts-card/fun-facts-card.component';
import { ProfileDetailComponent } from '../../shared/components/profile-detail/profile-detail.component';
import { Profile, ProfileData } from '../../shared/models';

@Component({
  selector: 'app-thong-tin-vo',
  standalone: true,
  imports: [CommonModule, FunFactsCardComponent, ProfileDetailComponent],
  templateUrl: './thong-tin-vo.component.html',
  styleUrls: ['./thong-tin-vo.component.scss'],
  host: {
    'class': 'wife-profile'
  }
})
export class ThongTinVoComponent implements OnInit {
  profileData: ProfileData | null = null;
  wifeProfile: Profile | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProfileData();
  }

  private loadProfileData() {
    this.http.get<ProfileData>('assets/data/wife-data.json').subscribe({
      next: (data) => {
        this.profileData = data;
        this.wifeProfile = ProfileDetailComponent.mapToProfile(data);
      },
      error: (error) => {
        console.error('Error loading wife data:', error);
      }
    });
  }
}
