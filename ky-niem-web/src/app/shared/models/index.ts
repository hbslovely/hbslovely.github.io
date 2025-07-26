export * from './album.model';
export * from './moment.model';
export * from './statistics.model';
export * from './content.model';
export * from './profile.model';

export interface MemoryPlace {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  detailedDescription: string;
  howToGet: string;
  bestTimeToVisit: string;
  localFood?: Food[];
  attractions?: Attractions;
  nearbyAttractions?: NearbyAttraction[];
  recommendedFood?: RecommendedFood[];
}

export interface Food {
  name: string;
  description: string;
  image?: string;
}

export interface Attractions {
  historical?: Attraction[];
  religious?: Attraction[];
  entertainment?: Attraction[];
}

export interface Attraction {
  name: string;
  description: string;
  image?: string;
}

export interface NearbyAttraction {
  name: string;
  description: string;
  distance: string;
  travelTime: string;
  image?: string;
}

export interface RecommendedFood {
  name: string;
  description: string;
  restaurant: string;
  price: string;
  image?: string;
} 