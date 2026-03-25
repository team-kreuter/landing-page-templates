import { siteConfig } from "@/config/site";
import { trackingConfig } from "@/config/tracking";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: "noindex, nofollow",
};

export default function DatenschutzPage() {
  const c = siteConfig.company;
  const d = siteConfig.datenschutz;
  const t = trackingConfig;

  let sectionNumber = 0;
  const section = () => ++sectionNumber;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Startseite
        </Link>

        <h1 className="font-heading text-3xl font-bold text-slate-900">
          Datenschutzerklärung
        </h1>

        <div className="mt-8 space-y-8 text-slate-600 leading-relaxed">
          <p className="text-sm italic text-slate-400">
            Hinweis: Diese Datenschutzerklärung ist ein Muster und stellt keine
            Rechtsberatung dar. Bitte lassen Sie diese von einem Fachanwalt für
            Datenschutzrecht prüfen und an Ihre individuellen Gegebenheiten anpassen.
          </p>

          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              {section()}. Verantwortlicher
            </h2>
            <p className="mt-3">
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)
              und anderer nationaler Datenschutzgesetze sowie sonstiger
              datenschutzrechtlicher Bestimmungen ist:
            </p>
            <p className="mt-3">
              {c.name}<br />
              {c.street}<br />
              {c.zip} {c.city}<br />
              {c.country}
            </p>
            <p className="mt-3">
              Vertreten durch: {d.responsiblePerson}<br />
              E-Mail:{" "}
              <a href={`mailto:${c.email}`} className="text-primary underline hover:no-underline">
                {c.email}
              </a><br />
              Telefon: {c.phone}<br />
              Website:{" "}
              <a href={c.website} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                {c.website}
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              {section()}. Allgemeines zur Datenverarbeitung
            </h2>
            <p className="mt-3">
              Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich
              nur, soweit dies zur Bereitstellung einer funktionsfähigen Website
              sowie unserer Inhalte und Leistungen erforderlich ist.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              {section()}. Rechtsgrundlagen der Verarbeitung
            </h2>
            <p className="mt-3">
              Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine
              Einwilligung der betroffenen Person einholen, dient Art. 6 Abs. 1
              lit. a DSGVO als Rechtsgrundlage. Bei der Verarbeitung von
              personenbezogenen Daten, die zur Erfüllung eines Vertrages
              erforderlich ist, dient Art. 6 Abs. 1 lit. b DSGVO als
              Rechtsgrundlage.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              {section()}. Hosting
            </h2>
            <p className="mt-3">Diese Website wird gehostet bei:</p>
            <p className="mt-3">{d.hostingProvider}</p>
            <p className="mt-3">
              Details finden Sie in der Datenschutzerklärung von Vercel:{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                https://vercel.com/legal/privacy-policy
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              {section()}. SSL- bzw. TLS-Verschlüsselung
            </h2>
            <p className="mt-3">
              Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw.
              TLS-Verschlüsselung.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              {section()}. Cookies und Einwilligung
            </h2>
            <p className="mt-3">
              Unsere Website verwendet Cookies. Einige Cookies sind für den Betrieb
              der Website technisch notwendig. Marketing- und Analyse-Cookies werden
              erst nach Ihrer ausdrücklichen Einwilligung über unser Cookie-Banner
              aktiviert. Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie
              die Cookies in Ihrem Browser löschen.
            </p>
          </section>

          {/* Meta Pixel */}
          {t.metaPixel.enabled && (
            <section>
              <h2 className="font-heading text-xl font-semibold text-slate-900">
                {section()}. Meta Pixel (Facebook Pixel)
              </h2>
              <p className="mt-3">
                Diese Website verwendet das Meta Pixel von Meta Platforms Ireland Limited,
                4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. Das Meta Pixel
                ermöglicht es uns, das Verhalten von Nutzern nachzuverfolgen, nachdem diese
                durch Klick auf eine Meta-Werbeanzeige auf unsere Website weitergeleitet wurden.
              </p>
              <p className="mt-3">
                Zusätzlich verwenden wir die Meta Conversions API (Server-Side), um
                Conversion-Events serverseitig an Meta zu übermitteln. Dabei werden
                personenbezogene Daten (z.B. E-Mail-Adresse, Telefonnummer) vor der
                Übermittlung gehasht (SHA-256).
              </p>
              <p className="mt-3">
                Das Meta Pixel wird ausschließlich nach Ihrer ausdrücklichen
                Einwilligung (Marketing-Consent) über unser Cookie-Banner geladen.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.
              </p>
              <p className="mt-3">
                Weitere Informationen:{" "}
                <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                  Meta Datenschutzrichtlinie
                </a>
              </p>
            </section>
          )}

          {/* Google Analytics */}
          {t.googleAnalytics.enabled && (
            <section>
              <h2 className="font-heading text-xl font-semibold text-slate-900">
                {section()}. Google Analytics 4
              </h2>
              <p className="mt-3">
                Diese Website nutzt Google Analytics 4, einen Webanalysedienst der
                Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
                Google Analytics verwendet Cookies, um eine Analyse der Benutzung der
                Website zu ermöglichen.
              </p>
              <p className="mt-3">
                Wir verwenden Google Analytics mit der Einstellung &quot;anonymize_ip&quot;,
                sodass Ihre IP-Adresse von Google innerhalb der EU gekürzt wird.
              </p>
              <p className="mt-3">
                Google Analytics wird ausschließlich nach Ihrer ausdrücklichen
                Einwilligung (Analyse-Consent) über unser Cookie-Banner geladen.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.
              </p>
              <p className="mt-3">
                Weitere Informationen:{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                  Google Datenschutzerklärung
                </a>
              </p>
            </section>
          )}

          {/* Google Tag Manager */}
          {t.googleTagManager.enabled && (
            <section>
              <h2 className="font-heading text-xl font-semibold text-slate-900">
                {section()}. Google Tag Manager
              </h2>
              <p className="mt-3">
                Diese Website nutzt den Google Tag Manager der Google Ireland Limited.
                Der Tag Manager selbst setzt keine Cookies und erfasst keine
                personenbezogenen Daten. Er dient als Container zur Verwaltung von
                Web-Tags (Tracking-Codes).
              </p>
              <p className="mt-3">
                Der Google Tag Manager wird ausschließlich nach Ihrer ausdrücklichen
                Einwilligung (Marketing-Consent) über unser Cookie-Banner geladen, da
                über den Tag Manager weitere Marketing-Tools eingebunden werden können.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.
              </p>
            </section>
          )}

          {/* PostHog */}
          {t.posthog.enabled && (
            <section>
              <h2 className="font-heading text-xl font-semibold text-slate-900">
                {section()}. PostHog
              </h2>
              <p className="mt-3">
                Diese Website nutzt PostHog, einen Open-Source Product Analytics Dienst
                der PostHog Inc. PostHog wird verwendet, um das Nutzerverhalten auf
                unserer Website zu analysieren und die Benutzererfahrung zu verbessern.
              </p>
              <p className="mt-3">
                Wir verwenden PostHog mit der Einstellung &quot;respect_dnt&quot; (Do Not Track)
                und speichern Daten auf{" "}
                {t.posthog.apiHost?.includes("eu") ? "EU-Servern" : "Servern in den USA"}.
              </p>
              <p className="mt-3">
                PostHog wird ausschließlich nach Ihrer ausdrücklichen Einwilligung
                (Analyse-Consent) über unser Cookie-Banner geladen.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.
              </p>
              <p className="mt-3">
                Weitere Informationen:{" "}
                <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                  PostHog Datenschutzerklärung
                </a>
              </p>
            </section>
          )}

          {/* Matomo */}
          {t.matomo.enabled && (
            <section>
              <h2 className="font-heading text-xl font-semibold text-slate-900">
                {section()}. Matomo
              </h2>
              <p className="mt-3">
                Diese Website nutzt Matomo (ehemals Piwik), eine datenschutzfreundliche
                Open-Source Web-Analyse-Plattform. Matomo wird auf{" "}
                {t.matomo.url?.includes("matomo.cloud")
                  ? "Matomo Cloud (EU-Server)"
                  : "unseren eigenen Servern"}{" "}
                betrieben.
              </p>
              <p className="mt-3">
                Wir verwenden Matomo mit deaktivierten Cookies (cookieless Tracking),
                um die Privatsphäre unserer Nutzer bestmöglich zu schützen.
                IP-Adressen werden anonymisiert.
              </p>
              <p className="mt-3">
                Matomo wird ausschließlich nach Ihrer ausdrücklichen Einwilligung
                (Analyse-Consent) über unser Cookie-Banner geladen.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.
              </p>
            </section>
          )}

          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              {section()}. Kontaktformular
            </h2>
            <p className="mt-3">
              Wenn Sie uns über das Kontaktformular kontaktieren, werden Ihr Name,
              Ihre E-Mail-Adresse, Telefonnummer und Nachricht erhoben und zum
              Zweck der Bearbeitung Ihrer Anfrage gespeichert.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              {section()}. Ihre Rechte als betroffene Person
            </h2>
            <p className="mt-3">
              Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung
              (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der
              Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO)
              und Widerspruch (Art. 21 DSGVO). Sie können Ihre Einwilligung
              jederzeit widerrufen und haben ein Beschwerderecht bei einer
              Aufsichtsbehörde (Art. 77 DSGVO).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              {section()}. Aktualität und Änderung dieser Datenschutzerklärung
            </h2>
            <p className="mt-3">
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand
              März 2026.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
