"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { IconRenderer } from "@/components/ui/IconRenderer";
import type { SolutionContent } from "@/types/content";

interface SolutionSectionProps {
  content: SolutionContent;
}

export function SolutionSection({ content }: SolutionSectionProps) {
  return (
    <section className="bg-stone-50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
          {content.badge && (
            <div className="mb-4">
              <Badge text={content.badge} />
            </div>
          )}
          <h2 className="font-heading text-3xl font-bold text-stone-900 md:text-4xl">
            {content.headline}
          </h2>
          {content.subheadline && (
            <p className="mt-4 text-lg text-stone-500">{content.subheadline}</p>
          )}
        </AnimatedSection>

        <div className="mx-auto max-w-5xl">
          <div className="relative grid gap-10 md:grid-cols-3 md:gap-6">
            {/* Connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block" />

            {content.steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100">
                    <IconRenderer
                      name={step.icon}
                      className="text-primary-dark"
                      size={26}
                    />
                  </div>

                  <h3 className="font-heading text-lg font-semibold text-stone-900">
                    <span className="text-primary">{step.step}.</span> {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-500">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
