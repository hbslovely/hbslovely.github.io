import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { environment } from '@env/environment';

declare let paypal: any;

interface PayPalOrder {
  id: string;
  status: string;
  create_time: string;
  update_time: string;
  purchase_units: {
    amount: {
      value: string;
      currency_code: string;
    };
    description: string;
  }[];
  payer: {
    email_address?: string;
    payer_id: string;
    name?: {
      given_name: string;
      surname: string;
    };
  };
}

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ChipModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  @ViewChild('paypalButtons') paypalButtons!: ElementRef;

  protected environment = environment;
  predefinedAmounts: number[] = [5, 10, 20, 50, 100];
  suggestedAmounts: number[] = [15, 25, 75, 150, 200];
  selectedAmount: number = 0;
  customAmount: number = 0;
  showCustomDialog: boolean = false;
  isProcessing: boolean = false;
  isSandboxMode: boolean = environment.paypal.sandbox;

  readonly minAmount: number = 1;
  readonly maxAmount: number = 10000;
  validationError: string = '';

  constructor(
    private ngZone: NgZone,
    private messageService: MessageService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPayPalScript();
  }

  private loadPayPalScript() {
    // Remove existing PayPal script if any
    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    const clientId = this.isSandboxMode ?
      environment.paypal.sandboxClientId :
      environment.paypal.productionClientId;

    script.src = `https://www.paypal.com/sdk/js?client-id=${ clientId }&currency=USD`;
    script.async = true;
    script.onload = () => this.ngZone.run(() => this.initializePayPalButtons());
    document.body.appendChild(script);
  }

  private initializePayPalButtons() {
    if (this.selectedAmount <= 0) return;

    if (this.paypalButtons?.nativeElement) {
      this.paypalButtons.nativeElement.innerHTML = '';

      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [ {
              amount: {
                value: this.selectedAmount.toFixed(2),
                currency_code: 'USD'
              },
              description: `Donation to HCM City Guide${ this.isSandboxMode ? ' (Sandbox)' : '' }`
            } ]
          });
        },
        onApprove: async (data: any, actions: any) => {
          try {
            this.isProcessing = true;
            const order = await actions.order.capture();
            await this.handleSuccessfulDonation(order);
          } catch (error) {
            console.error('PayPal Capture Error:', error);
            this.showErrorMessage();
          } finally {
            this.isProcessing = false;
          }
        },
        onError: (err: any) => {
          console.error('PayPal Error:', err);
          this.showErrorMessage();
        },
        onCancel: () => {
          this.messageService.add({
            severity: 'info',
            summary: this.translateService.instant('DONATE.CANCELLED.TITLE'),
            detail: this.translateService.instant('DONATE.CANCELLED.MESSAGE')
          });
        }
      }).render(this.paypalButtons.nativeElement);
    }
  }

  selectAmount(amount: number) {
    this.selectedAmount = amount;
    setTimeout(() => this.initializePayPalButtons(), 100);
  }

  showCustomAmountDialog() {
    this.customAmount = 0;
    this.validationError = '';
    this.showCustomDialog = true;
  }

  selectSuggestedAmount(amount: number) {
    this.customAmount = amount;
    this.validateAmount();
  }

  validateAmount() {
    if (!this.customAmount) {
      this.validationError = 'VALIDATION.REQUIRED';
      return false;
    }
    if (this.customAmount < this.minAmount) {
      this.validationError = 'VALIDATION.MIN';
      return false;
    }
    if (this.customAmount > this.maxAmount) {
      this.validationError = 'VALIDATION.MAX';
      return false;
    }
    this.validationError = '';
    return true;
  }

  confirmCustomAmount() {
    if (this.validateAmount()) {
      this.selectedAmount = this.customAmount;
      this.showCustomDialog = false;
      setTimeout(() => this.initializePayPalButtons(), 100);
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  }

  private async handleSuccessfulDonation(order: PayPalOrder) {
    try {
      // 1. Log the donation details
      console.log(`Donation successful (${this.isSandboxMode ? 'Sandbox' : 'Production'}):`, order);

      // 2. Optional: Send donation details to your backend
      // await this.sendDonationToBackend(order);

      // 3. Get donation details
      const amount = order.purchase_units[0].amount.value;
      const currency = order.purchase_units[0].amount.currency_code;
      const donorName = order.payer.name ?
        `${order.payer.name.given_name} ${order.payer.name.surname}` :
        this.translateService.instant('DONATE.DEFAULT_DONOR');

      // 4. Show brief success message
      this.messageService.add({
        severity: 'success',
        summary: this.translateService.instant('DONATE.SUCCESS.TITLE'),
        detail: this.translateService.instant('DONATE.SUCCESS.MESSAGE', {
          amount: `${amount} ${currency}`,
          donor: donorName
        }),
        life: 3000
      });

      // 5. Clear the form
      this.selectedAmount = 0;
      this.customAmount = 0;

      // 6. Optional: Track the donation event
      this.trackDonation(order);

      // 7. Navigate to thank you page after brief delay to show the toast
      setTimeout(() => {
        this.router.navigate(['/donate/thank-you'], {
          queryParams: {
            amount: `${amount} ${currency}`,
            donor: donorName,
            orderId: order.id
          }
        });
      }, 1500);

    } catch (error) {
      console.error('Error handling successful donation:', error);
      this.messageService.add({
        severity: 'error',
        summary: this.translateService.instant('DONATE.ERROR.TITLE'),
        detail: this.translateService.instant('VALIDATION.PROCESSING')
      });
    }
  }

  private showErrorMessage() {
    this.messageService.add({
      severity: 'error',
      summary: this.translateService.instant('DONATE.ERROR.TITLE'),
      detail: this.translateService.instant('VALIDATION.PROCESSING')
    });
  }

  // Optional: Implement these methods if you need backend integration
  private async sendDonationToBackend(order: PayPalOrder) {
    // Example implementation:
    // const response = await fetch('/api/donations', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     orderId: order.id,
    //     amount: order.purchase_units[0].amount.value,
    //     currency: order.purchase_units[0].amount.currency_code,
    //     payerId: order.payer.payer_id,
    //     payerEmail: order.payer.email_address,
    //     payerName: order.payer.name,
    //     status: order.status,
    //     createTime: order.create_time,
    //     updateTime: order.update_time,
    //     isSandbox: this.isSandboxMode
    //   })
    // });
    // return response.json();
  }

  private trackDonation(order: PayPalOrder) {
    // Example implementation:
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', 'donation', {
    //     event_category: 'Donation',
    //     event_label: this.isSandboxMode ? 'Sandbox' : 'Production',
    //     value: Number(order.purchase_units[0].amount.value),
    //     currency: order.purchase_units[0].amount.currency_code,
    //     transaction_id: order.id
    //   });
    // }
  }
}
