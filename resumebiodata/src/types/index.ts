// =============================================
// Core Types for ResumeBiodata.in
// =============================================

// --- Biodata Types ---
export interface BiodataFormData {
  // Personal
  naam: string;           // नाव
  janmTarikh: string;     // जन्म तारीख
  janmVel: string;        // जन्म वेळ
  janmThikan: string;     // जन्म ठिकाण
  unchi: string;          // उंची
  vajan: string;          // वजन (optional)
  rang: string;           // रंग (complexion)
  rashi: string;          // राशी
  nakshatra: string;      // नक्षत्र
  
  // Education & Career
  shikshan: string;       // शिक्षण
  vyavsay: string;        // व्यवसाय
  varsikUtpanna: string;  // वार्षिक उत्पन्न
  naukri: string;         // नोकरी ठिकाण
  
  // Family
  gotra: string;          // गोत्र
  mamaAdnav: string;      // मामा आडनाव
  vadilanchNaav: string;  // वडिलांचे नाव
  vadilVyavsay: string;   // वडिलांचा व्यवसाय
  aaiChNaav: string;      // आईचे नाव
  bhawaCount: string;     // भाऊ
  baheenCount: string;    // बहीण
  kul: string;            // कुल
  
  // Contact
  patta: string;          // पत्ता
  samparkKramank: string; // संपर्क क्रमांक
  email: string;
  
  // Other
  itarMahiti: string;     // इतर माहिती
  expectations: string;   // अपेक्षा (optional)
  
  // Media
  photo?: string;         // base64 image
  
  // Settings
  language: 'marathi' | 'english' | 'bilingual';
  template: string;
}

export interface BiodataTemplate {
  id: string;
  name: string;
  nameMarathi: string;
  description: string;
  preview: string;
  isPremium: boolean;
  price?: number;
  category: 'traditional' | 'modern' | 'royal' | 'minimal';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  features: string[];
}

// --- Resume Types ---
export interface ResumePersonalDetails {
  fullName: string;
  designation: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
  photo?: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  field: string;
  institution: string;
  board: string;
  startYear: string;
  endYear: string;
  percentage: string;
  grade: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentRole: boolean;
  description: string[];
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  duration: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export interface ResumeFormData {
  personalDetails: ResumePersonalDetails;
  careerObjective: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: SkillGroup[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  languages: string[];
  hobbies: string[];
  declaration: string;
  template: string;
  colorScheme: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  isPremium: boolean;
  price?: number;
  atsScore: number;
  category: 'modern' | 'classic' | 'creative' | 'minimal' | 'executive';
  colors: string[];
  features: string[];
}

// --- Blog Types ---
export interface BlogPost {
  slug: string;
  title: string;
  titleMarathi?: string;
  description: string;
  content: string;
  contentHtml?: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  author: BlogAuthor;
  readTime: number;
  featuredImage?: string;
  isFeatured?: boolean;
  views?: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface BlogAuthor {
  name: string;
  avatar?: string;
  bio?: string;
}

export type BlogCategory =
  | 'biodata-tips'
  | 'resume-tips'
  | 'marriage-biodata'
  | 'interview-tips'
  | 'marathi-format'
  | 'career-advice'
  | 'templates';

// --- Payment Types ---
export interface PremiumTemplate {
  templateId: string;
  type: 'biodata' | 'resume';
  paymentId: string;
  accessToken: string;
  purchasedAt: Date;
  expiresAt?: Date;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface RazorpayPaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  templateId: string;
  templateType: 'biodata' | 'resume';
}

// --- API Response Types ---
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: string;
}

// --- Admin Types ---
export interface AdminStats {
  totalBiodataDownloads: number;
  totalResumeDownloads: number;
  totalBlogViews: number;
  totalPremiumSales: number;
  recentActivity: ActivityLog[];
}

export interface ActivityLog {
  id: string;
  type: 'download' | 'purchase' | 'visit';
  description: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}
