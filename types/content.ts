export interface HeroContent {
  badge?: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaSubtext?: string;
  image?: string;
  imageVisible?: boolean;
  trustBadges?: string[];
}

export interface ProblemItem {
  icon: string;
  title: string;
  description: string;
}

export interface ProblemContent {
  badge?: string;
  headline: string;
  subheadline?: string;
  items: ProblemItem[];
}

export interface SolutionStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface SolutionContent {
  badge?: string;
  headline: string;
  subheadline?: string;
  steps: SolutionStep[];
}

export interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

export interface BenefitsContent {
  badge?: string;
  headline: string;
  subheadline?: string;
  items: BenefitItem[];
}

export interface TestimonialItem {
  name: string;
  role?: string;
  location?: string;
  text: string;
  rating: number;
  image?: string;
}

export interface TestimonialsContent {
  badge?: string;
  headline: string;
  subheadline?: string;
  items: TestimonialItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  badge?: string;
  headline: string;
  subheadline?: string;
  items: FAQItem[];
}

export interface CTAContent {
  headline: string;
  subheadline?: string;
  ctaText: string;
  features?: string[];
  image?: string;
  imageVisible?: boolean;
}

export interface ContactContent {
  badge?: string;
  headline: string;
  subheadline?: string;
  successMessage: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    consent: string;
  };
}

export interface FooterContent {
  copyright: string;
  links: { label: string; href: string }[];
}

export interface LandingPageContent {
  meta: {
    title: string;
    description: string;
  };
  hero: HeroContent;
  problem: ProblemContent;
  solution: SolutionContent;
  benefits: BenefitsContent;
  testimonials: TestimonialsContent;
  faq: FAQContent;
  cta: CTAContent;
  contact: ContactContent;
  footer: FooterContent;
}
