# Landing Page Templates

Modulares Next.js Landing-Page-Template-System für den deutschen Markt.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Fonts**: Outfit (Headings) + Work Sans (Body) via `next/font/google`
- **Animations**: Framer Motion
- **Icons**: Lucide React (als String-Name im Content, gerendert via `IconRenderer`)
- **Phone Input**: `react-phone-number-input` mit `isValidPhoneNumber`
- **Sprache**: Deutsch

## Architektur

```
content/leadsgenerierung.ts → Alle Texte (Single Source of Truth)
config/theme.ts          → Farb-Tokens (Primary, Accent, etc.)
config/site.ts           → Firmen-Metadaten (Name, Telefon, Adresse)
types/content.ts         → TypeScript-Interfaces für alle Sections
components/sections/     → Section-Komponenten (Hero, Problem, Solution, Benefits, Testimonials, FAQ, CTA, Contact)
components/ui/           → Wiederverwendbare UI (Badge, AnimatedSection, IconRenderer)
lib/otp.ts               → HMAC-SHA256 OTP-Generierung & Verifizierung
```

## Design System

- **Primary**: `#F97316` (Safety Orange)
- **Dark Sections**: `stone-900` (Benefits, CTA)
- **Palette**: Warme Stone-Töne (nicht kaltes Slate)
- **Sections folgen AIDA**: Attention → Interest → Desire → Action

## Content ändern

Neuen Kunden/Branche anlegen = neue Datei in `content/` (z.B. `content/steuerberater.ts`) die `LandingPageContent` exportiert. Theme-Farben in `config/theme.ts` anpassen.

## Verifizierung (nur Email)

- Stateless Hash-basiert (kein DB nötig)
- API: `POST /api/verify-email`
- Send: `{ email }` → Response: `{ hash }`
- Verify: `{ email, otp, hash, action: "verify" }` → Response: `{ verified }`
- OTP-Expiry: 10 Minuten
- Env-Vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `OTP_SECRET`
- Phone-Validierung nur client-seitig via `react-phone-number-input` (kein SMS/Twilio)

## Befehle

```bash
npm run dev      # Entwicklungsserver
npm run build    # Production Build
npx tsc --noEmit # Type-Check
```
