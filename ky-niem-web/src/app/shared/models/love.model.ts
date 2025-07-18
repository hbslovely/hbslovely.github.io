export interface HappyMoment {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  emotions: Emotion[];
}

export interface Emotion {
  icon: string;
  text: string;
}

export interface Category {
  title: string;
  icon: string;
  count: number;
}

export interface Promise {
  id: number;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface Goal {
  id: number;
  title: string;
  timeframe: string;
  icon: string;
}

export interface Milestone {
  icon: string;
  count: number | string;
  label: string;
}

export interface LoveStatistics {
  daysTogether: number;
  photosTaken: number;
  placesVisited: number;
}

export interface MomentCategory {
  icon: string;
  title: string;
  count: number;
} 