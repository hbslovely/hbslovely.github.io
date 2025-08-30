import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-transport-search',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    AutoCompleteModule,
    CardModule
  ],
  templateUrl: './transport-search.component.html',
  styleUrls: ['./transport-search.component.scss']
})
export class TransportSearchComponent {
  searchForm: FormGroup;
  isLoading = false;
  hasSearched = false;
  fromSuggestions: string[] = [];
  toSuggestions: string[] = [];
  transportOptions: any[] = [];

  transportTypes = [
    { label: 'TRANSPORT.TYPES.GRAB_CAR', value: 'car' },
    { label: 'TRANSPORT.TYPES.GRAB_BIKE', value: 'bike' },
    { label: 'TRANSPORT.TYPES.TAXI', value: 'taxi' },
    { label: 'TRANSPORT.TYPES.BUS', value: 'bus' },
    { label: 'TRANSPORT.TYPES.METRO', value: 'metro' }
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  searchLocation(event: any) {
    // Implement location search
    const query = event.query;
    // This is just a mock implementation
    const suggestions = [
      'Ben Thanh Market',
      'Tan Son Nhat Airport',
      'Saigon Central Post Office',
      'Notre-Dame Cathedral Basilica of Saigon',
      'Independence Palace'
    ].filter(location => 
      location.toLowerCase().includes(query.toLowerCase())
    );

    if (event.target === this.searchForm.get('from')) {
      this.fromSuggestions = suggestions;
    } else {
      this.toSuggestions = suggestions;
    }
  }

  search() {
    if (this.searchForm.valid) {
      this.isLoading = true;
      this.hasSearched = true;

      // Mock data - replace with actual API call
      setTimeout(() => {
        this.transportOptions = [
          {
            providerLogo: 'assets/images/transport/grab-logo.png',
            providerName: 'Grab',
            from: this.searchForm.get('from')?.value,
            to: this.searchForm.get('to')?.value,
            duration: '25 mins',
            price: 150000
          },
          {
            providerLogo: 'assets/images/transport/vinasun-logo.png',
            providerName: 'Vinasun',
            from: this.searchForm.get('from')?.value,
            to: this.searchForm.get('to')?.value,
            duration: '30 mins',
            price: 180000
          }
        ];
        this.isLoading = false;
      }, 1000);
    }
  }

  bookTransport(option: any) {
    // Implement booking logic
    console.log('Booking transport:', option);
  }
} 