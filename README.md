# Bernd Wagner Designs

Statische, responsive Storefront-Landingpage in deutscher Sprache für exklusive Handtaschen- und Bespoke-Hosen-Anfragen. Kein Build-Schritt, keine externen Fonts, kein Tracking und kein Checkout.

## Lokale Vorschau

```bash
python3 -m http.server 4173
```

Danach `http://localhost:4173/` öffnen.

## Struktur

- `index.html` – Landingpage mit Hero, Kollektion, Bespoke, Ablauf, Atelier, FAQ und Anfrageformular
- `impressum.html` – Rechtstext-Template mit Platzhaltern
- `datenschutz.html` – Datenschutz-Template für die tatsächlich verwendeten Vorgänge
- `css/styles.css` – Designsystem, Responsive Layout, Fokus- und Reduced-Motion-Regeln
- `js/config.js` – zentrale Produkt-, Kontakt- und Formular-Konfiguration
- `js/app.js` – Navigation, Carousel, Filter, Formularadapter und E-Mail-Fallback
- `assets/` – Logos und ursprüngliche Designvisualisierungen
- `upload/handtaschen/` – vorhandene Handtaschen-PNGs, die direkt von der Website genutzt werden
- `upload/hosen/` – Upload-Verzeichnis für Hosen-PNGs

## Bilder austauschen

Die Galerie nutzt die tatsächlich vorhandenen PNG-Dateien aus `upload/handtaschen/` und `upload/hosen/`. Aktuell sind diese Motive konfiguriert:

- `upload/handtaschen/58134.png`
- `upload/handtaschen/58135.png`
- `upload/handtaschen/58136.png`

Weitere PNGs müssen mit ihrem exakten Dateinamen in `js/config.js` eingetragen werden. Ein Handtaschenmotiv wird außerdem direkt als Hero-Bild in `index.html` referenziert. Alle Motive werden auf der Website als „Designvisualisierung“ und „Auf Anfrage“ gekennzeichnet.

## Formular-Konfiguration vor Livegang

In `js/config.js` müssen diese Werte ersetzt beziehungsweise gesetzt werden:

- `siteUrl` / `{{SITE_URL}}`
- `contactEmail` / `{{EMAIL}}`
- `contactPhone` / `{{TELEFON}}`
- `legalName`, `address`
- `form.endpoint` – URL des Formular-Dienstes; leer bedeutet kein echter Versand
- `form.method`
- `form.recipient`
- `form.serviceName` / `{{FORMULAR_DIENST}}`
- `form.privacyNote`

Es dürfen keine API-Schlüssel oder Secrets im Frontend hinterlegt werden. Wenn kein Endpoint konfiguriert ist, zeigt die Seite keinen Scheinerfolg, sondern E-Mail-Fallback und Kopierfunktion.

## Rechtliche Platzhalter vor Veröffentlichung

Diese Werte müssen mit echten Unternehmensdaten ersetzt und juristisch geprüft werden:

`{{INHABER_NAME}}`, `{{UNTERNEHMENSFORM}}`, `{{STRASSE_HAUSNUMMER}}`, `{{PLZ_ORT}}`, `{{LAND}}`, `{{EMAIL}}`, `{{TELEFON}}`, `{{UMSATZSTEUER_ID}}`, `{{REGISTERANGABEN}}`, `{{VERANTWORTLICH_NACH_18_MSTV}}`, `{{DATENSCHUTZ_KONTAKT}}`, `{{HOSTING_ANBIETER}}`, `{{FORMULAR_DIENST}}`, `{{SITE_URL}}`.

Impressum und Datenschutzerklärung sind technische Vorlagen und müssen vor Livegang fachlich beziehungsweise juristisch geprüft werden.

## Deployment

Die Dateien können auf jedem statischen Hosting veröffentlicht werden. Für produktive SEO-Metadaten sollte `{{SITE_URL}}` in HTML und Konfiguration ersetzt werden. Optional können danach `robots.txt` und `sitemap.xml` mit der realen Ziel-URL ergänzt werden.
