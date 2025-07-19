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
  quote?: string;
  author: string;
}

type ViewMode = 'grid' | 'masonry' | 'carousel' | 'timeline' | 'cards';
type FilterType = 'all' | 'couple' | 'travel' | 'daily';

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
  currentFilter: FilterType = 'all';
  viewMode: ViewMode = 'grid';
  loading: boolean = false;
  hasMoreImages: boolean = true;
  currentSlide = 0;
  private page: number = 1;
  private pageSize: number = 6; // Reduced from 12 to 6

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadGalleryData();
  }

  private loadGalleryData() {
    this.http.get<{gallery: Memory[]}>('assets/data/gallery-data.json')
      .subscribe(data => {
        this.memories = data.gallery
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map(memory => ({
            ...memory,
            quote: this.getRandomQuote(memory.category) // Add random quotes to memories
          }));
        this.loadInitialImages();
      });
  }

  private getRandomQuote(category: string): string {
    const quotes = {
      couple: [
        "Mỗi khoảnh khắc bên nhau đều là kỷ niệm đẹp",
        "Nụ cười em là điều tuyệt vời nhất anh từng thấy",
        "Hạnh phúc là được nắm tay nhau đi trên con đường đời"
      ],
      travel: [
        "Mỗi chuyến đi là một câu chuyện tình yêu mới",
        "Cùng nhau đi khắp thế gian, tạo nên những kỷ niệm đẹp",
        "Hành trình đẹp nhất là khi có em bên cạnh"
      ],
      daily: [
        "Những phút giây bình dị cũng thật đáng trân trọng",
        "Hạnh phúc đôi khi chỉ đơn giản là được ở bên nhau",
        "Yêu là khi ta cùng nhau tận hưởng từng khoảnh khắc nhỏ"
      ]
    };

    const categoryQuotes = quotes[category as keyof typeof quotes] || quotes.couple;
    return categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
  }

  private loadInitialImages() {
    this.displayedMemories = this.memories.slice(0, this.pageSize);
    this.hasMoreImages = this.memories.length > this.pageSize;
  }

  filterImages(category: FilterType) {
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

  changeView(mode: ViewMode) {
    this.viewMode = mode;
    if (mode === 'carousel') {
      this.currentSlide = 0;
    }
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

  // Carousel Controls
  nextSlide() {
    if (this.currentSlide < this.displayedMemories.length - 1) {
      this.currentSlide++;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }
}
