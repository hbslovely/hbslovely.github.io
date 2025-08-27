export interface Project {
  name: string;
  company?: string;
  duration: string;
  description: string;
  scope?: string;
  technologies: string[];
  environment: string[];
  role: string;
  status?: 'Active' | 'Completed' | 'Maintenance';
  teamSize?: number;
  image?: string;
  github?: string;
  demo?: string;
  achievements?: string[];
  responsibilities?: string[];
  links?: Array<{
    type: string;
    url: string;
    label: string;
  }>;
  minor?: boolean; // Flag to indicate if this is a minor project
  excludeFromPdf?: boolean; // Flag to indicate project should be excluded from PDF but isn't minor
}

export interface ProjectEnvironment {
  name: string;
  url?: string;
  description?: string;
}

export interface PersonalInfo {
  prefix?: string;
  name: string;
  title: string;
  dateOfBirth: string;
  location: {
    address: string;
    district: string;
    city: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    linkedin: string;
    github: string;
  };
  languages: Array<{
    name: string;
    level: string;
  }>;
  summary: string;
  shortSummary: string;
  professionalHighlights: string[];
  interests: string[];
  availability: {
    status: string;
    workType: 'Full-time' | 'Part-time' | 'Contract';
    workLocation: 'Remote' | 'Hybrid' | 'Onsite';
  };
}

export interface CompanyInfo {
  description: string;
  address: string;
  website: string;
  contact?: string;
  employeeCount?: string;
  officeCount?: string;
  foundedYear?: string;
  established?: string;
  studentCount?: string;
  facultyCount?: string;
  internationalPartners?: string;
  type?: string;
  accreditation?: string;
  ranking?: string;
  researchCenters?: string;
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
  companyInfo?: CompanyInfo;
}

export interface Thesis {
  title: string;
  description: string;
  technologies: string[];
  supervisor: string;
  grade: string;
}

export interface Education {
  institution: string;
  shortName: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  location: string;
  description: string;
  thesis?: Thesis;
  achievements?: string[];
  keySubjects?: string[];
  projects?: Array<{
    name: string;
    description: string;
  }>;
  institutionInfo: CompanyInfo;
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
