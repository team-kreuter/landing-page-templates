"use client";

import { useState, useRef, useEffect } from "react";
import * as LucideIcons from "lucide-react";

// Popular icons for real estate / landing pages
const POPULAR_ICONS = [
  "Home", "Building", "Building2", "MapPin", "Key", "DoorOpen", "Landmark",
  "Search", "SearchX", "Clock", "Timer", "Calendar",
  "Shield", "ShieldCheck", "ShieldAlert", "Lock", "Unlock",
  "Star", "Heart", "ThumbsUp", "Award", "Trophy", "Medal",
  "Users", "UserCheck", "UserPlus", "User", "Handshake",
  "Phone", "Mail", "MessageSquare", "Send",
  "Check", "CheckCircle", "AlertCircle", "AlertTriangle", "Info",
  "TrendingUp", "TrendingDown", "BarChart3", "BadgeEuro", "Coins", "Wallet",
  "Camera", "Image", "Eye", "EyeOff",
  "FileText", "ClipboardList", "ClipboardCheck", "ListChecks",
  "Zap", "Sparkles", "Lightbulb", "Target", "Crosshair",
  "ArrowRight", "ArrowUpRight", "MoveRight", "ChevronRight",
  "Percent", "Euro", "CircleDollarSign",
  "Hammer", "Wrench", "Settings", "PenTool",
  "Globe", "Map", "Navigation",
  "Truck", "Package", "Gift",
  "Leaf", "Sun", "Trees",
];

// Get all icon names from lucide-react (filter out non-icon exports)
const ALL_ICON_NAMES = Object.keys(LucideIcons).filter(
  (key) => key[0] === key[0].toUpperCase() && key !== "default" && key !== "createLucideIcon" && key !== "icons" && typeof (LucideIcons as Record<string, unknown>)[key] === "object"
);

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Render icon preview
  const PreviewIcon = value
    ? (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[value]
    : null;

  // Filter icons based on search
  const filteredIcons = search.trim()
    ? ALL_ICON_NAMES.filter((name) => name.toLowerCase().includes(search.toLowerCase())).slice(0, 60)
    : POPULAR_ICONS;

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center gap-2">
        {/* Icon Preview */}
        <button
          type="button"
          onClick={() => { setOpen(!open); setSearch(""); }}
          className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-white hover:border-stone-400 transition-colors"
          title="Icon auswählen"
        >
          {PreviewIcon ? (
            <PreviewIcon size={18} className="text-stone-700" />
          ) : (
            <LucideIcons.HelpCircle size={18} className="text-stone-300" />
          )}
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={value}
          placeholder="Icon (z.B. Clock)"
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => { setOpen(true); setSearch(""); }}
          className="flex-1 rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full max-w-md rounded-xl border border-stone-200 bg-white shadow-lg">
          {/* Search */}
          <div className="border-b border-stone-100 p-2">
            <div className="flex items-center gap-2 rounded-lg bg-stone-50 px-3 py-1.5">
              <LucideIcons.Search size={14} className="text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Icon suchen..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-stone-400"
                autoFocus
              />
            </div>
          </div>

          {/* Category Label */}
          <div className="px-3 pt-2 pb-1">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
              {search.trim() ? `${filteredIcons.length} Ergebnisse` : "Beliebte Icons"}
            </span>
          </div>

          {/* Icon Grid */}
          <div className="max-h-52 overflow-y-auto p-2">
            <div className="grid grid-cols-6 gap-1">
              {filteredIcons.map((name) => {
                const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[name];
                if (!Icon) return null;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => { onChange(name); setOpen(false); }}
                    className={`flex flex-col items-center gap-0.5 rounded-lg p-2 text-center transition-colors hover:bg-stone-100 ${
                      value === name ? "bg-stone-100 ring-1 ring-stone-300" : ""
                    }`}
                    title={name}
                  >
                    <Icon size={18} className="text-stone-700" />
                    <span className="w-full truncate text-[9px] text-stone-400">{name}</span>
                  </button>
                );
              })}
            </div>
            {filteredIcons.length === 0 && (
              <p className="py-4 text-center text-xs text-stone-400">Kein Icon gefunden</p>
            )}
          </div>

          {/* Help Footer */}
          <div className="border-t border-stone-100 px-3 py-2">
            <p className="text-[11px] text-stone-400">
              Alle Icons von{" "}
              <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" className="text-stone-600 underline hover:text-stone-900">
                lucide.dev/icons
              </a>
              {" "}&mdash; Name kopieren und hier eintippen
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
