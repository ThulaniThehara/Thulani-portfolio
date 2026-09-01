export interface SiteConfig {
  title: string;
  tagline: string;
  description: string;
  author: string;
  role: string;
  positioning: string;
  resumeUrl: string;
  social: {
    github: string;
    linkedin: string;
    medium: string;
    email: string;
  };
}

export const siteConfig: SiteConfig = {
  title: "Thulani | Systems, Cloud, AI & Software Engineer",
  tagline: "I build systems that connect software, cloud, AI and hardware.",
  description: "Portfolio of Thulani — Software Engineer specializing in full-stack web platforms, cloud & serverless systems, artificial intelligence applications, and IoT hardware.",
  author: "Thulani",
  role: "Software & Systems Engineer",
  positioning: "I build systems that connect software, cloud, AI and hardware.",
  resumeUrl: "https://drive.google.com/uc?export=download&id=1jD8Z7sJhfPCg0ef7SsSfvgRues-Ptzww",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    medium: "https://medium.com/@thulanithehara03",
    email: "thulanithehara03@gmail.com",
  },
};
