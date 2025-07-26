import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  HappyMoment,
  Promise,
  Goal,
  LoveStatistics,
  MomentCategory
} from '../../shared/models/love.model';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ParallaxHeaderComponent } from '../../shared/components/parallax-header/parallax-header.component';
import { LoveStatisticsComponent } from '../../shared/components/love-statistics/love-statistics.component';
import { SpecialMomentsComponent } from '../../shared/components/special-moments/special-moments.component';
import { OurSongsComponent } from '../../shared/components/our-songs/our-songs.component';
import { MemoryPlacesComponent } from '../../shared/components/memory-places/memory-places.component';
import { LoveQuotesComponent } from '../../shared/components/love-quotes/love-quotes.component';
import { MeaningfulGiftsComponent } from '../../shared/components/meaningful-gifts/meaningful-gifts.component';
import { FavoriteFoodsComponent } from '../../shared/components/favorite-foods/favorite-foods.component';
import { MemoryGalleryComponent } from '../../shared/components/memory-gallery/memory-gallery.component';
import { GratitudeMessagesComponent } from '../../shared/components/gratitude-messages/gratitude-messages.component';
import { LoveTimelineComponent } from '../../shared/components/love-timeline/love-timeline.component';
import { HappyMomentsComponent } from '../../shared/components/happy-moments/happy-moments.component';
import { FuturePromisesComponent } from '../../shared/components/future-promises/future-promises.component';

@Component({
  selector: 'app-chao-mung',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ParallaxHeaderComponent,
    LoveStatisticsComponent,
    SpecialMomentsComponent,
    OurSongsComponent,
    MemoryPlacesComponent,
    LoveQuotesComponent,
    MeaningfulGiftsComponent,
    FavoriteFoodsComponent,
    MemoryGalleryComponent,
    GratitudeMessagesComponent,
    LoveTimelineComponent,
    HappyMomentsComponent,
    FuturePromisesComponent
  ],
  templateUrl: './chao-mung.component.html',
  styleUrls: ['./chao-mung.component.scss']
})
export class ChaoMungComponent implements OnInit {
  memories: any[] = [];
  timeline: any[] = [];
  loveStatistics: any = {};
  specialMoments: any[] = [];
  ourSongs: any[] = [];
  memoryPlaces: any[] = [];
  loveQuotes: any[] = [];
  meaningfulGifts: any[] = [];
  favoriteFoods: any[] = [];

  // Array for floating hearts
  floatingHearts = Array(15).fill(0).map((_, i) => i + 1);

  happyMoments: HappyMoment[] = [];
  momentCategories: MomentCategory[] = [];
  futurePromises: Promise[] = [];
  commonGoals: Goal[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadLoveStatistics();
    this.loadHappyMoments();
    this.loadFutureGoals();
    this.loadMemoriesData();
  }

  private loadMemoriesData() {
    this.http.get<any>('assets/data/memories-data.json').subscribe({
      next: (data) => {
        this.memories = data.memoriesGallery;
        this.timeline = data.timeline;
        this.loveStatistics = data.loveStatistics;
        this.specialMoments = data.specialMoments;
        this.ourSongs = data.ourSongs;
        this.memoryPlaces = data.memoryPlaces;
        this.loveQuotes = data.loveQuotes;
        this.meaningfulGifts = data.meaningfulGifts;
        this.favoriteFoods = data.favoriteFoods;
      },
      error: (error) => {
      }
    });
  }

  private loadLoveStatistics(): void {
    this.http.get<LoveStatistics>('assets/data/love-statistics.json')
      .subscribe(data => {
        this.loveStatistics = data;
      });
  }

  private loadHappyMoments(): void {
    this.http.get<{happyMoments: HappyMoment[], momentCategories: MomentCategory[]}>('assets/data/happy-moments.json')
      .subscribe(data => {
        this.happyMoments = data.happyMoments;
        this.momentCategories = data.momentCategories;
      });
  }

  private loadFutureGoals(): void {
    this.http.get<{promises: Promise[], goals: Goal[]}>('assets/data/future-goals.json')
      .subscribe(data => {
        this.futurePromises = data.promises;
        this.commonGoals = data.goals;
      });
  }
}
