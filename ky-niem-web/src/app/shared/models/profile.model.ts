interface BasicInfo {
  icon: string;
  label: string;
  value: string;
}

interface Trait {
  icon: string;
  title: string;
  description: string;
}

interface Hobby {
  icon: string;
  name: string;
  description: string;
}

interface ProfessionalSkillCategory {
  category: string;
  skills: string[];
}

interface FunFact {
  title: string;
  description: string;
  icon?: string;
}

interface Photo {
  url: string;
  caption: string;
}

interface BeautyStyle {
  description: string;
  categories: Array<{
    title: string;
    description: string;
  }>;
}

export interface HusbandData {
  basicInfo: {
    name: string;
    title: string;
    description: string;
    loveMessage: string;
    tags: string[];
    stats: BasicInfo[];
  };
  traits: Trait[];
  hobbies: Hobby[];
  professionalSkillCategories: ProfessionalSkillCategory[];
  funFacts: FunFact[];
}

export interface WifeData {
  wifeInfo: {
    name: string;
    title: string;
    description: string;
    loveMessage: string;
    tags: string[];
  };
  wifeBasicInfo: BasicInfo[];
  wifeHobbies: Hobby[];
  wifePhotos: Photo[];
  wifeFunFacts: FunFact[];
  wifeBeautyStyle: BeautyStyle;
  wifeProfessionalSkills: ProfessionalSkillCategory[];
}
