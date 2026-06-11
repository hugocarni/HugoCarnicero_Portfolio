export interface TrajectoryItem {
  id: string;
  title: string;
  subtitle: string;
  dateRange: string;
  description: string;
  type: 'security' | 'development' | 'systems';
  category?: 'experience' | 'education';
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  altText?: string;
  tags: string[];
  actionText: string;
  actionUrl: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: 'security' | 'development' | 'systems';
  skills: {
    name: string;
    level: 'active' | 'learning' | 'certified';
  }[];
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  roles: string[];
  description: string;
  profilePicUrl: string;
  cvUrl: string;
  version: string;
  availableForHire: boolean;
  contactEmail: string;
  linkedinUrl: string;
  githubUrl: string;
  phone?: string;
  whatsAppUrl?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  trajectory: TrajectoryItem[];
  projects: ProjectItem[];
  skillsMatrix: SkillCategory[];
}
