# Upload-Bilder

Die Website nutzt die vorhandenen Handtaschen-PNGs und erwartet die Hosen-PNGs unter diesen vorkonfigurierten Pfaden:

- `handtaschen/58134.png`
- `handtaschen/58135.png`
- `handtaschen/58136.png`
- `hosen/58131.png`
- `hosen/58132.png`
- `hosen/58133.png`

Die drei Hosenbilder werden separat und manuell hinzugefügt. Neue PNGs werden nicht automatisch eingebunden: Ihre exakten relativen Pfade müssen in `js/config.js` ergänzt werden; bei einem neuen Hero-Motiv ist zusätzlich `index.html` anzupassen.
