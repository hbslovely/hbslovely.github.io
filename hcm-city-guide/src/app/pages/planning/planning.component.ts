import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

interface PlanningQuestion {
  id: string;
  type: 'single' | 'multiple' | 'text' | 'number' | 'date';
  question: string;
  options?: { value: string; label: string; icon?: string }[];
  placeholder: string;
  required: boolean;
}

interface PlanningData {
  groupSize: number;
  duration: string;
  interests: string[];
  budget: string;
  accommodation: string;
  transportation: string;
  startDate: string;
  endDate: string;
  specialNeeds: string;
  preferredAreas: string[];
}

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {
  currentStep = 0;
  planningData: PlanningData = {
    groupSize: 1,
    duration: '',
    interests: [],
    budget: '',
    accommodation: '',
    transportation: '',
    startDate: '',
    endDate: '',
    specialNeeds: '',
    preferredAreas: []
  };

  questions: PlanningQuestion[] = [
    {
      id: 'groupSize',
      type: 'number',
      question: 'PLANNING.QUESTIONS.GROUP_SIZE.QUESTION',
      placeholder: 'PLANNING.QUESTIONS.GROUP_SIZE.PLACEHOLDER',
      required: true
    },
    {
      id: 'duration',
      type: 'single',
      question: 'PLANNING.QUESTIONS.DURATION.QUESTION',
      placeholder: '',
      options: [
        { value: '1-3', label: 'PLANNING.QUESTIONS.DURATION.OPTIONS.1_3', icon: 'fas fa-calendar-day' },
        { value: '4-7', label: 'PLANNING.QUESTIONS.DURATION.OPTIONS.4_7', icon: 'fas fa-calendar-week' },
        { value: '8-14', label: 'PLANNING.QUESTIONS.DURATION.OPTIONS.8_14', icon: 'fas fa-calendar-alt' },
        { value: '15+', label: 'PLANNING.QUESTIONS.DURATION.OPTIONS.15_PLUS', icon: 'fas fa-calendar-check' }
      ],
      required: true
    },
    {
      id: 'interests',
      type: 'multiple',
      question: 'PLANNING.QUESTIONS.INTERESTS.QUESTION',
      placeholder: '',
      options: [
        { value: 'culture', label: 'PLANNING.QUESTIONS.INTERESTS.OPTIONS.CULTURE', icon: 'fas fa-theater-masks' },
        { value: 'food', label: 'PLANNING.QUESTIONS.INTERESTS.OPTIONS.FOOD', icon: 'fas fa-utensils' },
        { value: 'shopping', label: 'PLANNING.QUESTIONS.INTERESTS.OPTIONS.SHOPPING', icon: 'fas fa-shopping-bag' },
        { value: 'nightlife', label: 'PLANNING.QUESTIONS.INTERESTS.OPTIONS.NIGHTLIFE', icon: 'fas fa-moon' },
        { value: 'nature', label: 'PLANNING.QUESTIONS.INTERESTS.OPTIONS.NATURE', icon: 'fas fa-tree' },
        { value: 'history', label: 'PLANNING.QUESTIONS.INTERESTS.OPTIONS.HISTORY', icon: 'fas fa-landmark' },
        { value: 'adventure', label: 'PLANNING.QUESTIONS.INTERESTS.OPTIONS.ADVENTURE', icon: 'fas fa-mountain' },
        { value: 'relaxation', label: 'PLANNING.QUESTIONS.INTERESTS.OPTIONS.RELAXATION', icon: 'fas fa-spa' }
      ],
      required: true
    },
    {
      id: 'budget',
      type: 'single',
      question: 'PLANNING.QUESTIONS.BUDGET.QUESTION',
      placeholder: '',
      options: [
        { value: 'budget', label: 'PLANNING.QUESTIONS.BUDGET.OPTIONS.BUDGET', icon: 'fas fa-dollar-sign' },
        { value: 'moderate', label: 'PLANNING.QUESTIONS.BUDGET.OPTIONS.MODERATE', icon: 'fas fa-coins' },
        { value: 'luxury', label: 'PLANNING.QUESTIONS.BUDGET.OPTIONS.LUXURY', icon: 'fas fa-gem' }
      ],
      required: true
    },
    {
      id: 'accommodation',
      type: 'single',
      question: 'PLANNING.QUESTIONS.ACCOMMODATION.QUESTION',
      placeholder: '',
      options: [
        { value: 'hotel', label: 'PLANNING.QUESTIONS.ACCOMMODATION.OPTIONS.HOTEL', icon: 'fas fa-hotel' },
        { value: 'hostel', label: 'PLANNING.QUESTIONS.ACCOMMODATION.OPTIONS.HOSTEL', icon: 'fas fa-bed' },
        { value: 'apartment', label: 'PLANNING.QUESTIONS.ACCOMMODATION.OPTIONS.APARTMENT', icon: 'fas fa-building' },
        { value: 'homestay', label: 'PLANNING.QUESTIONS.ACCOMMODATION.OPTIONS.HOMESTAY', icon: 'fas fa-home' }
      ],
      required: true
    },
    {
      id: 'transportation',
      type: 'single',
      question: 'PLANNING.QUESTIONS.TRANSPORTATION.QUESTION',
      placeholder: '',
      options: [
        { value: 'walking', label: 'PLANNING.QUESTIONS.TRANSPORTATION.OPTIONS.WALKING', icon: 'fas fa-walking' },
        { value: 'public', label: 'PLANNING.QUESTIONS.TRANSPORTATION.OPTIONS.PUBLIC', icon: 'fas fa-bus' },
        { value: 'taxi', label: 'PLANNING.QUESTIONS.TRANSPORTATION.OPTIONS.TAXI', icon: 'fas fa-taxi' },
        { value: 'motorbike', label: 'PLANNING.QUESTIONS.TRANSPORTATION.OPTIONS.MOTORBIKE', icon: 'fas fa-motorcycle' }
      ],
      required: true
    },
    {
      id: 'preferredAreas',
      type: 'multiple',
      question: 'PLANNING.QUESTIONS.AREAS.QUESTION',
      placeholder: '',
      options: [
        { value: 'district1', label: 'PLANNING.QUESTIONS.AREAS.OPTIONS.DISTRICT_1', icon: 'fas fa-map-marker-alt' },
        { value: 'district3', label: 'PLANNING.QUESTIONS.AREAS.OPTIONS.DISTRICT_3', icon: 'fas fa-map-marker-alt' },
        { value: 'district5', label: 'PLANNING.QUESTIONS.AREAS.OPTIONS.DISTRICT_5', icon: 'fas fa-map-marker-alt' },
        { value: 'district7', label: 'PLANNING.QUESTIONS.AREAS.OPTIONS.DISTRICT_7', icon: 'fas fa-map-marker-alt' },
        { value: 'binhthanh', label: 'PLANNING.QUESTIONS.AREAS.OPTIONS.BINH_THANH', icon: 'fas fa-map-marker-alt' },
        { value: 'phunhuan', label: 'PLANNING.QUESTIONS.AREAS.OPTIONS.PHU_NHUAN', icon: 'fas fa-map-marker-alt' }
      ],
      required: false
    },
    {
      id: 'specialNeeds',
      type: 'text',
      question: 'PLANNING.QUESTIONS.SPECIAL_NEEDS.QUESTION',
      placeholder: 'PLANNING.QUESTIONS.SPECIAL_NEEDS.PLACEHOLDER',
      required: false
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialize component
  }

  get currentQuestion(): PlanningQuestion {
    return this.questions[this.currentStep];
  }

  get progress(): number {
    return ((this.currentStep + 1) / this.questions.length) * 100;
  }

  get canProceed(): boolean {
    const question = this.currentQuestion;
    const value = this.getPlanningValue(question.id);
    
    if (!question.required) return true;
    
    if (question.type === 'multiple') {
      return Array.isArray(value) && value.length > 0;
    }
    
    return value !== '' && value !== null && value !== undefined;
  }

  getPlanningValue(key: string): any {
    return (this.planningData as any)[key];
  }

  setPlanningValue(key: string, value: any): void {
    (this.planningData as any)[key] = value;
  }

  selectOption(optionValue: string) {
    const question = this.currentQuestion;
    
    if (question.type === 'single') {
      this.setPlanningValue(question.id, optionValue);
    } else if (question.type === 'multiple') {
      const currentValues = this.getPlanningValue(question.id) as string[];
      const index = currentValues.indexOf(optionValue);
      
      if (index > -1) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(optionValue);
      }
    }
  }

  isSelected(optionValue: string): boolean {
    const question = this.currentQuestion;
    const value = this.getPlanningValue(question.id);
    
    if (question.type === 'single') {
      return value === optionValue;
    } else if (question.type === 'multiple') {
      return Array.isArray(value) && value.includes(optionValue);
    }
    
    return false;
  }

  nextStep() {
    if (this.canProceed && this.currentStep < this.questions.length - 1) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  generatePlan() {
    // Navigate to results page with planning data
    this.router.navigate(['/planning/results'], { 
      state: { planningData: this.planningData } 
    });
  }

  resetPlan() {
    this.currentStep = 0;
    this.planningData = {
      groupSize: 1,
      duration: '',
      interests: [],
      budget: '',
      accommodation: '',
      transportation: '',
      startDate: '',
      endDate: '',
      specialNeeds: '',
      preferredAreas: []
    };
  }
}
