import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface GalleryImage {
  src: string;
  name: string;
  description: string;
}

interface Gallery {
  id: string;
  title: string;
  images: GalleryImage[];
}

interface GalleryConfig {
  icons: Record<string, string>;
}

interface GalleryData {
  config: GalleryConfig;
  galleries: Gallery[];
}

interface GalleryControl {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-memory-gallery',
  templateUrl: './memory-gallery.component.html',
  styleUrls: ['./memory-gallery.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MemoryGalleryComponent implements OnInit {
  galleries: Gallery[] = [];
  displayedMemories: GalleryImage[] = [];
  allMemories: GalleryImage[] = [];
  currentFilter: string = 'all';
  viewMode: 'carousel' | 'masonry' | 'cards' = 'carousel';
  loading: boolean = false;
  hasMoreImages: boolean = false;
  galleryControls: GalleryControl[] = [];
  
  // Pagination
  private readonly itemsPerPage = 12;
  private currentPage = 1;
  
  // Carousel specific properties
  currentSlideIndex: number = 0;
  autoPlayInterval: any;
  isPlaying: boolean = true;
  
  private icons: Record<string, string> = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadGalleryData();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  private loadGalleryData() {
    this.http.get<GalleryData>('assets/data/gallery-data.json').subscribe(data => {
      this.galleries = data.galleries;
      this.icons = data.config.icons;
      this.setupGalleryControls();
      this.updateDisplayedMemories();
      this.startAutoPlay();
    });
  }

  private setupGalleryControls() {
    // Add the "All" control first
    this.galleryControls = [{
      id: 'all',
      title: 'Tất cả',
      icon: this.icons['all']
    }];

    // Add controls for each gallery
    this.galleries.forEach(gallery => {
      this.galleryControls.push({
        id: gallery.id,
        title: gallery.title,
        icon: this.icons[gallery.id] || 'pi-image' // Fallback icon if not found in config
      });
    });
  }

  filterImages(category: string) {
    this.currentFilter = category;
    this.currentPage = 1; // Reset pagination when filter changes
    this.updateDisplayedMemories();
    this.currentSlideIndex = 0;
  }

  changeView(mode: 'carousel' | 'masonry' | 'cards') {
    this.viewMode = mode;
    if (mode === 'carousel') {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  private updateDisplayedMemories() {
    // Get all images for current filter
    if (this.currentFilter === 'all') {
      this.allMemories = this.galleries.reduce((acc, gallery) => [...acc, ...gallery.images], [] as GalleryImage[]);
    } else {
      const gallery = this.galleries.find(g => g.id === this.currentFilter);
      this.allMemories = gallery ? gallery.images : [];
    }

    // Apply pagination
    const startIndex = 0;
    const endIndex = this.currentPage * this.itemsPerPage;
    this.displayedMemories = this.allMemories.slice(startIndex, endIndex);
    
    // Check if there are more images to load
    this.hasMoreImages = this.allMemories.length > endIndex;
  }

  loadMore() {
    if (this.loading || !this.hasMoreImages) return;

    this.loading = true;
    // Simulate loading delay
    setTimeout(() => {
      this.currentPage++;
      this.updateDisplayedMemories();
      this.loading = false;
    }, 500);
  }

  // Carousel Controls
  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.displayedMemories.length;
  }

  prevSlide() {
    this.currentSlideIndex = this.currentSlideIndex === 0 
      ? this.displayedMemories.length - 1 
      : this.currentSlideIndex - 1;
  }

  goToSlide(index: number) {
    this.currentSlideIndex = index;
  }

  startAutoPlay() {
    if (this.viewMode === 'carousel' && !this.autoPlayInterval) {
      this.isPlaying = true;
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000); // Change slide every 5 seconds
    }
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
      this.isPlaying = false;
    }
  }

  toggleAutoPlay() {
    if (this.isPlaying) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  openLightbox(memory: GalleryImage) {
    // Implement lightbox functionality here
    console.log('Opening lightbox for:', memory);
  }

  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.classList.add('loaded');
    }
  }
}
