import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumGalleryComponent, AlbumGalleryImage } from '../../shared/components/album-gallery/album-gallery.component';
import { AlbumHeaderComponent } from './components/album-header/album-header.component';
import { AlbumDetailHeaderComponent } from './components/album-detail-header/album-detail-header.component';

interface Photo {
  id: string | number;
  url: string;
  title: string;
  description?: string;
}

interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  photoCount: number;
  photos: Photo[];
}

@Component({
  selector: 'app-album-anh',
  standalone: true,
  imports: [ CommonModule, AlbumGalleryComponent, AlbumHeaderComponent, AlbumDetailHeaderComponent ],
  templateUrl: './album-anh.component.html',
  styleUrls: ['./album-anh.component.scss']
})
export class AlbumAnhComponent implements OnInit {
  albums: Album[] = [];
  selectedAlbumId: string | null = null;
  selectedAlbum: Album | null = null;
  selectedAlbumPhotos: AlbumGalleryImage[] = [];
  selectedPhoto: Photo | null = null;
  viewMode: 'grid' | 'list' = 'grid';
  detailViewMode: 'masonry' | 'carousel' = 'masonry';
  currentSlide = 0;

  async ngOnInit() {
    try {
      const response = await fetch('assets/data/album-data.json');
      const data = await response.json();
      this.albums = data.albums;
    } catch (error) {
      console.error('Error loading album data:', error);
    }
  }

  getTotalPhotos(): number {
    return this.albums.reduce((total, album) => total + album.photoCount, 0);
  }

  openAlbum(albumId: string) {
    this.selectedAlbumId = albumId;
    this.selectedAlbum = this.albums.find(album => album.id === albumId) || null;
    if (this.selectedAlbum) {
      this.selectedAlbumPhotos = this.selectedAlbum.photos.map(photo => ({
        src: photo.url,
        name: photo.title,
        description: photo.description
      }));
    } else {
      this.selectedAlbumPhotos = [];
    }
    this.currentSlide = 0;
  }

  goBack() {
    this.selectedAlbumId = null;
    this.selectedAlbum = null;
    this.selectedAlbumPhotos = [];
    this.selectedPhoto = null;
  }

  setDetailViewMode(mode: 'masonry' | 'carousel') {
    this.detailViewMode = mode;
    if (mode === 'carousel') {
      this.currentSlide = 0;
    }
  }

  openPhotoViewer(photo: Photo) {
    this.selectedPhoto = photo;
  }

  closePhotoViewer() {
    this.selectedPhoto = null;
  }

  prevPhoto(event: Event) {
    event.stopPropagation();
    const currentIndex = this.selectedAlbum?.photos.findIndex(photo => photo.id === this.selectedPhoto?.id) ?? -1;
    if (currentIndex > 0 && this.selectedAlbum) {
      this.selectedPhoto = this.selectedAlbum.photos[currentIndex - 1];
    }
  }

  nextPhoto(event: Event) {
    event.stopPropagation();
    const currentIndex = this.selectedAlbum?.photos.findIndex(photo => photo.id === this.selectedPhoto?.id) ?? -1;
    if (this.selectedAlbum && currentIndex < this.selectedAlbum.photos.length - 1) {
      this.selectedPhoto = this.selectedAlbum.photos[currentIndex + 1];
    }
  }

  canNavigatePrev(): boolean {
    if (!this.selectedPhoto || !this.selectedAlbum) return false;
    const currentIndex = this.selectedAlbum.photos.findIndex(photo => photo.id === this.selectedPhoto?.id);
    return currentIndex > 0;
  }

  canNavigateNext(): boolean {
    if (!this.selectedPhoto || !this.selectedAlbum) return false;
    const currentIndex = this.selectedAlbum.photos.findIndex(photo => photo.id === this.selectedPhoto?.id);
    return currentIndex < this.selectedAlbum.photos.length - 1;
  }

  getMasonryColumns(): Photo[][] {
    const columns: Photo[][] = [[], [], []];
    if (this.selectedAlbum) {
      this.selectedAlbum.photos.forEach((photo, index) => {
        columns[index % 3].push(photo);
      });
    }
    return columns;
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  nextSlide() {
    if (this.selectedAlbumPhotos && this.currentSlide < this.selectedAlbumPhotos.length - 1) {
      this.currentSlide++;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  getRandomPreviewPhotos(count: number): string[] {
    const allPhotos = this.albums.reduce((photos, album) => {
      return photos.concat(album.photos.map(p => p.url));
    }, [] as string[]);

    const shuffled = allPhotos.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  getAlbumPreviewPhotos(album: any): string[] {
    return album.photos.slice(0, 5).map((photo: any) => photo.url);
  }
}
