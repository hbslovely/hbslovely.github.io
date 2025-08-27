import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

declare global {
  interface Window {
    paypal: any;
  }
}

@Component({
  selector: 'app-donate-button',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    DialogModule,
    InputTextModule
  ],
  templateUrl: './donate-button.component.html',
  styleUrls: ['./donate-button.component.scss']
})
export class DonateButtonComponent implements AfterViewInit {
  @ViewChild('paypalButtonContainer') paypalButtonContainer!: ElementRef;
  @Input() recipientEmail: string = 'your-paypal-email@example.com'; // Replace with your PayPal email

  donationAmounts = [5, 10, 20, 50];
  selectedAmount: number = 10;
  customAmount: number = 0;
  isCustomAmount = false;
  showCustomDialog = false;

  constructor(private messageService: MessageService) {}

  ngAfterViewInit() {
    this.loadPayPalScript();
  }

  private loadPayPalScript() {
    if (window.paypal) {
      this.initializePayPalButton();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${environment.paypalClientId}&currency=USD`;
    script.onload = () => {
      this.initializePayPalButton();
    };
    document.body.appendChild(script);
  }

  selectAmount(amount: number) {
    this.selectedAmount = amount;
    this.isCustomAmount = false;
    this.loadPayPalScript(); // Reinitialize button with new amount
  }

  showCustomAmountDialog() {
    this.showCustomDialog = true;
  }

  confirmCustomAmount() {
    if (this.customAmount > 0) {
      this.selectedAmount = this.customAmount;
      this.isCustomAmount = true;
      this.showCustomDialog = false;
      this.loadPayPalScript(); // Reinitialize button with new amount
    }
  }

  private initializePayPalButton() {
    if (this.paypalButtonContainer?.nativeElement) {
      // Clear existing buttons
      this.paypalButtonContainer.nativeElement.innerHTML = '';

      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'donate'
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.selectedAmount.toFixed(2),
                currency_code: 'USD'
              },
              description: 'Donation to HCM City Guide',
              payee: {
                email_address: this.recipientEmail
              }
            }],
            application_context: {
              shipping_preference: 'NO_SHIPPING'
            }
          });
        },
        onApprove: async (data: any, actions: any) => {
          try {
            const order = await actions.order.capture();
            console.log('Payment completed', order);
            this.messageService.add({
              severity: 'success',
              summary: 'Thank You!',
              detail: 'Your donation has been received. We appreciate your support!'
            });
          } catch (error) {
            console.error('Payment failed:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'There was a problem processing your donation. Please try again.'
            });
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'There was a problem with PayPal. Please try again later.'
          });
        }
      }).render(this.paypalButtonContainer.nativeElement);
    }
  }
} 