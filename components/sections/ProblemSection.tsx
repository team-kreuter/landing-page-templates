"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { IconRenderer } from "@/components/ui/IconRenderer";
import type { ProblemContent } from "@/types/content";

interface ProblemSectionProps {
  content: ProblemContent;
}

export function ProblemSection({ content }: ProblemSectionProps) {
  return (
    <section className="bg-white py-20 md:py-28">
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

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          {content.items.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1} className="h-full">
              <div className="flex h-full gap-4 rounded-xl border border-stone-100 bg-stone-50 p-6 transition-all duration-200 hover:border-stone-200 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
                  <IconRenderer
                    name={item.icon}
                    className="text-red-500"
                    size={22}
                  />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-stone-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
