# Admin Dashboard - landing-page-templates

## Schnellstart

1. Passwort setzen in `.env`:
   ```
   ADMIN_PASSWORD=dein-passwort
   ```
2. `npm run dev` starten
3. `http://localhost:3000/admin` öffnen

## Dashboard-Bereiche

| Tab | Was kann man ändern |
|-----|-------------------|
| **Firmendaten** | Name, Logo, Adresse, Telefon, E-Mail, Impressum-Daten |
| **Farben** | Primärfarbe, Hover-Farbe, helle Variante, Akzent + Live-Vorschau |
| **Tracking** | Meta Pixel, GA4, GTM, PostHog, Matomo (alle DSGVO-konform) |
| **Landing Page** | Alle Texte, Bilder, Testimonials, FAQ, CTA |

## Tracking (DSGVO-konform)

Alle Tools werden erst nach Cookie-Consent geladen:
- **Meta Pixel** → Marketing-Consent
- **Google Analytics 4** → Analyse-Consent
- **Google Tag Manager** → Marketing-Consent
- **PostHog** → Analyse-Consent
- **Matomo** → Analyse-Consent

Cookie-Banner und Datenschutzseite passen sich automatisch an.

## Datenspeicherung

```
data/
├── site.json         → Firmendaten
├── theme.json        → Farbschema
├── tracking.json     → Tracking-Konfiguration
└── *.json            → Seiten-Content
```

## Hinweise

- Dashboard funktioniert nur lokal (`npm run dev`)
- Auf Production: Nur-Lese-Modus mit Warnbanner
- Bilder werden nach `/public/uploads/` gespeichert
- Nach Änderungen: committen & deployen
