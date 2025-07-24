export interface Project {
  name: string;
  company?: string;
  duration: string;
  description: string;
  scope?: string;
  technologies: string[];
  environment: string[];
  role: string;
  status?: 'active' | 'completed' | 'maintenance';
  teamSize?: number;
  image?: string;
  github?: string;
  demo?: string;
  achievements?: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  location: string;
  summary: string;
  links?: { [key: string]: string };
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
  projects: {
    projects: Project[];
  }
}
