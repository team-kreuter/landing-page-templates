"use client";

import { Check } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { CTAContent } from "@/types/content";

const FALLBACK_CTA_IMAGE =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80";

function isPlaceholder(src?: string) {
  return !src || src.startsWith("/placeholder");
}

interface CTASectionProps {
  content: CTAContent;
}

export function CTASection({ content }: CTASectionProps) {
  const scrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  const ctaImage = isPlaceholder(content.image) ? FALLBACK_CTA_IMAGE : content.image;
  const showImage = content.imageVisible !== false;

  return (
    <section className="bg-stone-900 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className={`mx-auto flex items-center gap-12 ${showImage ? "max-w-6xl flex-col lg:flex-row" : "max-w-3xl"}`}>
          {/* Text */}
          <AnimatedSection className={showImage ? "flex-1 text-center lg:text-left" : "text-center"}>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {content.headline}
            </h2>
            {content.subheadline && (
              <p className={`mt-4 text-lg text-stone-400 ${showImage ? "max-w-xl" : "mx-auto max-w-2xl"}`}>
                {content.subheadline}
              </p>
            )}

            {content.features && content.features.length > 0 && (
              <div className={`mt-8 flex flex-wrap gap-x-6 gap-y-3 ${showImage ? "justify-center lg:justify-start" : "items-center justify-center"}`}>
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

            <div className={`mt-10 ${showImage ? "text-center lg:text-left" : ""}`}>
              <button
                onClick={scrollToContact}
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
              >
                {content.ctaText}
              </button>
            </div>
          </AnimatedSection>

          {/* CTA Image */}
          {showImage && (
            <AnimatedSection delay={0.2} className="w-full max-w-sm flex-shrink-0 lg:max-w-md">
              <img
                src={ctaImage}
                alt=""
                className="h-auto w-full rounded-2xl object-cover"
              />
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}
