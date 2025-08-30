import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule, Location, NgClass } from '@angular/common';
import { WardsService, Ward } from '../../../../../core';
import { WardCardComponent } from '../components/ward-card/ward-card.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ShareDialogComponent } from '../components/share-dialog/share-dialog.component';

@Component({
  selector: 'app-ward-detail',
  standalone: true,
  imports: [ 
    CommonModule, 
    TranslateModule, 
    NgClass, 
    WardCardComponent
  ],
  providers: [DialogService],
  templateUrl: './ward-detail.component.html',
  styleUrls: ['./ward-detail.component.scss']
})
export class WardDetailComponent implements OnInit {
  ward: Ward | null = null;
  featureIcons: { [key: string]: string } = {
    'FEATURES.HISTORIC_SITE': 'fa-landmark',
    'FEATURES.CULTURAL_HERITAGE': 'fa-theater-masks',
    'FEATURES.COMMERCIAL_HUB': 'fa-store',
    'FEATURES.RESIDENTIAL_AREA': 'fa-home',
    'FEATURES.INDUSTRIAL_ZONE': 'fa-industry',
    'FEATURES.TOURIST_ATTRACTION': 'fa-camera',
    'FEATURES.WATERFRONT': 'fa-water',
    'FEATURES.GREEN_SPACE': 'fa-tree',
    'FEATURES.EDUCATION_HUB': 'fa-graduation-cap',
    'FEATURES.TRADITIONAL_MARKET': 'fa-shopping-basket',
    'FEATURES.MODERN_DEVELOPMENT': 'fa-city',
    'FEATURES.ENVIRONMENTAL_CONSERVATION': 'fa-leaf',
    'FEATURES.COMMUNITY_CENTER': 'fa-users',
    'FEATURES.PORT_FACILITY': 'fa-ship',
    'FEATURES.LOGISTICS_HUB': 'fa-truck',
    'FEATURES.TRANSPORT_HUB': 'fa-bus',
    'FEATURES.RELIGIOUS_SITE': 'fa-pray',
    'FEATURES.MARITIME_TRADE': 'fa-anchor',
    'FEATURES.FISHING_INDUSTRY': 'fa-fish',
    'FEATURES.TRADITIONAL_CRAFT': 'fa-tools'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private translateService: TranslateService,
    private wardsService: WardsService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const wardId = params['id'];
      this.loadWardData(wardId);
    });

    // Subscribe to language changes
    this.translateService.onLangChange.subscribe(() => {
      if (this.ward?.id) {
        this.loadWardData(this.ward.id);
      }
    });
  }

  private loadWardData(wardId: string) {
    this.wardsService.getWards(this.translateService.currentLang)
      .subscribe(wards => {
        const ward = wards.find(w => w.id === wardId);
        if (ward) {
          this.ward = {
            ...ward,
            image: `assets/images/wards/${ward.id}.jpg`,
            landmarks: ward.landmarks?.map(landmark => ({
              ...landmark,
              images: landmark.images?.map(img =>
                img.startsWith('assets/') ? img : `assets/images/places/${landmark.id}.jpg`
              )
            }))
          };
        } else {
          // Ward not found, redirect to wards list
          this.router.navigate(['/discover/wards']);
        }
      });
  }

  getFeatureIcon(feature: string): string {
    return this.featureIcons[feature] || 'fa-star';
  }

  viewLandmark(landmark: any) {
    // TODO: Implement landmark detail view
    console.log('Viewing landmark:', landmark.name);
  }

  goBack() {
    this.location.back();
  }

  shareWard() {
    if (this.ward) {
      this.dialogService.open(ShareDialogComponent, {
        header: this.translateService.instant('WARD.SHARE.TITLE'),
        width: '500px',
        modal: true,
        dismissableMask: true,
        styleClass: 'share-dialog-modal',
        data: {
          title: this.translateService.instant(this.ward.name || ''),
          description: this.translateService.instant(this.ward.description || ''),
          image: this.ward.image || 'assets/images/wards/default.jpg',
          url: window.location.href
        }
      });
    }
  }
}
