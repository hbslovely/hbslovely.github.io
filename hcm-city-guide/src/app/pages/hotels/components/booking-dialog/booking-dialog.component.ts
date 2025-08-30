import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';

import { HotelResult } from '../../../../core/services/hotels.service';

@Component({
  selector: 'app-booking-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CheckboxModule,
    StepsModule,
    CardModule,
    DividerModule,
    MessageModule
  ],
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent {
  @Input() hotel!: HotelResult;
  @Input() selectedRoom: any;
  @Input() bookingDates: {
    checkIn: Date;
    checkOut: Date;
    guests: number;
  };

  @Output() close = new EventEmitter<void>();
  @Output() bookingComplete = new EventEmitter<any>();

  currentStep = 0;
  bookingStatus: 'idle' | 'processing' | 'success' | 'error' = 'idle';
  guestForm: FormGroup;

  steps = [
    { label: 'Guest Information' },
    { label: 'Review & Payment' },
    { label: 'Confirmation' }
  ];

  countries = [
    { label: 'Vietnam', value: 'VN' },
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'GB' },
    // Add more countries as needed
  ];

  constructor(private fb: FormBuilder) {
    this.guestForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      specialRequests: [''],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  nextStep() {
    if (this.currentStep === 1) {
      this.processBooking();
    } else {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  canProceed(): boolean {
    if (this.currentStep === 0) {
      return this.guestForm.valid;
    }
    if (this.currentStep === 1) {
      return this.guestForm.get('acceptTerms')?.value;
    }
    return true;
  }

  getNextButtonLabel(): string {
    if (this.currentStep === 0) {
      return 'HOTELS.BOOKING.REVIEW';
    }
    if (this.currentStep === 1) {
      return 'HOTELS.BOOKING.CONFIRM';
    }
    return 'HOTELS.BOOKING.CLOSE';
  }

  calculateTotal(): number {
    const nights = this.calculateNights();
    return this.selectedRoom.price.amount * nights;
  }

  private calculateNights(): number {
    const checkIn = new Date(this.bookingDates.checkIn);
    const checkOut = new Date(this.bookingDates.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private processBooking() {
    this.currentStep = 2;
    this.bookingStatus = 'processing';

    // Simulate API call
    setTimeout(() => {
      this.bookingStatus = 'success';
      this.bookingComplete.emit({
        guestInfo: this.guestForm.value,
        bookingDates: this.bookingDates,
        room: this.selectedRoom,
        total: this.calculateTotal()
      });
    }, 2000);
  }

  viewBooking() {
    // Implement view booking logic
    this.close.emit();
  }

  retryBooking() {
    this.currentStep = 1;
    this.bookingStatus = 'idle';
  }
} 