import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface AlbumGalleryImage {
  src: string;
  name?: string;
  description?: string;
  caption?: string;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  photoCount: number;
  photos: {
    id: string;
    url: string;
    title: string;
    description: string;
  }[];
}

@Component({
  selector: 'app-album-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-gallery.component.html',
  styleUrls: ['./album-gallery.component.scss']
})
export class AlbumGalleryComponent implements OnInit, OnDestroy {
  @Input() albumId?: string;
  @Input() images: AlbumGalleryImage[] = [];
  
  selectedIndex = 0;
  private autoPlayInterval: any;
  private readonly AUTO_PLAY_INTERVAL = 4000;
  isTransitioning = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.albumId) {
      this.loadAlbumData();
    }
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  private loadAlbumData() {
    this.http.get<{ albums: Album[] }>('assets/data/album-data.json').subscribe(data => {
      const album = data.albums.find(a => a.id === this.albumId);
      if (album) {
        this.images = album.photos.map(photo => ({
          src: photo.url,
          name: photo.title,
          description: photo.description
        }));
      }
    });
  }

  selectImage(index: number) {
    if (index === this.selectedIndex) return;
    this.triggerTransition(() => {
      this.selectedIndex = index;
    });
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  private startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.triggerTransition(() => {
        this.nextImage();
      });
    }, this.AUTO_PLAY_INTERVAL);
  }

  private stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  nextImage() {
    if (this.images.length > 0) {
      this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
    }
  }

  private triggerTransition(changeFn: () => void) {
    this.isTransitioning = true;
    setTimeout(() => {
      changeFn();
      this.isTransitioning = false;
    }, 350); // match CSS transition duration
  }
} 