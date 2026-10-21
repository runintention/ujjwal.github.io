export type ProjectCategory = 
  | 'all' 
  | 'youtube' 
  | 'paid-ads' 
  | 'brand-films' 
  | 'talking-head';

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: 'youtube' | 'paid-ads' | 'brand-films' | 'talking-head';
  duration: string;
  resolution: string;
  viewsMetric: string;
  retentionMetric: string;
  roasMetric?: string;
  tagline: string;
  description: string;
  image: string;
  videoUrl?: string;
  editorNotes: {
    hookStrategy: string;
    pacingBPM: string;
    soundLayers: string;
    colorProfile: string;
  };
  keyTimestamps: { time: string; label: string }[];
  isCustom?: boolean;
  fileName?: string;
  fileSize?: string;
  createdAt?: number;
}

export interface ClientTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  stats: {
    beforeMetric: string;
    afterMetric: string;
    label: string;
  };
  verifiedProject: string;
}

export interface ProjectInquiryData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  businessCategory: string;
  instagramHandle: string;
  website?: string;
}
