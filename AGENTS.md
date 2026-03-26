# Landing Page Templates

Modulares Next.js Landing-Page-Template-System für den deutschen Markt. Admin-Dashboard verwaltet Inhalte als JSON in `data/`. Zwei Seiten: Verkauf und Akquise.

## Tech Stack

- Next.js 15+ (App Router), Tailwind CSS v3 (mit `tailwind.config.ts`), Framer Motion, Lucide React, Nodemailer, crypto-js
- Sprache: Deutsch (UI), Englisch (Code)

## Architektur

```
data/verkauf.json        → Inhalte Verkaufs-Landing-Page
data/akquise.json        → Inhalte Akquise-Landing-Page
data/site.json           → Firmen-Metadaten
data/theme.json          → Farb-Tokens
config/site.ts           → Re-Export aus data/site.json
config/theme.ts          → Re-Export aus data/theme.json (relativer Import wegen jiti!)
types/content.ts         → TypeScript-Interfaces
components/sections/     → Section-Komponenten
components/ui/           → UI-Komponenten (IconRenderer, Badge, etc.)
components/admin/        → Admin-Dashboard
lib/otp.ts               → HMAC-SHA256 OTP (stateless, kein DB)
app/api/verify-email/    → E-Mail-Verifizierung
app/api/admin/           → Admin-APIs
app/api/contact/         → Kontaktformular-API
```

## Regeln

- Keine neuen Abhängigkeiten ohne Absprache.
- Keine Datenbank. Alles dateibasiert (JSON in `data/`).
- `data/` Dateien nicht manuell editieren — Admin-Dashboard verwaltet sie.
- Icons nur via `IconRenderer` — nie direkt in Section-Komponenten importieren.
- Keine Breaking Changes an der JSON-Struktur. Bestehende Felder nicht umbenennen/entfernen, nur neue optional hinzufügen.
- Keine Environment-Variablen im Client-Code außer `NEXT_PUBLIC_*`.
- TypeScript strict — kein `any` außer wo explizit markiert.
- Tailwind v3 — Theme-Farben kommen aus `config/theme.ts`.
- `config/theme.ts` nutzt relativen Import (`../data/theme.json`) wegen jiti. Nicht auf `@/data/` umstellen.
- Alle Sections müssen immer vorhanden bleiben.
- Mobile-first Layouts.
- Keine externen API-Calls außer SMTP.
- OTP-Logik in `lib/otp.ts` nicht ändern. Kein Twilio/SMS.

## Befehle

```bash
npm run dev      # Entwicklungsserver
npm run build    # Production Build
npm run lint     # ESLint
npx tsc --noEmit # Type-Check
```
