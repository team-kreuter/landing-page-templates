"use client";

import { useState, useEffect } from "react";
import { SaveButton } from "./SaveButton";
import { AlertCircle, Mail, Loader2, Check, X } from "lucide-react";

type EmailData = {
  enabled: boolean;
  smtp: { host: string; port: number; secure: boolean; user: string; password: string };
  from: { name: string; email: string };
  to: string;
  subject: string;
  replyTo: boolean;
};

const smtpPresets = [
  { label: "Benutzerdefiniert", host: "", port: 587, secure: false },
  { label: "Gmail / Google Workspace", host: "smtp.gmail.com", port: 587, secure: false },
  { label: "Outlook / Microsoft 365", host: "smtp.office365.com", port: 587, secure: false },
  { label: "IONOS (1&1)", host: "smtp.ionos.de", port: 587, secure: false },
  { label: "Strato", host: "smtp.strato.de", port: 465, secure: true },
  { label: "All-Inkl", host: "smtp.all-inkl.com", port: 587, secure: false },
  { label: "Hetzner", host: "mail.your-server.de", port: 587, secure: false },
];

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
        className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200"
      />
    </div>
  );
}

export function EmailEditor() {
  const [data, setData] = useState<EmailData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; msg: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/email")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setSaved(false);

    const res = await fetch("/api/admin/email", {
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

  async function handleTest() {
    if (!data) return;
    setTesting(true);
    setTestResult(null);

    // First save current config
    await fetch("/api/admin/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Then send test
    try {
      const res = await fetch("/api/admin/email/test", { method: "POST" });
      const result = await res.json();
      setTestResult({ ok: res.ok, msg: result.message || result.error });
    } catch {
      setTestResult({ ok: false, msg: "Verbindungsfehler" });
    }
    setTesting(false);
  }

  if (!data) return <div className="text-sm text-stone-400">Laden...</div>;

  const update = (field: string, value: string | number | boolean) => {
    setData({ ...data, [field]: value });
  };

  const updateSmtp = (field: string, value: string | number | boolean) => {
    setData({ ...data, smtp: { ...data.smtp, [field]: value } });
  };

  const updateFrom = (field: string, value: string) => {
    setData({ ...data, from: { ...data.from, [field]: value } });
  };

  const applyPreset = (host: string, port: number, secure: boolean) => {
    setData({ ...data, smtp: { ...data.smtp, host, port, secure } });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">E-Mail-Benachrichtigung</h2>
          <p className="text-sm text-stone-500">Kontaktformular-Einreichungen per E-Mail empfangen</p>
        </div>
        <SaveButton saving={saving} saved={saved} onClick={handleSave} />
      </div>

      {/* Enable toggle */}
      <div className={`mb-6 rounded-xl border bg-white p-6 ${data.enabled ? "border-stone-200" : "border-stone-100"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-stone-600" />
            <div>
              <h3 className="font-semibold text-stone-900">E-Mail-Versand</h3>
              <p className="text-xs text-stone-400">Bei jeder Formular-Einreichung eine E-Mail an dich senden</p>
            </div>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={data.enabled}
              onChange={(e) => update("enabled", e.target.checked)}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-stone-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-stone-900 peer-checked:after:translate-x-full" />
          </label>
        </div>
      </div>

      {data.enabled && (
        <div className="space-y-6">
          {/* SMTP Config */}
          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <h3 className="mb-4 font-semibold text-stone-900">SMTP-Server</h3>

            {/* Presets */}
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-stone-700">Anbieter-Vorlage</label>
              <select
                onChange={(e) => {
                  const preset = smtpPresets[parseInt(e.target.value)];
                  if (preset) applyPreset(preset.host, preset.port, preset.secure);
                }}
                className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-stone-400"
                defaultValue=""
              >
                <option value="" disabled>Vorlage auswählen...</option>
                {smtpPresets.map((p, i) => (
                  <option key={i} value={i}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input label="SMTP-Host" value={data.smtp.host} onChange={(v) => updateSmtp("host", v)} placeholder="smtp.example.com" />
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-stone-700">Port</label>
                  <input
                    type="number"
                    value={data.smtp.port}
                    onChange={(e) => updateSmtp("port", parseInt(e.target.value) || 587)}
                    className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-stone-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700">SSL/TLS</label>
                  <label className="flex h-[42px] cursor-pointer items-center gap-2 rounded-lg border border-stone-200 px-3">
                    <input
                      type="checkbox"
                      checked={data.smtp.secure}
                      onChange={(e) => updateSmtp("secure", e.target.checked)}
                      className="h-4 w-4 rounded border-stone-300"
                    />
                    <span className="text-sm text-stone-600">SSL</span>
                  </label>
                </div>
              </div>
              <Input label="Benutzername" value={data.smtp.user} onChange={(v) => updateSmtp("user", v)} placeholder="user@example.com" />
              <Input label="Passwort" value={data.smtp.password} onChange={(v) => updateSmtp("password", v)} placeholder="••••••••" type="password" hint="App-Passwort bei Gmail/Outlook" />
            </div>
          </div>

          {/* Email Settings */}
          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <h3 className="mb-4 font-semibold text-stone-900">E-Mail-Einstellungen</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Absender-Name" value={data.from.name} onChange={(v) => updateFrom("name", v)} placeholder="Kontaktformular" />
              <Input label="Absender-E-Mail" value={data.from.email} onChange={(v) => updateFrom("email", v)} placeholder="noreply@example.com" hint="Leer = SMTP-Benutzername" />
              <Input label="Empfänger-E-Mail" value={data.to} onChange={(v) => update("to", v)} placeholder="info@example.com" hint="Wohin sollen die Anfragen gehen?" />
              <Input label="Betreff" value={data.subject} onChange={(v) => update("subject", v)} placeholder="Neue Anfrage über das Kontaktformular" />
            </div>
            <label className="mt-4 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={data.replyTo}
                onChange={(e) => update("replyTo", e.target.checked)}
                className="h-4 w-4 rounded border-stone-300"
              />
              <div>
                <span className="text-sm font-medium text-stone-700">Reply-To setzen</span>
                <p className="text-xs text-stone-400">Antworten gehen direkt an die E-Mail des Absenders</p>
              </div>
            </label>
          </div>

          {/* Test */}
          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <h3 className="mb-2 font-semibold text-stone-900">Test-E-Mail senden</h3>
            <p className="mb-4 text-xs text-stone-400">Sendet eine Test-E-Mail an die Empfänger-Adresse um die Konfiguration zu prüfen.</p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleTest}
                disabled={testing || !data.smtp.host || !data.to}
                className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:opacity-50"
              >
                {testing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                Test senden
              </button>
              {testResult && (
                <span className={`flex items-center gap-1.5 text-sm ${testResult.ok ? "text-green-600" : "text-red-500"}`}>
                  {testResult.ok ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  {testResult.msg}
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">SMTP-Hinweise</p>
              <ul className="mt-1 list-inside list-disc space-y-0.5 text-blue-600">
                <li>Bei Gmail: App-Passwort erstellen (nicht das normale Passwort)</li>
                <li>Bei Outlook/365: App-Passwort in Sicherheitseinstellungen</li>
                <li>Port 587 = STARTTLS (Standard), Port 465 = SSL/TLS</li>
                <li>Das SMTP-Passwort wird in der lokalen email.json gespeichert</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <SaveButton saving={saving} saved={saved} onClick={handleSave} />
      </div>
    </div>
  );
}
