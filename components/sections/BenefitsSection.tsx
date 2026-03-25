"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { IconRenderer } from "@/components/ui/IconRenderer";
import type { BenefitsContent } from "@/types/content";

interface BenefitsSectionProps {
  content: BenefitsContent;
}

export function BenefitsSection({ content }: BenefitsSectionProps) {
  return (
    <section className="bg-stone-900 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
          {content.badge && (
            <div className="mb-4">
              <span className="inline-block rounded-full bg-primary/15 px-4 py-1.5 text-sm font-semibold text-primary-light">
                {content.badge}
              </span>
            </div>
          )}
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            {content.headline}
          </h2>
          {content.subheadline && (
            <p className="mt-4 text-lg text-stone-400">{content.subheadline}</p>
          )}
        </AnimatedSection>

        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.08} className="h-full">
              <div className="group h-full cursor-default rounded-xl border border-stone-700/50 bg-stone-800/60 p-6 transition-all duration-200 hover:border-primary/30 hover:bg-stone-800">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 transition-colors duration-200 group-hover:bg-primary/20">
                  <IconRenderer
                    name={item.icon}
                    className="text-primary-light"
                    size={22}
                  />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">
                  {item.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
