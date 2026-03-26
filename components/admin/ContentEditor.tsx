"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { SaveButton } from "./SaveButton";
import { ImageUpload } from "./ImageUpload";
import { IconPicker } from "./IconPicker";

interface ContentEditorProps {
  page: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContentData = Record<string, any>;

function SectionCard({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-stone-200 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <h3 className="font-semibold text-stone-900">{title}</h3>
        <ChevronDown className={`h-5 w-5 text-stone-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="border-t border-stone-100 px-6 py-5">{children}</div>}
    </div>
  );
}

function TextField({ label, value, onChange, multiline = false, hint }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; hint?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-stone-700">{label}</label>
      {hint && <p className="mb-1 text-xs text-stone-400">{hint}</p>}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200"
        />
      )}
    </div>
  );
}

export function ContentEditor({ page }: ContentEditorProps) {
  const [data, setData] = useState<ContentData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setData(null);
    fetch(`/api/admin/content?page=${page}`)
      .then((r) => r.json())
      .then(setData);
  }, [page]);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setSaved(false);

    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page, data }),
    });

    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  if (!data) return <div className="text-sm text-stone-400">Laden...</div>;

  // Helper to update nested data
  const set = (path: string, value: unknown) => {
    const copy = JSON.parse(JSON.stringify(data));
    const keys = path.split(".");
    let obj = copy;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    setData(copy);
  };

  const get = (path: string): string => {
    let obj: unknown = data;
    for (const key of path.split(".")) {
      obj = (obj as Record<string, unknown>)?.[key];
    }
    return (obj as string) ?? "";
  };

  const pageLabel = page === "verkauf" ? "Verkauf" : "Akquise";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Seite: {pageLabel}</h2>
          <p className="text-sm text-stone-500">Alle Texte und Inhalte der {pageLabel}-Landing-Page</p>
        </div>
        <SaveButton saving={saving} saved={saved} onClick={handleSave} />
      </div>

      <div className="space-y-4">
        {/* Meta */}
        <SectionCard title="SEO / Meta-Daten">
          <div className="space-y-4">
            <TextField label="Seitentitel" value={get("meta.title")} onChange={(v) => set("meta.title", v)} hint="Wird im Browser-Tab und bei Google angezeigt" />
            <TextField label="Meta-Beschreibung" value={get("meta.description")} onChange={(v) => set("meta.description", v)} multiline hint="Wird bei Google unter dem Titel angezeigt" />
          </div>
        </SectionCard>

        {/* Hero */}
        <SectionCard title="Hero-Bereich" defaultOpen>
          <div className="space-y-4">
            <TextField label="Badge (kleiner Text oben)" value={get("hero.badge")} onChange={(v) => set("hero.badge", v)} />
            <TextField label="Headline" value={get("hero.headline")} onChange={(v) => set("hero.headline", v)} multiline hint="Zeilenumbruch mit \n" />
            <TextField label="Subheadline" value={get("hero.subheadline")} onChange={(v) => set("hero.subheadline", v)} multiline />
            <TextField label="CTA-Button Text" value={get("hero.ctaText")} onChange={(v) => set("hero.ctaText", v)} />
            <TextField label="CTA Untertext" value={get("hero.ctaSubtext")} onChange={(v) => set("hero.ctaSubtext", v)} />

            {/* Hero Image with visibility toggle */}
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-stone-700">Hero-Bild</label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-500">
                  <span>Sichtbar</span>
                  <div className="relative inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={data.hero?.imageVisible !== false}
                      onChange={(e) => set("hero.imageVisible", e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="peer h-5 w-9 rounded-full bg-stone-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-stone-900 peer-checked:after:translate-x-full" />
                  </div>
                </label>
              </div>
              <ImageUpload value={get("hero.image")} onChange={(v) => set("hero.image", v)} label="Bild auswählen oder URL eingeben" />
              <p className="mt-2 text-xs text-stone-400">Wenn aktiviert, wird das Layout zu Text links + Bild rechts. Ohne Bild bleibt der Text zentriert.</p>
            </div>

            {/* Trust Badges */}
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Trust-Badges</label>
              {(data.hero?.trustBadges || []).map((badge: string, i: number) => (
                <div key={i} className="mb-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => {
                      const badges = [...data.hero.trustBadges];
                      badges[i] = e.target.value;
                      set("hero.trustBadges", badges);
                    }}
                    className="flex-1 rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400"
                  />
                  <button onClick={() => {
                    const badges = data.hero.trustBadges.filter((_: string, j: number) => j !== i);
                    set("hero.trustBadges", badges);
                  }} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              <button
                onClick={() => set("hero.trustBadges", [...(data.hero?.trustBadges || []), "Neuer Badge"])}
                className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700"
              >
                <Plus className="h-4 w-4" /> Badge hinzufügen
              </button>
            </div>
          </div>
        </SectionCard>

        {/* Problem Section */}
        <SectionCard title="Problem-Bereich">
          <div className="space-y-4">
            <TextField label="Badge" value={get("problem.badge")} onChange={(v) => set("problem.badge", v)} />
            <TextField label="Headline" value={get("problem.headline")} onChange={(v) => set("problem.headline", v)} multiline />
            <TextField label="Subheadline" value={get("problem.subheadline")} onChange={(v) => set("problem.subheadline", v)} multiline />

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Problem-Punkte</label>
              {(data.problem?.items || []).map((item: { icon: string; title: string; description: string }, i: number) => (
                <div key={i} className="mb-4 rounded-lg border border-stone-100 bg-stone-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-stone-600">Punkt {i + 1}</span>
                    <button onClick={() => {
                      const items = data.problem.items.filter((_: unknown, j: number) => j !== i);
                      set("problem.items", items);
                    }} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <IconPicker value={item.icon} onChange={(v) => {
                      const items = [...data.problem.items]; items[i] = { ...item, icon: v }; set("problem.items", items);
                    }} />
                    <input type="text" value={item.title} placeholder="Titel" onChange={(e) => {
                      const items = [...data.problem.items]; items[i] = { ...item, title: e.target.value }; set("problem.items", items);
                    }} className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400" />
                  </div>
                  <textarea value={item.description} placeholder="Beschreibung" onChange={(e) => {
                    const items = [...data.problem.items]; items[i] = { ...item, description: e.target.value }; set("problem.items", items);
                  }} rows={2} className="mt-2 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400" />
                </div>
              ))}
              <button onClick={() => set("problem.items", [...(data.problem?.items || []), { icon: "AlertCircle", title: "", description: "" }])}
                className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700"><Plus className="h-4 w-4" /> Punkt hinzufügen</button>
            </div>
          </div>
        </SectionCard>

        {/* Solution / Steps */}
        <SectionCard title="Prozess / 3 Schritte">
          <div className="space-y-4">
            <TextField label="Badge" value={get("solution.badge")} onChange={(v) => set("solution.badge", v)} />
            <TextField label="Headline" value={get("solution.headline")} onChange={(v) => set("solution.headline", v)} multiline />
            <TextField label="Subheadline" value={get("solution.subheadline")} onChange={(v) => set("solution.subheadline", v)} />

            {(data.solution?.steps || []).map((step: { step: number; icon: string; title: string; description: string }, i: number) => (
              <div key={i} className="rounded-lg border border-stone-100 bg-stone-50 p-4">
                <p className="mb-2 text-sm font-medium text-stone-600">Schritt {i + 1}</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <IconPicker value={step.icon} onChange={(v) => {
                    const steps = [...data.solution.steps]; steps[i] = { ...step, icon: v }; set("solution.steps", steps);
                  }} />
                  <input type="text" value={step.title} placeholder="Titel" onChange={(e) => {
                    const steps = [...data.solution.steps]; steps[i] = { ...step, title: e.target.value }; set("solution.steps", steps);
                  }} className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400" />
                </div>
                <textarea value={step.description} placeholder="Beschreibung" onChange={(e) => {
                  const steps = [...data.solution.steps]; steps[i] = { ...step, description: e.target.value }; set("solution.steps", steps);
                }} rows={2} className="mt-2 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400" />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Benefits */}
        <SectionCard title="Vorteile">
          <div className="space-y-4">
            <TextField label="Badge" value={get("benefits.badge")} onChange={(v) => set("benefits.badge", v)} />
            <TextField label="Headline" value={get("benefits.headline")} onChange={(v) => set("benefits.headline", v)} multiline />
            <TextField label="Subheadline" value={get("benefits.subheadline")} onChange={(v) => set("benefits.subheadline", v)} multiline />

            {(data.benefits?.items || []).map((item: { icon: string; title: string; description: string }, i: number) => (
              <div key={i} className="rounded-lg border border-stone-100 bg-stone-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-600">Vorteil {i + 1}</span>
                  <button onClick={() => {
                    const items = data.benefits.items.filter((_: unknown, j: number) => j !== i);
                    set("benefits.items", items);
                  }} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <IconPicker value={item.icon} onChange={(v) => {
                    const items = [...data.benefits.items]; items[i] = { ...item, icon: v }; set("benefits.items", items);
                  }} />
                  <input type="text" value={item.title} placeholder="Titel" onChange={(e) => {
                    const items = [...data.benefits.items]; items[i] = { ...item, title: e.target.value }; set("benefits.items", items);
                  }} className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400" />
                </div>
                <textarea value={item.description} placeholder="Beschreibung" onChange={(e) => {
                  const items = [...data.benefits.items]; items[i] = { ...item, description: e.target.value }; set("benefits.items", items);
                }} rows={2} className="mt-2 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400" />
              </div>
            ))}
            <button onClick={() => set("benefits.items", [...(data.benefits?.items || []), { icon: "Star", title: "", description: "" }])}
              className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700"><Plus className="h-4 w-4" /> Vorteil hinzufügen</button>
          </div>
        </SectionCard>

        {/* Testimonials */}
        <SectionCard title="Kundenstimmen">
          <div className="space-y-4">
            <TextField label="Badge" value={get("testimonials.badge")} onChange={(v) => set("testimonials.badge", v)} />
            <TextField label="Headline" value={get("testimonials.headline")} onChange={(v) => set("testimonials.headline", v)} multiline />
            <TextField label="Subheadline" value={get("testimonials.subheadline")} onChange={(v) => set("testimonials.subheadline", v)} />

            {(data.testimonials?.items || []).map((item: { name: string; role: string; location: string; text: string; rating: number; image?: string }, i: number) => (
              <div key={i} className="rounded-lg border border-stone-100 bg-stone-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-600">Bewertung {i + 1}</span>
                  <button onClick={() => {
                    const items = data.testimonials.items.filter((_: unknown, j: number) => j !== i);
                    set("testimonials.items", items);
                  }} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <input type="text" value={item.name} placeholder="Name" onChange={(e) => {
                    const items = [...data.testimonials.items]; items[i] = { ...item, name: e.target.value }; set("testimonials.items", items);
                  }} className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400" />
                  <input type="text" value={item.role || ""} placeholder="Rolle/Objekttyp" onChange={(e) => {
                    const items = [...data.testimonials.items]; items[i] = { ...item, role: e.target.value }; set("testimonials.items", items);
                  }} className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400" />
                  <input type="text" value={item.location || ""} placeholder="Ort" onChange={(e) => {
                    const items = [...data.testimonials.items]; items[i] = { ...item, location: e.target.value }; set("testimonials.items", items);
                  }} className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400" />
                </div>
                <textarea value={item.text} placeholder="Bewertungstext" onChange={(e) => {
                  const items = [...data.testimonials.items]; items[i] = { ...item, text: e.target.value }; set("testimonials.items", items);
                }} rows={3} className="mt-2 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400" />
                <div className="mt-2">
                  <ImageUpload value={item.image || ""} onChange={(v) => {
                    const items = [...data.testimonials.items]; items[i] = { ...item, image: v }; set("testimonials.items", items);
                  }} label="Foto (optional)" />
                </div>
              </div>
            ))}
            <button onClick={() => set("testimonials.items", [...(data.testimonials?.items || []), { name: "", role: "", location: "", text: "", rating: 5 }])}
              className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700"><Plus className="h-4 w-4" /> Bewertung hinzufügen</button>
          </div>
        </SectionCard>

        {/* FAQ */}
        <SectionCard title="Häufige Fragen (FAQ)">
          <div className="space-y-4">
            <TextField label="Badge" value={get("faq.badge")} onChange={(v) => set("faq.badge", v)} />
            <TextField label="Headline" value={get("faq.headline")} onChange={(v) => set("faq.headline", v)} multiline />

            {(data.faq?.items || []).map((item: { question: string; answer: string }, i: number) => (
              <div key={i} className="rounded-lg border border-stone-100 bg-stone-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-600">Frage {i + 1}</span>
                  <button onClick={() => {
                    const items = data.faq.items.filter((_: unknown, j: number) => j !== i);
                    set("faq.items", items);
                  }} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
                <input type="text" value={item.question} placeholder="Frage" onChange={(e) => {
                  const items = [...data.faq.items]; items[i] = { ...item, question: e.target.value }; set("faq.items", items);
                }} className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400" />
                <textarea value={item.answer} placeholder="Antwort" onChange={(e) => {
                  const items = [...data.faq.items]; items[i] = { ...item, answer: e.target.value }; set("faq.items", items);
                }} rows={3} className="mt-2 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400" />
              </div>
            ))}
            <button onClick={() => set("faq.items", [...(data.faq?.items || []), { question: "", answer: "" }])}
              className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700"><Plus className="h-4 w-4" /> Frage hinzufügen</button>
          </div>
        </SectionCard>

        {/* CTA */}
        <SectionCard title="Call-to-Action">
          <div className="space-y-4">
            <TextField label="Headline" value={get("cta.headline")} onChange={(v) => set("cta.headline", v)} />
            <TextField label="Subheadline" value={get("cta.subheadline")} onChange={(v) => set("cta.subheadline", v)} multiline />
            <TextField label="Button-Text" value={get("cta.ctaText")} onChange={(v) => set("cta.ctaText", v)} />

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Vorteile-Liste</label>
              {(data.cta?.features || []).map((f: string, i: number) => (
                <div key={i} className="mb-2 flex items-center gap-2">
                  <input type="text" value={f} onChange={(e) => {
                    const features = [...data.cta.features]; features[i] = e.target.value; set("cta.features", features);
                  }} className="flex-1 rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400" />
                  <button onClick={() => set("cta.features", data.cta.features.filter((_: string, j: number) => j !== i))}
                    className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              <button onClick={() => set("cta.features", [...(data.cta?.features || []), ""])}
                className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700"><Plus className="h-4 w-4" /> Vorteil hinzufügen</button>
            </div>

            {/* CTA Image with visibility toggle */}
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-stone-700">CTA-Bild</label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-500">
                  <span>Sichtbar</span>
                  <div className="relative inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={data.cta?.imageVisible !== false}
                      onChange={(e) => set("cta.imageVisible", e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="peer h-5 w-9 rounded-full bg-stone-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-stone-900 peer-checked:after:translate-x-full" />
                  </div>
                </label>
              </div>
              <ImageUpload value={get("cta.image")} onChange={(v) => set("cta.image", v)} label="Bild auswählen oder URL eingeben" />
              <p className="mt-2 text-xs text-stone-400">Wenn aktiviert, wird neben dem CTA-Text ein Bild angezeigt.</p>
            </div>
          </div>
        </SectionCard>

        {/* Contact */}
        <SectionCard title="Kontaktformular">
          <div className="space-y-4">
            <TextField label="Badge" value={get("contact.badge")} onChange={(v) => set("contact.badge", v)} />
            <TextField label="Headline" value={get("contact.headline")} onChange={(v) => set("contact.headline", v)} multiline />
            <TextField label="Subheadline" value={get("contact.subheadline")} onChange={(v) => set("contact.subheadline", v)} multiline />
            <TextField label="Erfolgsmeldung" value={get("contact.successMessage")} onChange={(v) => set("contact.successMessage", v)} multiline />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Label: Name" value={get("contact.fields.name")} onChange={(v) => set("contact.fields.name", v)} />
              <TextField label="Label: E-Mail" value={get("contact.fields.email")} onChange={(v) => set("contact.fields.email", v)} />
              <TextField label="Label: Telefon" value={get("contact.fields.phone")} onChange={(v) => set("contact.fields.phone", v)} />
              <TextField label="Button-Text" value={get("contact.fields.submit")} onChange={(v) => set("contact.fields.submit", v)} />
            </div>
            <TextField label="Label: Nachricht" value={get("contact.fields.message")} onChange={(v) => set("contact.fields.message", v)} multiline />
            <TextField label="Einwilligungstext (HTML)" value={get("contact.fields.consent")} onChange={(v) => set("contact.fields.consent", v)} multiline hint="HTML erlaubt für Links" />
          </div>
        </SectionCard>

        {/* Footer */}
        <SectionCard title="Footer">
          <div className="space-y-4">
            <TextField label="Copyright-Text" value={get("footer.copyright")} onChange={(v) => set("footer.copyright", v)} />
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 flex justify-end">
        <SaveButton saving={saving} saved={saved} onClick={handleSave} />
      </div>
    </div>
  );
}
