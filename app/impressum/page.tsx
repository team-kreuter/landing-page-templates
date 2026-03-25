import { siteConfig } from "@/config/site";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: "noindex, nofollow",
};

export default function ImpressumPage() {
  const c = siteConfig.company;

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

        <h1 className="font-heading text-3xl font-bold text-slate-900">Impressum</h1>

        <div className="mt-8 space-y-6 text-slate-600">
          <section>
            <h2 className="font-heading text-lg font-semibold text-slate-900">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="mt-2">
              {c.name}
              <br />
              {c.street}
              <br />
              {c.zip} {c.city}
              <br />
              {c.country}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-slate-900">
              Vertreten durch
            </h2>
            <p className="mt-2">{c.ceo}</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-slate-900">Kontakt</h2>
            <p className="mt-2">
              Telefon: {c.phone}
              <br />
              E-Mail: {c.email}
              <br />
              Website: {c.website}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-slate-900">
              Handelsregister
            </h2>
            <p className="mt-2">{c.register}</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-slate-900">
              Umsatzsteuer-ID
            </h2>
            <p className="mt-2">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              {c.vatId}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-slate-900">
              Streitschlichtung
            </h2>
            <p className="mt-2">
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              <br />
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
