// Biodata Types
export interface BiodataFormData {
  naam: string;
  janmTarikh: string;
  janmVel: string;
  janmThikan: string;
  unchi: string;
  rang: string;
  shikshan: string;
  vyavsay: string;
  varsikUtpanna: string;
  gotra: string;
  mamaAdnav: string;
  vadilanchNaav: string;
  vadilVyavsay: string;
  aaiChNaav: string;
  bhawaLagna: string;
  baheenLagna: string;
  patta: string;
  samparkKramank: string;
  email: string;
  itarMahiti: string;
  photo?: string;
  language: "marathi" | "english" | "bilingual";
}

export interface BiodataTemplate {
  id: string;
  name: string;
  nameMarathi: string;
  description: string;
  thumbnail: string;
  isPremium: boolean;
  price?: number;
  tags: string[];
}

export interface ResumeFormData {
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
    github?: string;
    website?: string;
    photo?: string;
  };
  careerObjective: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: SkillCategory[];
  projects?: ProjectEntry[];
  certifications?: CertificationEntry[];
  declaration?: string;
  language: "english" | "hindi";
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  board: string;
  year: string;
  percentage: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isPremium: boolean;
  price?: number;
  atsScore: number;
  tags: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readTime: number;
  featuredImage?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
