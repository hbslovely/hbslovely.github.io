import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule } from '@nebular/theme';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NbCardModule, NbIconModule],
  template: `
    <div class="about-container">
      <nb-card>
        <nb-card-header>
          <h2>
            <nb-icon icon="info-outline"></nb-icon>
            Về chúng tôi
          </h2>
        </nb-card-header>
        <nb-card-body>
          <div class="about-content">
            <section class="about-section">
              <h3>Câu chuyện của chúng tôi</h3>
              <p>
                Coffee Shop được thành lập với mong muốn mang đến cho khách hàng những trải nghiệm cà phê tuyệt vời nhất. 
                Chúng tôi tự hào về việc lựa chọn những hạt cà phê chất lượng cao và quy trình pha chế chuyên nghiệp.
              </p>
            </section>

            <section class="about-section">
              <h3>Cam kết của chúng tôi</h3>
              <ul>
                <li>Sử dụng 100% hạt cà phê Arabica chất lượng cao</li>
                <li>Quy trình pha chế được kiểm soát chặt chẽ</li>
                <li>Không gian thoải mái, thân thiện</li>
                <li>Dịch vụ khách hàng tận tâm</li>
              </ul>
            </section>

            <section class="about-section">
              <h3>Tầm nhìn</h3>
              <p>
                Chúng tôi không chỉ đơn thuần là một quán cà phê, mà còn là nơi kết nối những con người yêu thích cà phê, 
                tạo nên những khoảnh khắc đáng nhớ và lan tỏa niềm đam mê với hương vị cà phê Việt Nam.
              </p>
            </section>
          </div>
        </nb-card-body>
      </nb-card>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1.5rem;

      h2 {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        margin: 0;
        font-family: var(--font-family-primary);
        font-size: 1.5rem;

        nb-icon {
          font-size: 1.2rem;
          color: var(--color-primary-500);
        }
      }
    }

    .about-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .about-section {
      h3 {
        font-family: var(--font-family-primary);
        font-size: 1.2rem;
        margin: 0 0 1rem;
        color: var(--text-primary-color);
      }

      p {
        font-family: var(--font-family-secondary);
        line-height: 1.6;
        color: var(--text-basic-color);
        margin: 0;
      }

      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;

        li {
          font-family: var(--font-family-secondary);
          color: var(--text-basic-color);
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
          position: relative;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0.5rem;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: var(--color-primary-500);
          }
        }
      }
    }

    @media (max-width: 768px) {
      .about-container {
        padding: 0 1rem;

        h2 {
          font-size: 1.3rem;

          nb-icon {
            font-size: 1.1rem;
          }
        }
      }

      .about-section {
        h3 {
          font-size: 1.1rem;
        }
      }
    }
  `]
})
export class AboutComponent {} 