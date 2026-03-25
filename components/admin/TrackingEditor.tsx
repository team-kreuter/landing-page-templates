"use client";

import { useState, useEffect } from "react";
import { SaveButton } from "./SaveButton";
import { AlertCircle } from "lucide-react";

type TrackingData = {
  metaPixel: { enabled: boolean; pixelId: string; capiToken: string; capiPixelId: string };
  googleAnalytics: { enabled: boolean; measurementId: string };
  googleTagManager: { enabled: boolean; containerId: string };
  posthog: { enabled: boolean; apiKey: string; apiHost: string };
  matomo: { enabled: boolean; url: string; siteId: string };
};

function ToolCard({
  title,
  description,
  consent,
  enabled,
  onToggle,
  children,
}: {
  title: string;
  description: string;
  consent: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border bg-white p-6 ${enabled ? "border-stone-200" : "border-stone-100 opacity-75"}`}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-stone-900">{title}</h3>
          <p className="mt-0.5 text-xs text-stone-400">{description}</p>
          <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
            consent === "Marketing" ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
          }`}>
            Consent: {consent}
          </span>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggle(e.target.checked)}
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-stone-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-stone-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-stone-900 peer-checked:after:translate-x-full peer-checked:after:border-white" />
        </label>
      </div>
      {enabled && <div className="space-y-3 border-t border-stone-100 pt-4">{children}</div>}
    </div>
  );
}

function Input({ label, value, onChange, placeholder, hint, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string; type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-stone-700">{label}</label>
      {hint && <p className="mb-1 text-xs text-stone-400">{hint}</p>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm font-mono outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200"
      />
    </div>
  );
}

export function TrackingEditor() {
  const [data, setData] = useState<TrackingData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/tracking")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setSaved(false);

    const res = await fetch("/api/admin/tracking", {
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

  const update = (tool: keyof TrackingData, field: string, value: string | boolean) => {
    setData({
      ...data,
      [tool]: { ...data[tool], [field]: value },
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Tracking & Analytics</h2>
          <p className="text-sm text-stone-500">Tracking-Tools konfigurieren (DSGVO-konform mit Cookie-Consent)</p>
        </div>
        <SaveButton saving={saving} saved={saved} onClick={handleSave} />
      </div>

      {/* DSGVO Info */}
      <div className="mb-6 flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
        <div className="text-sm text-blue-800">
          <p className="font-medium">DSGVO-konform</p>
          <p className="mt-1 text-blue-600">
            Alle Tracking-Tools werden erst nach ausdrücklicher Einwilligung des Nutzers geladen.
            Der Cookie-Banner wird automatisch angepasst und zeigt nur die aktivierten Tools an.
            Marketing-Tools erfordern Marketing-Consent, Analyse-Tools erfordern Analyse-Consent.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Meta Pixel */}
        <ToolCard
          title="Meta Pixel (Facebook)"
          description="Conversion-Tracking für Meta/Facebook/Instagram Werbeanzeigen"
          consent="Marketing"
          enabled={data.metaPixel.enabled}
          onToggle={(v) => update("metaPixel", "enabled", v)}
        >
          <Input
            label="Pixel ID"
            value={data.metaPixel.pixelId}
            onChange={(v) => update("metaPixel", "pixelId", v)}
            placeholder="123456789012345"
            hint="Die 15-stellige Pixel-ID aus dem Meta Events Manager"
          />
          <Input
            label="Conversions API Token"
            value={data.metaPixel.capiToken}
            onChange={(v) => update("metaPixel", "capiToken", v)}
            placeholder="EAAx..."
            hint="Server-seitiges Token für die Conversions API (optional, aber empfohlen)"
          />
          <Input
            label="CAPI Pixel ID"
            value={data.metaPixel.capiPixelId}
            onChange={(v) => update("metaPixel", "capiPixelId", v)}
            placeholder="123456789012345"
            hint="Pixel-ID für serverseitige Events (normalerweise gleich wie Pixel ID)"
          />
        </ToolCard>

        {/* Google Analytics */}
        <ToolCard
          title="Google Analytics 4"
          description="Website-Analyse und Besucherstatistiken von Google"
          consent="Analyse"
          enabled={data.googleAnalytics.enabled}
          onToggle={(v) => update("googleAnalytics", "enabled", v)}
        >
          <Input
            label="Measurement ID"
            value={data.googleAnalytics.measurementId}
            onChange={(v) => update("googleAnalytics", "measurementId", v)}
            placeholder="G-XXXXXXXXXX"
            hint="Die Mess-ID aus Google Analytics (beginnt mit G-)"
          />
        </ToolCard>

        {/* Google Tag Manager */}
        <ToolCard
          title="Google Tag Manager"
          description="Container für verschiedene Tracking-Tags und Marketing-Pixel"
          consent="Marketing"
          enabled={data.googleTagManager.enabled}
          onToggle={(v) => update("googleTagManager", "enabled", v)}
        >
          <Input
            label="Container ID"
            value={data.googleTagManager.containerId}
            onChange={(v) => update("googleTagManager", "containerId", v)}
            placeholder="GTM-XXXXXXX"
            hint="Die Container-ID aus dem Tag Manager (beginnt mit GTM-)"
          />
        </ToolCard>

        {/* PostHog */}
        <ToolCard
          title="PostHog"
          description="Open-Source Product Analytics, Session Recording und Feature Flags"
          consent="Analyse"
          enabled={data.posthog.enabled}
          onToggle={(v) => update("posthog", "enabled", v)}
        >
          <Input
            label="API Key"
            value={data.posthog.apiKey}
            onChange={(v) => update("posthog", "apiKey", v)}
            placeholder="phc_..."
            hint="Project API Key aus den PostHog-Einstellungen"
          />
          <Input
            label="API Host"
            value={data.posthog.apiHost}
            onChange={(v) => update("posthog", "apiHost", v)}
            placeholder="https://eu.i.posthog.com"
            hint="EU: https://eu.i.posthog.com | US: https://us.i.posthog.com"
          />
        </ToolCard>

        {/* Matomo */}
        <ToolCard
          title="Matomo"
          description="Datenschutzfreundliche Web-Analyse (DSGVO-konform, selbst gehostet möglich)"
          consent="Analyse"
          enabled={data.matomo.enabled}
          onToggle={(v) => update("matomo", "enabled", v)}
        >
          <Input
            label="Matomo URL"
            value={data.matomo.url}
            onChange={(v) => update("matomo", "url", v)}
            placeholder="https://analytics.ihre-domain.de"
            hint="URL Ihrer Matomo-Installation (ohne abschließenden /)"
          />
          <Input
            label="Site ID"
            value={data.matomo.siteId}
            onChange={(v) => update("matomo", "siteId", v)}
            placeholder="1"
            hint="Die Site-ID aus den Matomo-Einstellungen"
          />
        </ToolCard>
      </div>

      <div className="mt-6 flex justify-end">
        <SaveButton saving={saving} saved={saved} onClick={handleSave} />
      </div>
    </div>
  );
}
