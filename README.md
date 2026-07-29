# Bernd Wagner Designs

Statische, responsive Storefront-Landingpage in deutscher Sprache für exklusive Handtaschen-, Bespoke-Hosen- und persönliche Atelier-Anfragen. Kein Build-Schritt, keine externen Fonts, kein Tracking und kein Checkout.

## Lokale Vorschau

```bash
python3 -m http.server 4173
```

Danach `http://localhost:4173/` öffnen.

## Struktur

- `index.html` – Landingpage mit Hero, Kollektion, Bespoke, Ablauf, Atelier, FAQ und Anfrageformular
- `kurse/` – responsive Seite für Private Atelier Sessions mit Kalender, Wunschuhrzeit und Terminanfrage
- `impressum.html` – Rechtstext-Template mit Platzhaltern
- `datenschutz.html` – Datenschutz-Template für die tatsächlich verwendeten Vorgänge
- `css/styles.css` – Designsystem, Responsive Layout, Fokus- und Reduced-Motion-Regeln
- `js/config.js` – zentrale Produkt-, Kontakt- und Formular-Konfiguration
- `js/app.js` – Navigation, Carousel, Filter, Formularadapter und E-Mail-Fallback
- `assets/` – Logos und ursprüngliche Designvisualisierungen
- `upload/luxury/` – gemeinsamer Upload-Ordner aller Geräteversionen der Luxury-Kollektion
- `upload/streetwear/` – gemeinsamer Upload-Ordner aller Geräteversionen der Streetwear-Kollektion

## Bilder austauschen

Die Galerie nutzt die vorhandenen Handtaschen-PNGs. Die drei Hosen-Pfade sind bereits für die spätere manuelle Ablage vorkonfiguriert:

- `upload/luxury/handtaschen/58134.png`
- `upload/luxury/handtaschen/58135.png`
- `upload/luxury/handtaschen/58136.png`
- `upload/luxury/hosen/58131.png`
- `upload/luxury/hosen/58132.png`
- `upload/luxury/hosen/58133.png`

Alle Geräteversionen greifen auf diese Ordner im Hauptverzeichnis zu. Bilder müssen daher nur einmal unter `upload/luxury/` beziehungsweise `upload/streetwear/` abgelegt werden. Weitere PNGs müssen mit ihrem exakten Dateinamen in den jeweiligen `js/config.js`-Dateien eingetragen werden. Ein Handtaschenmotiv wird außerdem direkt als Hero-Bild in den Luxury-`index.html`-Dateien referenziert. Alle Motive werden auf der Website als „Designvisualisierung“ und „Auf Anfrage“ gekennzeichnet.

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

Für die Atelier-Terminseite werden Empfänger und optionaler Formular-Endpunkt zentral in `kurse/js/config.js` gepflegt:

- `recipientEmail` – Zieladresse für den vorbereiteten E-Mail-Versand
- `form.endpoint` – optionaler Formular-Endpunkt für direkten Versand
- `form.method`
- `minimumLeadDays`, `maximumMonthsAhead` und `timeSlots` – Kalender- und Uhrzeitvorgaben

Ohne Endpunkt öffnet die Seite nach gültiger Eingabe das lokale E-Mail-Programm mit einer vollständig vorbereiteten Anfrage. Solange auch `recipientEmail` noch den Platzhalter enthält, steht die Kopierfunktion bereit und die Seite meldet transparent, dass noch keine Empfängeradresse konfiguriert wurde.

## Rechtliche Platzhalter vor Veröffentlichung

Diese Werte müssen mit echten Unternehmensdaten ersetzt und juristisch geprüft werden:

`{{INHABER_NAME}}`, `{{UNTERNEHMENSFORM}}`, `{{STRASSE_HAUSNUMMER}}`, `{{PLZ_ORT}}`, `{{LAND}}`, `{{EMAIL}}`, `{{TELEFON}}`, `{{UMSATZSTEUER_ID}}`, `{{REGISTERANGABEN}}`, `{{VERANTWORTLICH_NACH_18_MSTV}}`, `{{DATENSCHUTZ_KONTAKT}}`, `{{HOSTING_ANBIETER}}`, `{{FORMULAR_DIENST}}`, `{{SITE_URL}}`.

Impressum und Datenschutzerklärung sind technische Vorlagen und müssen vor Livegang fachlich beziehungsweise juristisch geprüft werden.

## Deployment

Die Dateien können auf jedem statischen Hosting veröffentlicht werden. Für produktive SEO-Metadaten sollte `{{SITE_URL}}` in HTML und Konfiguration ersetzt werden. Optional können danach `robots.txt` und `sitemap.xml` mit der realen Ziel-URL ergänzt werden.

## Auflösungsvarianten der Landingpage

Die Startseite erkennt das Viewport-Format automatisch und kennzeichnet es als `desktop-low` (ab 1600 × 900), `desktop-high` (ab 2400 × 1300), `mobile` (Hochformat) oder `other-device`, ohne dabei die aufgerufene URL zu verändern. Alle Varianten verwenden dieselben Inhalte und responsiven Styles. Sie sind zusätzlich direkt unter `/desktop-low/`, `/desktop-high/`, `/mobile/` und `/other-device/` aufrufbar, um sie unabhängig von der Monitorgröße zu prüfen.

Das Logo des kurz eingeblendeten Willkommen-Popups kann in `upload/logo/` ausgetauscht werden; Hinweise zu Format und Dateiname stehen in der dortigen README.
