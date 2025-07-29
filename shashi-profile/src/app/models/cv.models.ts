export interface PersonalInfo {
  prefix: string;
  name: string;
  title: string;
  dateOfBirth: string;
  location: {
    address: string;
    city: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    github: string;
  };
  languages: Array<{
    name: string;
    level: string;
  }>;
  summary: string;
  shortSummary: string;
  interests: string[];
  availability: {
    status: string;
    preferredWorkType: string[];
    remoteWork: string;
  };
}

export interface Experience {
  workExperience: WorkExperience[];
  education?: Education[];
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  type: string;
  location: string;
  endDate?: string;
  current?: boolean;
  description: string;
  achievements?: string[];
  responsibilities: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Skills {
  technicalSkills: { [category: string]: string[] };
  softSkills?: string[];
  languages?: { [language: string]: string };
  certifications?: Certification[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  expires?: string;
  description?: string;
}

export interface CV {
  personalInfo: PersonalInfo;
  experience: {
    workExperience: WorkExperience[];
  };
  education: {
    education: Education[];
  };
  skills: Skills;
} 