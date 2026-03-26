# Landing Page Templates

Modulares Next.js Landing-Page-Template-System für den deutschen Markt. Inhalte werden über ein Admin-Dashboard verwaltet und als JSON in `data/` gespeichert. Zwei Seiten: Verkauf und Akquise.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v3 (mit `tailwind.config.ts` + Autoprefixer)
- **Fonts**: Outfit (Headings) + Work Sans (Body) via `next/font/google`
- **Animations**: Framer Motion
- **Icons**: Lucide React (als String-Name in JSON, gerendert via `IconRenderer`)
- **Phone Input**: `react-phone-number-input` mit `isValidPhoneNumber`
- **E-Mail**: Nodemailer
- **OTP**: crypto-js (HMAC-SHA256, stateless)
- **Sprache**: Deutsch

## Architektur

```
data/verkauf.json        → Inhalte Verkaufs-Landing-Page
data/akquise.json        → Inhalte Akquise-Landing-Page
data/site.json           → Firmen-Metadaten (Name, Telefon, Adresse)
data/theme.json          → Farb-Tokens (Primary, Accent)
config/site.ts           → Re-Export aus data/site.json
config/theme.ts          → Re-Export aus data/theme.json (relativer Import für tailwind.config.ts/jiti)
types/content.ts         → TypeScript-Interfaces für alle Sections
components/sections/     → Section-Komponenten (Hero, Problem, Solution, Benefits, Testimonials, FAQ, CTA, Contact)
components/ui/           → Wiederverwendbare UI (Badge, AnimatedSection, IconRenderer)
components/admin/        → Admin-Dashboard (ContentEditor, IconPicker, ImageUpload, etc.)
lib/otp.ts               → HMAC-SHA256 OTP-Generierung & Verifizierung
app/admin/               → Admin-Login & Dashboard
app/verkauf/             → Verkaufs-Landing-Page
app/akquise/             → Akquise-Landing-Page
app/api/admin/           → Admin-APIs (content, site, theme, email, auth, upload)
app/api/contact/         → Kontaktformular-API
app/api/verify-email/    → E-Mail-Verifizierung (OTP)
```

## Design System

- **Primary**: `#F97316` (Safety Orange), konfigurierbar via Dashboard
- **Dark Sections**: `stone-900` (Benefits, CTA)
- **Palette**: Warme Stone-Töne (nicht kaltes Slate)
- **Sections folgen AIDA**: Attention → Interest → Desire → Action

## Content ändern

Inhalte werden ausschließlich über das Admin-Dashboard unter `/admin` geändert. Das Dashboard schreibt JSON-Dateien in `data/`. Kein manuelles Editieren der JSON-Dateien nötig.

## Verifizierung (nur Email)

- Stateless Hash-basiert (kein DB nötig)
- API: `POST /api/verify-email`
- Send: `{ email }` → Response: `{ hash }`
- Verify: `{ email, otp, hash, action: "verify" }` → Response: `{ verified }`
- OTP-Expiry: 10 Minuten

## Env-Vars

- `ADMIN_PASSWORD` — Pflicht. Dashboard-Login.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` — Für E-Mail-Verifizierung & Kontaktformular.
- `OTP_SECRET` — Pflicht. Geheimer Schlüssel für OTP-Hash.
- `NEXT_PUBLIC_META_PIXEL_ID`, `META_CONVERSIONS_API_TOKEN`, `META_PIXEL_ID` — Optional, Meta/Facebook Tracking.

## Befehle

```bash
npm run dev      # Entwicklungsserver
npm run build    # Production Build
npm run lint     # ESLint
npx tsc --noEmit # Type-Check
```

## Guardrails

- **Sprache**: Alle UI-Texte, Kommentare und Commit-Messages auf Deutsch, Code auf Englisch.
- **Keine neuen Abhängigkeiten** ohne Absprache. Das Template muss schlank bleiben.
- **Keine Datenbank**. Alles ist dateibasiert (JSON in `data/`). Das ist Absicht.
- **`data/` Dateien nicht manuell editieren** — sie werden vom Admin-Dashboard verwaltet.
- **Icons nur via `IconRenderer`** — niemals Lucide-Icons direkt in Section-Komponenten importieren (außer in Admin-Komponenten).
- **Keine Breaking Changes an der JSON-Struktur** in `data/`. Bestehende Felder nicht umbenennen oder entfernen, nur neue optional hinzufügen.
- **Keine Environment-Variablen im Client-Code** außer `NEXT_PUBLIC_*`.
- **TypeScript strict** — keine `any` außer wo explizit per eslint-disable markiert.
- **Tailwind v3** — Konfiguration in `tailwind.config.ts`. Theme-Farben kommen aus `config/theme.ts`.
- **config/theme.ts nutzt relativen Import** (`../data/theme.json`) wegen jiti/tailwind.config.ts Kompatibilität. Nicht auf `@/data/` umstellen.
- **Kein Entfernen von Sections** — alle Sections (Hero, Problem, Solution, Benefits, Testimonials, FAQ, CTA, Contact) müssen immer vorhanden bleiben.
- **Mobile-first** — alle Layouts müssen mobil funktionieren.
- **Keine externen API-Calls** außer SMTP. Das Template muss offline-fähig bleiben (bis auf E-Mail).
- **OTP-Logik nicht ändern** — die stateless Hash-Verifizierung in `lib/otp.ts` ist bewusst ohne DB. Kein Twilio/SMS.
