import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Memory {
  id: number;
  src: string;
  thumbnail: string;
  description: string;
  date: string;
  category: 'couple' | 'travel' | 'daily';
}

@Component({
  selector: 'app-memory-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memory-gallery.component.html',
  styleUrls: ['./memory-gallery.component.scss']
})
export class MemoryGalleryComponent implements OnInit {
  memories: Memory[] = [];
  displayedMemories: Memory[] = [];
  selectedImage: Memory | null = null;
  currentFilter: string = 'all';
  viewMode: 'grid' | 'masonry' = 'grid';
  loading: boolean = false;
  hasMoreImages: boolean = true;
  private page: number = 1;
  private pageSize: number = 12;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadGalleryData();
  }

  private loadGalleryData() {
    this.http.get<{gallery: Memory[]}>('assets/data/gallery-data.json')
      .subscribe(data => {
        this.memories = data.gallery.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.loadInitialImages();
      });
  }

  private loadInitialImages() {
    this.displayedMemories = this.memories.slice(0, this.pageSize);
    this.hasMoreImages = this.memories.length > this.pageSize;
  }

  filterImages(category: string) {
    this.currentFilter = category;
    this.page = 1;
    
    if (category === 'all') {
      this.displayedMemories = this.memories.slice(0, this.pageSize);
    } else {
      const filtered = this.memories.filter(m => m.category === category);
      this.displayedMemories = filtered.slice(0, this.pageSize);
    }
    
    this.updateHasMoreImages();
  }

  changeView(mode: 'grid' | 'masonry') {
    this.viewMode = mode;
  }

  loadMore() {
    this.loading = true;
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    
    setTimeout(() => {
      let newImages: Memory[];
      
      if (this.currentFilter === 'all') {
        newImages = this.memories.slice(start, end);
      } else {
        const filtered = this.memories.filter(m => m.category === this.currentFilter);
        newImages = filtered.slice(start, end);
      }
      
      this.displayedMemories = [...this.displayedMemories, ...newImages];
      this.page++;
      this.loading = false;
      this.updateHasMoreImages();
    }, 800);
  }

  private updateHasMoreImages() {
    const totalImages = this.currentFilter === 'all' 
      ? this.memories.length 
      : this.memories.filter(m => m.category === this.currentFilter).length;
    
    this.hasMoreImages = this.displayedMemories.length < totalImages;
  }

  openLightbox(memory: Memory) {
    this.selectedImage = memory;
  }

  closeLightbox() {
    this.selectedImage = null;
  }

  showPrevImage() {
    if (!this.selectedImage) return;
    
    const currentIndex = this.displayedMemories.indexOf(this.selectedImage);
    if (currentIndex > 0) {
      this.selectedImage = this.displayedMemories[currentIndex - 1];
    }
  }

  showNextImage() {
    if (!this.selectedImage) return;
    
    const currentIndex = this.displayedMemories.indexOf(this.selectedImage);
    if (currentIndex < this.displayedMemories.length - 1) {
      this.selectedImage = this.displayedMemories[currentIndex + 1];
    }
  }

  get hasPrevImage(): boolean {
    if (!this.selectedImage) return false;
    return this.displayedMemories.indexOf(this.selectedImage) > 0;
  }

  get hasNextImage(): boolean {
    if (!this.selectedImage) return false;
    return this.displayedMemories.indexOf(this.selectedImage) < this.displayedMemories.length - 1;
  }

  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    if (this.viewMode === 'masonry') {
      img.classList.add('loaded');
    }
  }
} 