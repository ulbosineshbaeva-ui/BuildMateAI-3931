// Configuration types for the application
// Shared between frontend and backend

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  ogImage: string;
  twitterHandle: string;

  contact: {
    email: string;
    company: string;
    address: string;
    telegram?: string;
    supportBot?: string;
    developer?: string;
  };

  legal: {
    privacyPolicy: string;
    termsOfService: string;
  };
}

export interface ServiceConfig {
  betterAuthUrl: string;
  autumnSecretKey: string;
  runableGatewayUrl: string;
}

export interface EnvironmentConfig {
  isDevelopment: boolean;
  isProduction: boolean;
}

export interface ThemeConfig {
  defaultTheme: "light" | "dark";
}

// Complete configuration interface
export interface AppConfig {
  site: SiteConfig;
  theme: ThemeConfig;
  services: ServiceConfig;
  environment: EnvironmentConfig;
}
