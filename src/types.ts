export interface GitHubProfile {
  login: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
  avatar_url: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
  homepage?: string;
  topics?: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: "Web" | "Mobile" | "AI" | "System";
  thumbnail: string;
  details: string;
  stars?: number;
  forks?: number;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  logo?: string;
  responsibilities: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  credentialId?: string;
  issuedDate: string;
  verifyUrl?: string;
  iconName: string; // 'flutter', 'security', 'python', 'api', 'hr', 'marketing'
}

export interface ServiceItem {
  title: string;
  description: string;
  iconName: string;
  colorClass: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: "Programming" | "Frontend" | "Backend" | "Mobile" | "Database" | "Tools";
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
