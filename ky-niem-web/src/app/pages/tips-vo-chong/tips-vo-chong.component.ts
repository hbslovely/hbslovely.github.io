import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Tip {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  rating: number;
  funLevel: number;
  date: Date;
}

@Component({
  selector: 'app-tips-vo-chong',
  imports: [CommonModule, FormsModule],
  templateUrl: './tips-vo-chong.component.html',
  styleUrls: ['./tips-vo-chong.component.scss']
})
export class TipsVoChongComponent implements OnInit {
  
  selectedCategory: string = 'all';
  
  categories = [
    { value: 'all', label: 'Tất cả', icon: 'pi pi-list' },
    { value: 'communication', label: 'Giao tiếp', icon: 'pi pi-comments' },
    { value: 'romance', label: 'Lãng mạn', icon: 'pi pi-heart' },
    { value: 'household', label: 'Gia đình', icon: 'pi pi-home' },
    { value: 'finance', label: 'Tài chính', icon: 'pi pi-money-bill' },
    { value: 'conflict', label: 'Hòa giải', icon: 'pi pi-users' },
    { value: 'fun', label: 'Giải trí', icon: 'pi pi-star' }
  ];

  tips: Tip[] = [
    {
      id: 1,
      title: 'Nghe nhạc cùng nhau mỗi tối',
      content: 'Mỗi tối trước khi ngủ, chúng mình hay bật một playlist chung và chia sẻ cảm xúc trong ngày. Điều này giúp gắn kết tình cảm và tạo thói quen tốt.',
      category: 'romance',
      author: 'Heo Bỉm',
      rating: 5,
      funLevel: 4,
      date: new Date('2024-01-15')
    },
    {
      id: 2,
      title: 'Phân chia việc nhà theo thế mạnh',
      content: 'Thay vì chia đều, chúng mình phân công theo điểm mạnh. Ba Heo giỏi nấu ăn, Heo Bỉm giỏi dọn dẹp. Vậy là không ai stress!',
      category: 'household',
      author: 'Ba Heo',
      rating: 5,
      funLevel: 3,
      date: new Date('2024-01-20')
    },
    {
      id: 3,
      title: 'Quy tắc 24 giờ khi giận nhau',
      content: 'Khi có mâu thuẫn, chúng mình có quy tắc không được để qua 24 giờ mà không nói chuyện. Dù giận cỡ nào cũng phải tìm cách hòa giải.',
      category: 'conflict',
      author: 'Ba Heo',
      rating: 4,
      funLevel: 2,
      date: new Date('2024-02-01')
    },
    {
      id: 4,
      title: 'Ví chung cho chi tiêu hàng ngày',
      content: 'Chúng mình có một ví chung để chi tiêu sinh hoạt, còn lại mỗi người quản lý tiền riêng. Như vậy vừa độc lập vừa có trách nhiệm chung.',
      category: 'finance',
      author: 'Heo Bỉm',
      rating: 4,
      funLevel: 3,
      date: new Date('2024-02-10')
    },
    {
      id: 5,
      title: 'Date night trong nhà',
      content: 'Mỗi tuần chúng mình có một buổi tối "date" tại nhà: nấu ăn cùng nhau, xem phim, chơi game. Tiết kiệm mà vẫn vui!',
      category: 'fun',
      author: 'Ba Heo',
      rating: 5,
      funLevel: 5,
      date: new Date('2024-02-14')
    },
    {
      id: 6,
      title: 'Nói "em yêu anh" mỗi ngày',
      content: 'Dù đã cưới nhau rồi, chúng mình vẫn nói những lời ngọt ngào mỗi ngày. Đơn giản nhưng làm tình cảm luôn tươi mới.',
      category: 'communication',
      author: 'Heo Bỉm',
      rating: 5,
      funLevel: 4,
      date: new Date('2024-02-20')
    },
    {
      id: 7,
      title: 'Surprise nhỏ hàng tuần',
      content: 'Mỗi tuần một người sẽ chuẩn bị surprise nhỏ cho người kia. Có thể là món ăn yêu thích, hoa, hay chỉ một lời nhắn dễ thương.',
      category: 'romance',
      author: 'Ba Heo',
      rating: 4,
      funLevel: 5,
      date: new Date('2024-03-01')
    },
    {
      id: 8,
      title: 'Học cùng nhau một kỹ năng mới',
      content: 'Chúng mình cùng học nấu ăn, cùng tập yoga, cùng học tiếng Anh. Có mục tiêu chung giúp cả hai cùng phát triển.',
      category: 'fun',
      author: 'Heo Bỉm',
      rating: 4,
      funLevel: 4,
      date: new Date('2024-03-10')
    }
  ];

  newTip: Partial<Tip> = {
    title: '',
    content: '',
    category: 'communication'
  };

  filteredTips: Tip[] = [];

  ngOnInit() {
    this.filterTips();
  }

  filterTips() {
    if (this.selectedCategory === 'all') {
      this.filteredTips = [...this.tips];
    } else {
      this.filteredTips = this.tips.filter(tip => tip.category === this.selectedCategory);
    }
  }

  getTipCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      communication: '#3b82f6',
      romance: '#e91e63',
      household: '#10b981',
      finance: '#f59e0b',
      conflict: '#8b5cf6',
      fun: '#f97316'
    };
    return colors[category] || '#6b7280';
  }

  getTipCategoryIcon(category: string): string {
    const categoryObj = this.categories.find(c => c.value === category);
    return categoryObj ? categoryObj.icon : 'pi pi-circle';
  }

  getTipCategoryLabel(category: string): string {
    const categoryObj = this.categories.find(c => c.value === category);
    return categoryObj ? categoryObj.label : 'Khác';
  }

  canSubmitTip(): boolean {
    return !!(this.newTip.title?.trim() && 
              this.newTip.content?.trim() && 
              this.newTip.category);
  }

  submitTip() {
    if (!this.canSubmitTip()) return;

    const tip: Tip = {
      id: Date.now(),
      title: this.newTip.title!.trim(),
      content: this.newTip.content!.trim(),
      category: this.newTip.category!,
      author: 'Người đọc',
      rating: 4,
      funLevel: 3,
      date: new Date()
    };

    this.tips.unshift(tip);
    this.filterTips();

    // Reset form
    this.newTip = {
      title: '',
      content: '',
      category: 'communication'
    };

    // Show success message (you can add a toast here)
    alert('Cảm ơn bạn đã chia sẻ tip! 🎉');
  }

  getTotalTips(): number {
    return this.tips.length;
  }

  getAverageRating(): string {
    const avg = this.tips.reduce((sum, tip) => sum + tip.rating, 0) / this.tips.length;
    return avg.toFixed(1);
  }

  getMostPopularCategory(): string {
    const categoryCount: { [key: string]: number } = {};
    this.tips.forEach(tip => {
      categoryCount[tip.category] = (categoryCount[tip.category] || 0) + 1;
    });
    
    const mostPopular = Object.keys(categoryCount).reduce((a, b) => 
      categoryCount[a] > categoryCount[b] ? a : b
    );
    
    return this.getTipCategoryLabel(mostPopular);
  }

  getTopContributor(): string {
    const authorCount: { [key: string]: number } = {};
    this.tips.forEach(tip => {
      authorCount[tip.author] = (authorCount[tip.author] || 0) + 1;
    });
    
    return Object.keys(authorCount).reduce((a, b) => 
      authorCount[a] > authorCount[b] ? a : b
    );
  }
}
