import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ky-niem',
  imports: [CommonModule],
  templateUrl: './ky-niem.component.html',
  styleUrls: ['./ky-niem.component.scss']
})
export class KyNiemComponent {
  memories = [
    { id: 1, src: 'https://via.placeholder.com/400x300?text=Kỷ+niệm+1', description: 'Chuyến đi đầu tiên cùng nhau' },
    { id: 2, src: 'https://via.placeholder.com/400x300?text=Kỷ+niệm+2', description: 'Ngày kỷ niệm 1 năm' },
    { id: 3, src: 'https://via.placeholder.com/400x300?text=Kỷ+niệm+3', description: 'Sinh nhật đáng nhớ' }
  ];
}
