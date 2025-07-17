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
    { id: 1, src: 'assets/images/ki-niem/ki-niem-1.jpg', description: 'Chuyến đi đầu tiên cùng nhau' },
    { id: 2, src: 'assets/images/ki-niem/ki-niem-2.jpg', description: 'Ngày kỷ niệm 1 năm' },
    { id: 3, src: 'assets/images/ki-niem/ki-niem-3.jpg', description: 'Sinh nhật đáng nhớ' },
    { id: 4, src: 'assets/images/ki-niem/ki-niem-4.jpg', description: 'Khoảnh khắc lãng mạn' },
    { id: 5, src: 'assets/images/ki-niem/ki-niem-5.jpg', description: 'Kỷ niệm đặc biệt' },
    { id: 6, src: 'assets/images/ki-niem/ki-niem-6.jpg', description: 'Hạnh phúc bên nhau' }
  ];
}
