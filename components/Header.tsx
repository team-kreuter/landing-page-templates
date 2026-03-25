"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import Image from "next/image";

interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  companyName: string;
  logo?: string;
  phone?: string;
  ctaText?: string;
  navLinks?: NavLink[];
}

const defaultNavLinks: NavLink[] = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Vorteile", href: "#vorteile" },
  { label: "Referenzen", href: "#referenzen" },
  { label: "FAQ", href: "#faq" },
];

export function Header({
  companyName,
  logo,
  phone,
  ctaText = "Jetzt anfragen",
  navLinks = defaultNavLinks,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-white/95 shadow-lg shadow-stone-900/5 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          {/* Logo */}
          {logo ? (
            <Image
              src={logo}
              alt={companyName}
              width={140}
              height={40}
              className="h-8 w-auto md:h-10"
              priority
            />
          ) : (
            <span className="font-heading text-lg font-bold text-stone-900">
              {companyName}
            </span>
          )}

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors duration-200 hover:bg-stone-100 hover:text-stone-900"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden items-center gap-4 lg:flex">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-1.5 text-sm font-medium text-stone-600 transition-colors duration-200 hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            )}
            <button
              onClick={() => scrollTo("#kontakt")}
              className="cursor-pointer rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all duration-200 hover:bg-primary-dark hover:shadow-md hover:shadow-primary/25"
            >
              {ctaText}
            </button>
          </div>

          {/* Mobile: Phone + Burger */}
          <div className="flex items-center gap-3 lg:hidden">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-stone-600 transition-colors hover:bg-stone-100"
                aria-label="Anrufen"
              >
                <Phone className="h-5 w-5" />
              </a>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-stone-600 transition-colors hover:bg-stone-100"
              aria-label="Menü"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-[60px] lg:hidden"
          >
            <nav className="container mx-auto flex flex-col gap-1 px-4 py-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="cursor-pointer rounded-lg px-4 py-3 text-left text-base font-medium text-stone-700 transition-colors duration-200 hover:bg-stone-50 hover:text-stone-900"
                >
                  {link.label}
                </button>
              ))}
              <div className="my-3 border-t border-stone-100" />
              <button
                onClick={() => scrollTo("#kontakt")}
                className="cursor-pointer rounded-lg bg-primary px-4 py-3 text-center text-base font-semibold text-white shadow-sm shadow-primary/20 transition-all duration-200 hover:bg-primary-dark"
              >
                {ctaText}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
