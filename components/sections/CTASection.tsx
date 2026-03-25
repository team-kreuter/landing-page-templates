"use client";

import { Check } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { CTAContent } from "@/types/content";

interface CTASectionProps {
  content: CTAContent;
}

export function CTASection({ content }: CTASectionProps) {
  const scrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="bg-stone-900 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {content.headline}
          </h2>
          {content.subheadline && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-400">
              {content.subheadline}
            </p>
          )}

          {content.features && content.features.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {content.features.map((feature, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-sm text-stone-300"
                >
                  <Check size={16} className="text-primary" />
                  {feature}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10">
            <button
              onClick={scrollToContact}
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
            >
              {content.ctaText}
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
