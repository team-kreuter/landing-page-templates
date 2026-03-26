import { leadsgenerierungContent } from "@/content/leadsgenerierung";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: leadsgenerierungContent.meta.title,
  description: leadsgenerierungContent.meta.description,
};

export default function HomePage() {
  const c = leadsgenerierungContent;

  return (
    <>
      <Header
        companyName={siteConfig.company.name}
        logo={siteConfig.company.logo}
        phone={siteConfig.company.phone}
      />
      <main>
        <HeroSection content={c.hero} />
        <div id="leistungen">
          <ProblemSection content={c.problem} />
        </div>
        <div id="ablauf">
          <SolutionSection content={c.solution} />
        </div>
        <div id="vorteile">
          <BenefitsSection content={c.benefits} />
        </div>
        <div id="referenzen">
          <TestimonialsSection content={c.testimonials} />
        </div>
        <div id="faq">
          <FAQSection content={c.faq} />
        </div>
        <CTASection content={c.cta} />
        <div id="kontakt">
          <ContactSection content={c.contact} />
        </div>
      </main>
      <footer className="border-t border-stone-200 bg-stone-50 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-stone-500 md:flex-row">
          <p>{c.footer.copyright}</p>
          <nav className="flex gap-6">
            {c.footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="container mx-auto mt-4 border-t border-stone-200 pt-4 text-center text-xs text-stone-400">
          Designed with ❤️ von{' '}
          <a href="https://dirkkreuter.com" rel="nofollow noopener noreferrer" target="_blank" className="underline hover:text-primary transition-colors">
            Dirk Kreuters Tech Team
          </a>
        </div>
      </footer>
    </>
  );
}
