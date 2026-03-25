"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings } from "lucide-react";
import { getConsent, setConsent } from "@/lib/cookies";
import trackingData from "@/data/tracking.json";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  const config = trackingData;

  // Determine which categories are relevant based on enabled tools
  const hasMarketingTools =
    config.metaPixel.enabled || config.googleTagManager.enabled;
  const hasAnalyticsTools =
    config.googleAnalytics.enabled || config.posthog.enabled || config.matomo.enabled;

  // Build descriptions for cookie categories
  const marketingToolNames = [
    config.metaPixel.enabled && "Meta Pixel",
    config.googleTagManager.enabled && "Google Tag Manager",
  ].filter(Boolean);

  const analyticsToolNames = [
    config.googleAnalytics.enabled && "Google Analytics",
    config.posthog.enabled && "PostHog",
    config.matomo.enabled && "Matomo",
  ].filter(Boolean);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) {
      // Only show if there are tracking tools enabled
      if (hasMarketingTools || hasAnalyticsTools) {
        const timer = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [hasMarketingTools, hasAnalyticsTools]);

  const handleAcceptAll = () => {
    setConsent({ marketing: true, analytics: true });
    setVisible(false);
  };

  const handleAcceptEssential = () => {
    setConsent({ marketing: false, analytics: false });
    setVisible(false);
  };

  const handleSavePreferences = () => {
    setConsent({ marketing, analytics });
    setVisible(false);
  };

  // Don't render if no tracking tools are enabled
  if (!hasMarketingTools && !hasAnalyticsTools) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Cookie className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-slate-900">
                    Cookie-Einstellungen
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Wir verwenden Cookies und ähnliche Technologien, um Ihnen die bestmögliche
                    Erfahrung zu bieten.{" "}
                    <a
                      href="/datenschutz"
                      className="text-primary underline hover:no-underline"
                    >
                      Mehr erfahren
                    </a>
                  </p>
                </div>
              </div>
              <button
                onClick={handleAcceptEssential}
                className="shrink-0 text-slate-400 hover:text-slate-600"
                aria-label="Schließen"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4">
                    {/* Essential - always on */}
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked
                        disabled
                        className="h-4 w-4 rounded border-slate-300"
                      />
                      <div>
                        <span className="text-sm font-medium text-slate-900">
                          Notwendige Cookies
                        </span>
                        <p className="text-xs text-slate-500">
                          Erforderlich für die Grundfunktionen der Website.
                        </p>
                      </div>
                    </label>

                    {/* Marketing */}
                    {hasMarketingTools && (
                      <label className="flex cursor-pointer items-center gap-3">
                        <input
                          type="checkbox"
                          checked={marketing}
                          onChange={(e) => setMarketing(e.target.checked)}
                          className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <div>
                          <span className="text-sm font-medium text-slate-900">
                            Marketing
                          </span>
                          <p className="text-xs text-slate-500">
                            {marketingToolNames.join(", ")} zur Optimierung von
                            Werbekampagnen.
                          </p>
                        </div>
                      </label>
                    )}

                    {/* Analytics */}
                    {hasAnalyticsTools && (
                      <label className="flex cursor-pointer items-center gap-3">
                        <input
                          type="checkbox"
                          checked={analytics}
                          onChange={(e) => setAnalytics(e.target.checked)}
                          className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <div>
                          <span className="text-sm font-medium text-slate-900">
                            Analyse
                          </span>
                          <p className="text-xs text-slate-500">
                            {analyticsToolNames.join(", ")} zur Verbesserung der
                            Website.
                          </p>
                        </div>
                      </label>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleAcceptAll}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={handleAcceptEssential}
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Nur notwendige
              </button>
              {!showDetails ? (
                <button
                  onClick={() => setShowDetails(true)}
                  className="flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-700"
                >
                  <Settings className="h-4 w-4" />
                  Einstellungen
                </button>
              ) : (
                <button
                  onClick={handleSavePreferences}
                  className="flex items-center gap-1.5 text-sm text-primary transition hover:text-primary-dark"
                >
                  Auswahl speichern
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
