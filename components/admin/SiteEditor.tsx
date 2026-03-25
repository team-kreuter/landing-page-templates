"use client";

import { useState, useEffect } from "react";
import { SaveButton } from "./SaveButton";
import { ImageUpload } from "./ImageUpload";

type SiteData = {
  company: Record<string, string>;
  datenschutz: Record<string, string>;
};

const companyFields = [
  { key: "name", label: "Firmenname" },
  { key: "street", label: "Straße" },
  { key: "zip", label: "PLZ" },
  { key: "city", label: "Stadt" },
  { key: "country", label: "Land" },
  { key: "phone", label: "Telefon" },
  { key: "email", label: "E-Mail" },
  { key: "website", label: "Website" },
  { key: "ceo", label: "Geschäftsführer" },
  { key: "register", label: "Handelsregister" },
  { key: "vatId", label: "USt-ID" },
];

const datenschutzFields = [
  { key: "responsiblePerson", label: "Datenschutz-Verantwortlicher" },
  { key: "hostingProvider", label: "Hosting-Anbieter" },
  { key: "analyticsInfo", label: "Analytics-Hinweis" },
];

export function SiteEditor() {
  const [data, setData] = useState<SiteData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setSaved(false);

    const res = await fetch("/api/admin/site", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  if (!data) return <div className="text-sm text-stone-400">Laden...</div>;

  const updateCompany = (key: string, value: string) => {
    setData({ ...data, company: { ...data.company, [key]: value } });
  };

  const updateDatenschutz = (key: string, value: string) => {
    setData({ ...data, datenschutz: { ...data.datenschutz, [key]: value } });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Firmendaten</h2>
          <p className="text-sm text-stone-500">Unternehmensinformationen, Impressum & Datenschutz</p>
        </div>
        <SaveButton saving={saving} saved={saved} onClick={handleSave} />
      </div>

      {/* Logo */}
      <div className="mb-6 rounded-xl border border-stone-200 bg-white p-6">
        <h3 className="mb-4 font-semibold text-stone-900">Logo</h3>
        <ImageUpload
          value={data.company.logo || ""}
          onChange={(url) => updateCompany("logo", url)}
          label="Firmenlogo"
        />
      </div>

      {/* Company Info */}
      <div className="mb-6 rounded-xl border border-stone-200 bg-white p-6">
        <h3 className="mb-4 font-semibold text-stone-900">Unternehmen</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {companyFields.map((field) => (
            <div key={field.key}>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                {field.label}
              </label>
              <input
                type="text"
                value={data.company[field.key] || ""}
                onChange={(e) => updateCompany(field.key, e.target.value)}
                className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Datenschutz */}
      <div className="mb-6 rounded-xl border border-stone-200 bg-white p-6">
        <h3 className="mb-4 font-semibold text-stone-900">Datenschutz-Angaben</h3>
        <div className="space-y-4">
          {datenschutzFields.map((field) => (
            <div key={field.key}>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                {field.label}
              </label>
              <textarea
                value={data.datenschutz[field.key] || ""}
                onChange={(e) => updateDatenschutz(field.key, e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <SaveButton saving={saving} saved={saved} onClick={handleSave} />
      </div>
    </div>
  );
}
