import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface PlanningData {
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

export interface ItineraryItem {
  id: string;
  type: 'attraction' | 'restaurant' | 'hotel' | 'activity' | 'transport';
  title: string;
  description: string;
  location: string;
  duration: string;
  cost: string;
  rating: number;
  image: string;
  time: string;
  category: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface DayPlan {
  day: number;
  date: string;
  title: string;
  items: ItineraryItem[];
  totalCost: string;
  totalDuration: string;
}

export interface GeneratedPlan {
  id: string;
  title: string;
  summary: string;
  totalDays: number;
  totalCost: string;
  days: DayPlan[];
  recommendations: string[];
  tips: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor() { }

  generatePlan(data: PlanningData): Observable<GeneratedPlan> {
    // Simulate API call with delay
    return of(this.createMockPlan(data)).pipe(delay(1500));
  }

  private createMockPlan(data: PlanningData): GeneratedPlan {
    const days = this.generateDays(data);
    const totalCost = this.calculateTotalCost(days);
    
    return {
      id: this.generateId(),
      title: this.generateTitle(data),
      summary: this.generateSummary(data),
      totalDays: days.length,
      totalCost: totalCost,
      days: days,
      recommendations: this.generateRecommendations(data),
      tips: this.generateTips(data)
    };
  }

  private generateDays(data: PlanningData): DayPlan[] {
    const dayCount = this.getDayCount(data.duration);
    const days: DayPlan[] = [];

    for (let i = 1; i <= dayCount; i++) {
      const dayPlan: DayPlan = {
        day: i,
        date: this.getDateString(i),
        title: this.getDayTitle(i, data.interests),
        items: this.generateDayItems(i, data),
        totalCost: '',
        totalDuration: ''
      };

      dayPlan.totalCost = this.calculateDayCost(dayPlan.items);
      dayPlan.totalDuration = this.calculateDayDuration(dayPlan.items);
      days.push(dayPlan);
    }

    return days;
  }

  private getDayCount(duration: string): number {
    switch (duration) {
      case '1-3': return 2;
      case '4-7': return 5;
      case '8-14': return 10;
      case '15+': return 15;
      default: return 3;
    }
  }

  private getDateString(dayOffset: number): string {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    return date.toLocaleDateString();
  }

  private getDayTitle(day: number, interests: string[]): string {
    const titles = [
      'Arrival & City Exploration',
      'Cultural Heritage Tour',
      'Food & Market Adventure',
      'Historical Sites & Museums',
      'Modern Districts & Shopping',
      'Nature & Parks',
      'Nightlife & Entertainment',
      'Relaxation & Wellness',
      'Local Neighborhoods',
      'Hidden Gems Discovery',
      'Art & Culture',
      'Adventure Activities',
      'Day Trip Options',
      'Final Shopping & Farewell',
      'Extended Exploration'
    ];

    return titles[day - 1] || `Day ${day} Adventure`;
  }

  private generateDayItems(day: number, data: PlanningData): ItineraryItem[] {
    const items: ItineraryItem[] = [];
    
    // Morning activities
    items.push(this.createAttraction(day, 'morning', data));
    
    // Lunch
    items.push(this.createRestaurant(day, 'lunch', data));
    
    // Afternoon activities
    items.push(this.createAttraction(day, 'afternoon', data));
    
    // Dinner
    items.push(this.createRestaurant(day, 'dinner', data));
    
    // Evening activities (if interests include nightlife)
    if (data.interests.includes('nightlife')) {
      items.push(this.createActivity(day, 'evening', data));
    }

    return items;
  }

  private createAttraction(day: number, time: string, data: PlanningData): ItineraryItem {
    const attractions = [
      {
        title: 'Ben Thanh Market',
        description: 'Iconic Saigon market with local goods and street food',
        location: 'District 1',
        category: 'market',
        cost: 'Free',
        rating: 4.5,
        image: 'assets/images/landmarks/ben-thanh-market.jpg'
      },
      {
        title: 'Notre-Dame Cathedral',
        description: 'Beautiful Gothic cathedral from French colonial period',
        location: 'District 1',
        category: 'historical',
        cost: 'Free',
        rating: 4.3,
        image: 'assets/images/landmarks/notre-dame.jpg'
      },
      {
        title: 'War Remnants Museum',
        description: 'Powerful museum about Vietnam War history',
        location: 'District 3',
        category: 'museum',
        cost: '40,000 VND',
        rating: 4.2,
        image: 'assets/images/landmarks/war-museum.jpg'
      },
      {
        title: 'Independence Palace',
        description: 'Historic presidential palace with guided tours',
        location: 'District 1',
        category: 'historical',
        cost: '65,000 VND',
        rating: 4.4,
        image: 'assets/images/landmarks/independence-palace.jpg'
      }
    ];

    const attraction = attractions[day % attractions.length];
    const timeSlot = time === 'morning' ? '09:00' : '14:00';

    return {
      id: `attraction-${day}-${time}`,
      type: 'attraction',
      title: attraction.title,
      description: attraction.description,
      location: attraction.location,
      duration: '2 hours',
      cost: attraction.cost,
      rating: attraction.rating,
      image: attraction.image,
      time: timeSlot,
      category: attraction.category,
      coordinates: { lat: 10.7769, lng: 106.7009 }
    };
  }

  private createRestaurant(day: number, meal: string, data: PlanningData): ItineraryItem {
    const restaurants = [
      {
        title: 'Pho 2000',
        description: 'Famous pho restaurant visited by Bill Clinton',
        location: 'District 1',
        category: 'vietnamese',
        cost: '80,000 VND',
        rating: 4.1,
        image: 'assets/images/food/pho.jpg'
      },
      {
        title: 'Banh Mi Huynh Hoa',
        description: 'Best banh mi in Saigon according to locals',
        location: 'District 1',
        category: 'street-food',
        cost: '35,000 VND',
        rating: 4.6,
        image: 'assets/images/food/banh-mi.jpg'
      },
      {
        title: 'Com Tam Cali',
        description: 'Authentic broken rice with grilled pork',
        location: 'District 3',
        category: 'vietnamese',
        cost: '60,000 VND',
        rating: 4.3,
        image: 'assets/images/food/com-tam.jpg'
      },
      {
        title: 'Quan An Ngon',
        description: 'Popular restaurant with Vietnamese specialties',
        location: 'District 1',
        category: 'restaurant',
        cost: '150,000 VND',
        rating: 4.2,
        image: 'assets/images/food/restaurant.jpg'
      }
    ];

    const restaurant = restaurants[day % restaurants.length];
    const timeSlot = meal === 'lunch' ? '12:00' : '19:00';

    return {
      id: `restaurant-${day}-${meal}`,
      type: 'restaurant',
      title: restaurant.title,
      description: restaurant.description,
      location: restaurant.location,
      duration: '1 hour',
      cost: restaurant.cost,
      rating: restaurant.rating,
      image: restaurant.image,
      time: timeSlot,
      category: restaurant.category,
      coordinates: { lat: 10.7769, lng: 106.7009 }
    };
  }

  private createActivity(day: number, time: string, data: PlanningData): ItineraryItem {
    const activities = [
      {
        title: 'Saigon Skydeck',
        description: 'Panoramic city views from 49th floor',
        location: 'District 1',
        category: 'viewpoint',
        cost: '200,000 VND',
        rating: 4.0,
        image: 'assets/images/landmarks/skydeck.jpg'
      },
      {
        title: 'Bitexco Financial Tower',
        description: 'Modern skyscraper with observation deck',
        location: 'District 1',
        category: 'architecture',
        cost: '180,000 VND',
        rating: 4.1,
        image: 'assets/images/landmarks/bitexco.jpg'
      },
      {
        title: 'Saigon Opera House',
        description: 'Beautiful French colonial opera house',
        location: 'District 1',
        category: 'cultural',
        cost: '100,000 VND',
        rating: 4.3,
        image: 'assets/images/landmarks/opera-house.jpg'
      }
    ];

    const activity = activities[day % activities.length];

    return {
      id: `activity-${day}-${time}`,
      type: 'activity',
      title: activity.title,
      description: activity.description,
      location: activity.location,
      duration: '1.5 hours',
      cost: activity.cost,
      rating: activity.rating,
      image: activity.image,
      time: '20:00',
      category: activity.category,
      coordinates: { lat: 10.7769, lng: 106.7009 }
    };
  }

  private calculateDayCost(items: ItineraryItem[]): string {
    // Simplified cost calculation
    const totalCost = items.reduce((sum, item) => {
      const cost = item.cost.includes('Free') ? 0 : 
                   item.cost.includes('VND') ? parseInt(item.cost.replace(/[^\d]/g, '')) : 0;
      return sum + cost;
    }, 0);

    return totalCost > 0 ? `${totalCost.toLocaleString()} VND` : 'Free';
  }

  private calculateDayDuration(items: ItineraryItem[]): string {
    const totalMinutes = items.reduce((sum, item) => {
      const duration = item.duration.includes('hour') ? 
                      parseInt(item.duration) * 60 : 
                      parseInt(item.duration);
      return sum + duration;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  private calculateTotalCost(days: DayPlan[]): string {
    const totalCost = days.reduce((sum, day) => {
      const cost = day.totalCost.includes('Free') ? 0 : 
                   parseInt(day.totalCost.replace(/[^\d]/g, ''));
      return sum + cost;
    }, 0);

    return totalCost > 0 ? `${totalCost.toLocaleString()} VND` : 'Free';
  }

  private generateTitle(data: PlanningData): string {
    const duration = data.duration.replace('+', '+ days');
    const groupText = data.groupSize === 1 ? 'Solo' : 
                     data.groupSize === 2 ? 'Couple' : 
                     `${data.groupSize} People`;
    
    return `${duration} ${groupText} Adventure in Ho Chi Minh City`;
  }

  private generateSummary(data: PlanningData): string {
    const interests = data.interests.join(', ').toLowerCase();
    const budget = data.budget.charAt(0).toUpperCase() + data.budget.slice(1);
    
    return `A ${data.duration} trip designed for ${data.groupSize} ${data.groupSize === 1 ? 'person' : 'people'} interested in ${interests}. This ${budget.toLowerCase()}-friendly itinerary includes ${data.accommodation} accommodation and ${data.transportation} transportation.`;
  }

  private generateRecommendations(data: PlanningData): string[] {
    const recommendations = [
      'Book accommodation in advance, especially during peak season',
      'Download Grab app for convenient transportation',
      'Carry cash for street food and local markets',
      'Learn basic Vietnamese phrases for better interaction',
      'Try local coffee culture at traditional cafes',
      'Visit temples early morning for peaceful experience',
      'Wear comfortable shoes for walking tours',
      'Bring light rain jacket during rainy season'
    ];

    return recommendations.slice(0, 6);
  }

  private generateTips(data: PlanningData): string[] {
    const tips = [
      'Best time to visit: December to April (dry season)',
      'Currency: Vietnamese Dong (VND)',
      'Language: Vietnamese (English spoken in tourist areas)',
      'Tipping: Not required but appreciated',
      'Bargaining: Common in markets and street vendors',
      'Dress code: Modest clothing for temples',
      'Health: Drink bottled water, avoid tap water',
      'Safety: Keep valuables secure, be aware of traffic'
    ];

    return tips.slice(0, 5);
  }

  private generateId(): string {
    return 'plan-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
