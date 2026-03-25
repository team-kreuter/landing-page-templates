"use client";

import { useState, useEffect } from "react";
import { SaveButton } from "./SaveButton";

type ThemeData = {
  colors: Record<string, string>;
  borderRadius: string;
};

const colorFields = [
  { key: "primary", label: "Primärfarbe", hint: "Hauptfarbe für Buttons und Akzente" },
  { key: "primaryDark", label: "Primärfarbe (dunkel)", hint: "Hover-Zustand der Buttons" },
  { key: "primaryLight", label: "Primärfarbe (hell)", hint: "Helle Variante für Badges" },
  { key: "accent", label: "Akzentfarbe", hint: "Dunkle Kontrastfarbe" },
];

export function ThemeEditor() {
  const [data, setData] = useState<ThemeData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/theme")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setSaved(false);

    const res = await fetch("/api/admin/theme", {
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

  const updateColor = (key: string, value: string) => {
    setData({ ...data, colors: { ...data.colors, [key]: value } });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Farben & Design</h2>
          <p className="text-sm text-stone-500">Farbschema der Landing Pages anpassen</p>
        </div>
        <SaveButton saving={saving} saved={saved} onClick={handleSave} />
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <div className="space-y-6">
          {colorFields.map((field) => (
            <div key={field.key} className="flex items-start gap-4">
              <div
                className="mt-1 h-12 w-12 shrink-0 rounded-lg border border-stone-200 shadow-sm"
                style={{ backgroundColor: data.colors[field.key] }}
              />
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  {field.label}
                </label>
                <p className="mb-2 text-xs text-stone-400">{field.hint}</p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={data.colors[field.key]}
                    onChange={(e) => updateColor(field.key, e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border border-stone-200"
                  />
                  <input
                    type="text"
                    value={data.colors[field.key]}
                    onChange={(e) => updateColor(field.key, e.target.value)}
                    className="w-32 rounded-lg border border-stone-200 px-3 py-2 text-sm font-mono outline-none focus:border-stone-400"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview */}
        <div className="mt-8 border-t border-stone-200 pt-6">
          <h4 className="mb-3 text-sm font-semibold text-stone-700">Vorschau</h4>
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
              style={{ backgroundColor: data.colors.primary }}
            >
              Primär-Button
            </button>
            <button
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
              style={{ backgroundColor: data.colors.primaryDark }}
            >
              Button Hover
            </button>
            <span
              className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold"
              style={{
                backgroundColor: data.colors.primaryLight + "20",
                color: data.colors.primaryLight,
              }}
            >
              Badge
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <SaveButton saving={saving} saved={saved} onClick={handleSave} />
      </div>
    </div>
  );
}
