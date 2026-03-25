"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import type { FAQContent } from "@/types/content";

interface FAQSectionProps {
  content: FAQContent;
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-stone-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-primary"
      >
        <span className="font-heading text-base font-semibold text-stone-900 md:text-lg">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="shrink-0"
        >
          <ChevronDown size={20} className="text-stone-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-stone-500">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection({ content }: FAQSectionProps) {
  return (
    <section className="bg-stone-50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mx-auto mb-12 max-w-3xl text-center">
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

        <AnimatedSection delay={0.15} className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            {content.items.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
