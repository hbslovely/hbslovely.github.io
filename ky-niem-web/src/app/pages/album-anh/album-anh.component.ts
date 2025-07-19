import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ParallaxHeaderComponent } from '../../shared/components/parallax-header/parallax-header.component';

interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  folderPath: string;
  photoCount: number;
}

interface Photo {
  url: string;
  title: string;
  description?: string;
}

type DetailViewMode = 'grid' | 'masonry' | 'carousel';

@Component({
  selector: 'app-album-anh',
  standalone: true,
  imports: [CommonModule, RouterModule, ParallaxHeaderComponent],
  templateUrl: './album-anh.component.html',
  styleUrls: ['./album-anh.component.scss']
})
export class AlbumAnhComponent implements OnInit {
  viewMode: 'grid' | 'list' = 'grid';
  detailViewMode: DetailViewMode = 'grid';
  currentSlide = 0;
  selectedPhoto: Photo | null = null;
  masonryColumns = 3;

  albums: Album[] = [
    {
      id: 'doi-thuong',
      title: 'Đời Thường',
      description: 'Những khoảnh khắc đời thường đáng yêu của chúng mình',
      coverImage: 'assets/images/albums/doi-thuong/1.png',
      folderPath: 'assets/images/albums/doi-thuong',
      photoCount: 7
    },
    {
      id: 'du-lich',
      title: 'Du Lịch',
      description: 'Những chuyến đi và khám phá thú vị cùng nhau',
      coverImage: 'assets/images/albums/du-lich/1.png',
      folderPath: 'assets/images/albums/du-lich',
      photoCount: 6
    },
    {
      id: 'ngay-cuoi',
      title: 'Ngày Cưới',
      description: 'Album kỷ niệm ngày trọng đại của chúng mình (03/2022)',
      coverImage: 'assets/images/albums/ngay-cuoi_3-2022/1.png',
      folderPath: 'assets/images/albums/ngay-cuoi_3-2022',
      photoCount: 9
    }
  ];

  selectedAlbumId: string | null = null;
  selectedAlbum: Album | null = null;
  selectedAlbumPhotos: Photo[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @HostListener('window:resize')
  onResize() {
    this.updateMasonryColumns();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const albumId = params['id'];
      if (albumId) {
        this.loadAlbum(albumId);
      }
    });

    const savedViewMode = localStorage.getItem('albumViewMode');
    if (savedViewMode === 'grid' || savedViewMode === 'list') {
      this.viewMode = savedViewMode;
    }

    const savedDetailViewMode = localStorage.getItem('albumDetailViewMode') as DetailViewMode;
    if (savedDetailViewMode) {
      this.detailViewMode = savedDetailViewMode;
    }

    this.updateMasonryColumns();
  }

  updateMasonryColumns() {
    if (window.innerWidth < 768) {
      this.masonryColumns = 1;
    } else if (window.innerWidth < 1024) {
      this.masonryColumns = 2;
    } else {
      this.masonryColumns = 3;
    }
  }

  loadAlbum(albumId: string) {
    this.selectedAlbumId = albumId;
    this.selectedAlbum = this.albums.find(a => a.id === albumId) || null;
    
    if (this.selectedAlbum) {
      this.loadAlbumPhotos(this.selectedAlbum);
    }
  }

  loadAlbumPhotos(album: Album) {
    this.selectedAlbumPhotos = Array.from({ length: album.photoCount }, (_, i) => ({
      url: `${album.folderPath}/${i + 1}.png`,
      title: `Khoảnh khắc ${i + 1}`,
      description: `Một khoảnh khắc đáng nhớ trong album ${album.title}`
    }));
  }

  openAlbum(albumId: string) {
    this.router.navigate(['/album-anh', albumId]);
  }

  goBack() {
    this.selectedAlbumId = null;
    this.selectedAlbum = null;
    this.selectedAlbumPhotos = [];
    this.router.navigate(['/album-anh']);
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
    localStorage.setItem('albumViewMode', mode);
  }

  setDetailViewMode(mode: DetailViewMode) {
    this.detailViewMode = mode;
    localStorage.setItem('albumDetailViewMode', mode);
    if (mode === 'carousel') {
      this.currentSlide = 0;
    }
  }

  getMasonryColumns(): Photo[][] {
    const columns: Photo[][] = Array.from({ length: this.masonryColumns }, () => []);
    this.selectedAlbumPhotos.forEach((photo, index) => {
      columns[index % this.masonryColumns].push(photo);
    });
    return columns;
  }

  // Carousel Controls
  nextSlide() {
    if (this.currentSlide < this.selectedAlbumPhotos.length - 1) {
      this.currentSlide++;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  // Fullscreen Photo Viewer
  openPhotoViewer(photo: Photo) {
    this.selectedPhoto = photo;
    document.body.style.overflow = 'hidden';
  }

  closePhotoViewer() {
    this.selectedPhoto = null;
    document.body.style.overflow = '';
  }

  prevPhoto(event: Event) {
    event.stopPropagation();
    const currentIndex = this.selectedAlbumPhotos.findIndex(p => p.url === this.selectedPhoto?.url);
    if (currentIndex > 0) {
      this.selectedPhoto = this.selectedAlbumPhotos[currentIndex - 1];
    }
  }

  nextPhoto(event: Event) {
    event.stopPropagation();
    const currentIndex = this.selectedAlbumPhotos.findIndex(p => p.url === this.selectedPhoto?.url);
    if (currentIndex < this.selectedAlbumPhotos.length - 1) {
      this.selectedPhoto = this.selectedAlbumPhotos[currentIndex + 1];
    }
  }

  canNavigatePrev(): boolean {
    const currentIndex = this.selectedAlbumPhotos.findIndex(p => p.url === this.selectedPhoto?.url);
    return currentIndex > 0;
  }

  canNavigateNext(): boolean {
    const currentIndex = this.selectedAlbumPhotos.findIndex(p => p.url === this.selectedPhoto?.url);
    return currentIndex < this.selectedAlbumPhotos.length - 1;
  }

  getTotalPhotos(): number {
    return this.albums.reduce((total, album) => total + album.photoCount, 0);
  }
}
