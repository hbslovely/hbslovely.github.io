export interface Profile {
  name: string;
  title: string;
  avatar: string;
  headerImage: string; // URL to the header background image
  description: string;
  loveMessage: string;
  basicInfo: BasicInfo[];
  hobbies: Hobby[];
  lifeGoals: string[];
  loveStory: string[];
  sweetMoments: SweetMoment[];
}

export interface BasicInfo {
  label: string;
  value: string;
  icon: string;
}

export interface Hobby {
  name: string;
  icon: string;
  description?: string;
}

export interface ProfileData {
  basicInfo: {
    name: string;
    title: string;
    description: string;
    loveMessage: string;
    avatar: string;
    tags: string[];
    stats: {
      icon: string;
      label: string;
      value: string;
    }[];
  };
  traits: {
    icon: string;
    title: string;
    description: string;
  }[];
  hobbies: {
    icon: string;
    name: string;
    description: string;
  }[];
  photos: {
    url: string;
    caption: string;
    description: string;
  }[];
  funFacts: FunFact[];
}


export interface FunFact {
  icon: string;
  title: string;
  description: string;
}

export interface SweetMoment {
  imageUrl: string;
  title: string;
  description: string;
  date?: string;
}
