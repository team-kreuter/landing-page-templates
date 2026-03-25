"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Palette, FileText, BarChart3, Mail, LogOut, AlertTriangle } from "lucide-react";
import { SiteEditor } from "./SiteEditor";
import { ThemeEditor } from "./ThemeEditor";
import { ContentEditor } from "./ContentEditor";
import { TrackingEditor } from "./TrackingEditor";
import { EmailEditor } from "./EmailEditor";

type Tab = "site" | "theme" | "tracking" | "email" | "leadsgenerierung";

const isProduction = process.env.NODE_ENV === "production";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "site", label: "Firmendaten", icon: <Building2 className="h-4 w-4" /> },
  { id: "theme", label: "Farben", icon: <Palette className="h-4 w-4" /> },
  { id: "tracking", label: "Tracking", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "email", label: "E-Mail", icon: <Mail className="h-4 w-4" /> },
  { id: "leadsgenerierung", label: "Landing Page", icon: <FileText className="h-4 w-4" /> },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("site");
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin");
  }

  return (
    <div className="flex min-h-screen bg-stone-100">
      <aside className="fixed left-0 top-0 flex h-full w-60 flex-col border-r border-stone-200 bg-white">
        <div className="border-b border-stone-200 px-5 py-4">
          <h1 className="text-base font-bold text-stone-900">Admin Dashboard</h1>
          <p className="text-xs text-stone-400">Inhalte verwalten</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-stone-900 text-white"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-stone-200 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-stone-500 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Abmelden
          </button>
        </div>
      </aside>

      <main className="ml-60 flex-1 p-8">
        <div className="mx-auto max-w-4xl">
          {isProduction && (
            <div className="mb-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <div className="text-sm text-amber-800">
                <p className="font-medium">Nur-Lese-Modus (Production)</p>
                <p className="mt-1 text-amber-600">
                  Änderungen können nur lokal vorgenommen werden. Starte das Projekt mit{" "}
                  <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">npm run dev</code>{" "}
                  auf deinem Rechner, um Inhalte zu bearbeiten.
                </p>
              </div>
            </div>
          )}
          {activeTab === "site" && <SiteEditor />}
          {activeTab === "theme" && <ThemeEditor />}
          {activeTab === "tracking" && <TrackingEditor />}
          {activeTab === "email" && <EmailEditor />}
          {activeTab === "leadsgenerierung" && <ContentEditor page="leadsgenerierung" />}
        </div>
      </main>
    </div>
  );
}
