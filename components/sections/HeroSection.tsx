"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import type { HeroContent } from "@/types/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

interface HeroSectionProps {
  content: HeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  const scrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };
  const headlineParts = content.headline.split("\n");
  const showImage = content.imageVisible !== false && content.image;

  return (
    <section className="relative flex min-h-[70vh] overflow-hidden bg-stone-50 pb-20 pt-28 md:min-h-screen md:pb-32 md:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-emerald-500/[0.03]" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-400/[0.05] blur-[80px]" />

      <div className="container relative mx-auto flex flex-1 items-center px-4">
        <div className={`flex w-full items-center gap-12 ${showImage ? "flex-col lg:flex-row" : ""}`}>
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={showImage ? "flex-1 text-center lg:text-left" : "mx-auto max-w-4xl text-center"}
          >
            {content.badge && (
              <motion.div variants={itemVariants} className="mb-6">
                <Badge text={content.badge} />
              </motion.div>
            )}

            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-stone-900 md:text-5xl lg:text-6xl"
            >
              {headlineParts.map((part, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {part}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className={`mt-6 text-lg leading-relaxed text-stone-500 md:text-xl ${showImage ? "max-w-xl" : "mx-auto max-w-2xl"}`}
            >
              {content.subheadline}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10">
              <button
                onClick={scrollToContact}
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
              >
                {content.ctaText}
              </button>
              {content.ctaSubtext && (
                <p className="mt-3 text-sm text-stone-400">{content.ctaSubtext}</p>
              )}
            </motion.div>

            {content.trustBadges && content.trustBadges.length > 0 && (
              <motion.div
                variants={itemVariants}
                className={`mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-stone-200 pt-8 ${showImage ? "justify-center lg:justify-start" : "justify-center"}`}
              >
                {content.trustBadges.map((badge, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 text-sm font-medium text-stone-500"
                  >
                    <svg
                      className="h-4 w-4 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {badge}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Hero Image */}
          {showImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="w-full max-w-md flex-shrink-0 lg:max-w-lg"
            >
              <img
                src={content.image}
                alt=""
                className="h-auto w-full rounded-2xl object-cover shadow-2xl shadow-stone-900/10"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
