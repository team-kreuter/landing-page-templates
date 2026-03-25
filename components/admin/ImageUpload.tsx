"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Bild hochladen" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload fehlgeschlagen");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Upload fehlgeschlagen");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-stone-700">{label}</label>

      {value && (
        <div className="mb-2 flex items-center gap-2">
          <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
            <img src={value} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="truncate text-xs text-stone-500">{value}</p>
            <button
              type="button"
              onClick={() => onChange("")}
              className="mt-1 flex items-center gap-1 text-xs text-red-500 hover:text-red-700"
            >
              <X className="h-3 w-3" />
              Entfernen
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-600 transition hover:bg-stone-50 disabled:opacity-50"
      >
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {uploading ? "Wird hochgeladen..." : "Bild auswählen"}
      </button>

      {/* Direct URL input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="oder URL eingeben: /uploads/bild.png"
        className="mt-2 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400"
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
