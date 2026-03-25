"use client";

import { Loader2, Check } from "lucide-react";

interface SaveButtonProps {
  saving: boolean;
  saved: boolean;
  onClick: () => void;
  label?: string;
}

export function SaveButton({ saving, saved, onClick, label = "Speichern" }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:opacity-50"
    >
      {saving ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : saved ? (
        <Check className="h-4 w-4 text-green-400" />
      ) : null}
      {saved ? "Gespeichert!" : label}
    </button>
  );
}
