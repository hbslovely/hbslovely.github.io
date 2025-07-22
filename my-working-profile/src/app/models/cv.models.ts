export interface PersonalInfo {
    name: string;
    title: string;
    dateOfBirth: string;
    address: string;
    phone: string;
    email: string;
    linkedin: string;
    summary: string;
}

export interface WorkExperience {
    company: string;
    position: string;
    department?: string;
    location: string;
    type: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
    achievements: string[];
}

export interface Education {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
}

export interface Skills {
    technicalSkills: {
        programmingLanguages: string[];
        frameworks: string[];
        libraries: string[];
        testing: string[];
        methodologies: string[];
        tools: string[];
        environments: string[];
    };
}

export interface Project {
    name: string;
    company?: string;
    duration: string;
    description: string;
    scope?: string;
    technologies: string[];
    environment: string[];
    role: string;
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
    };
} 