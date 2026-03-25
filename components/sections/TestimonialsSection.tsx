"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { Star, Quote } from "lucide-react";
import type { TestimonialsContent } from "@/types/content";

interface TestimonialsSectionProps {
  content: TestimonialsContent;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-stone-200 text-stone-200"
          }
        />
      ))}
    </div>
  );
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
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

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-xl border border-stone-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:shadow-stone-900/5">
                <div className="mb-3 flex items-center justify-between">
                  <StarRating rating={item.rating} />
                  <Quote size={20} className="text-stone-200" />
                </div>
                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
                  &ldquo;{item.text}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-stone-100 pt-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary-dark">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-stone-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-stone-400">
                      {[item.role, item.location].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
