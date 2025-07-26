import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlbumHeaderComponent } from './components/album-header/album-header.component';
import { AlbumDetailHeaderComponent } from './components/album-detail-header/album-detail-header.component';

interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  photoCount: number;
}

interface AlbumData {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  photos: string[];
}

@Component({
  selector: 'app-album-anh',
  standalone: true,
  imports: [ CommonModule, AlbumHeaderComponent, AlbumDetailHeaderComponent ],
  templateUrl: './album-anh.component.html',
  styleUrls: ['./album-anh.component.scss']
})
export class AlbumAnhComponent implements OnInit {
  albums: Album[] = [];
  viewMode: 'grid' | 'list' = 'grid';

  constructor(private router: Router) {}

  async ngOnInit() {
    try {
      const response = await fetch('assets/data/album-data.json');
      const data: { albums: AlbumData[] } = await response.json();
      this.albums = data.albums.map((album: AlbumData) => ({
        id: album.id,
        title: album.title,
        description: album.description,
        coverImage: album.coverImage,
        photoCount: album.photos.length
      }));
    } catch (error) {
      console.error('Error loading album data:', error);
    }
  }

  getTotalPhotos(): number {
    return this.albums.reduce((total, album) => total + album.photoCount, 0);
  }

  getRandomPreviewPhotos(count: number): string[] {
    const allPhotos = this.albums.flatMap(album => [album.coverImage]);
    const shuffled = [...allPhotos].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  openAlbum(id: string) {
    this.router.navigate(['/album-anh', id]);
  }
}
