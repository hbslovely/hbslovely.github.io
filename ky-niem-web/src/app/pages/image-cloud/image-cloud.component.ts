import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-cloud',
  imports: [CommonModule],
  templateUrl: './image-cloud.component.html',
  styleUrls: ['./image-cloud.component.scss']
})
export class ImageCloudComponent implements OnInit {
  
  tags: any[] = [];
  selectedWord: string = '';
  totalWords: number = 0;
  mostUsedWord: string = '';

  private wordData = [
    // Emotion words
    { text: 'Yêu thương', weight: 3, category: 'emotion', color: '#e91e63' },
    { text: 'Hạnh phúc', weight: 3, category: 'emotion', color: '#ff5722' },
    { text: 'Ngọt ngào', weight: 2, category: 'emotion', color: '#ff9800' },
    { text: 'Ấm áp', weight: 2, category: 'emotion', color: '#f44336' },
    { text: 'Lãng mạn', weight: 2, category: 'emotion', color: '#e91e63' },
    { text: 'Cảm động', weight: 1, category: 'emotion', color: '#9c27b0' },
    { text: 'Vui vẻ', weight: 1, category: 'emotion', color: '#ff5722' },
    
    // Memory words  
    { text: 'Kỷ niệm', weight: 3, category: 'memory', color: '#2196f3' },
    { text: 'Chuyến đi', weight: 2, category: 'memory', color: '#03a9f4' },
    { text: 'Ảnh chụp', weight: 2, category: 'memory', color: '#00bcd4' },
    { text: 'Ngày cưới', weight: 3, category: 'memory', color: '#009688' },
    { text: 'Lần đầu', weight: 2, category: 'memory', color: '#4caf50' },
    { text: 'Sinh nhật', weight: 1, category: 'memory', color: '#8bc34a' },
    { text: 'Kỉ niệm', weight: 1, category: 'memory', color: '#cddc39' },
    
    // Family words
    { text: 'Gia đình', weight: 3, category: 'family', color: '#673ab7' },
    { text: 'Chồng', weight: 2, category: 'family', color: '#3f51b5' },
    { text: 'Vợ', weight: 2, category: 'family', color: '#e91e63' },
    { text: 'Bố mẹ', weight: 2, category: 'family', color: '#9c27b0' },
    { text: 'Anh em', weight: 1, category: 'family', color: '#673ab7' },
    { text: 'Tương lai', weight: 2, category: 'family', color: '#3f51b5' },
    { text: 'Con cái', weight: 2, category: 'family', color: '#e91e63' }
  ];

  ngOnInit() {
    this.generateWordCloud();
    this.calculateStats();
  }

  generateWordCloud() {
    this.tags = this.wordData.map(word => ({
      ...word,
      size: this.calculateFontSize(word.weight)
    }));
  }

  calculateFontSize(weight: number): number {
    const baseSizes = { 1: 16, 2: 24, 3: 32 };
    return baseSizes[weight as keyof typeof baseSizes] + Math.random() * 8;
  }

  calculateStats() {
    this.totalWords = this.tags.length;
    
    // Find most used word (highest weight)
    const maxWeight = Math.max(...this.tags.map(tag => tag.weight));
    const mostImportant = this.tags.find(tag => tag.weight === maxWeight);
    this.mostUsedWord = mostImportant?.text || '';
  }

  highlightWord(tag: any) {
    this.selectedWord = tag.text;
    
    // Add visual feedback
    const wordElements = document.querySelectorAll('.word-item');
    wordElements.forEach(el => {
      el.classList.remove('highlighted');
    });
    
    const selectedElement = document.querySelector(`[data-word="${tag.text}"]`);
    if (selectedElement) {
      selectedElement.classList.add('highlighted');
    }
  }

  getWordsByCategory(category: string): string[] {
    return this.tags
      .filter(tag => tag.category === category)
      .map(tag => tag.text);
  }
}
