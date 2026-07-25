export const siteConfig = {
  brandName: 'Bernd Wagner Designs',
  siteUrl: '{{SITE_URL}}',
  contactEmail: '{{EMAIL}}',
  contactPhone: '{{TELEFON}}',
  legalName: '{{INHABER_NAME}} {{UNTERNEHMENSFORM}}',
  address: '{{STRASSE_HAUSNUMMER}}, {{PLZ_ORT}}, {{LAND}}',
  form: { endpoint: '', method: 'POST', recipient: '{{EMAIL}}', serviceName: '{{FORMULAR_DIENST}}', privacyNote: 'Die Angaben werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.' }
};
export const products = [
  { id:'street-01', category:'Hosen', name:'Streetwear Entwurf No. 01', alt:'Bild folgt.', status:'Auf Anfrage', isConcept:true, pendingUpload:true },
  { id:'street-02', category:'Hosen', name:'Streetwear Entwurf No. 02', alt:'Bild folgt.', status:'Auf Anfrage', isConcept:true, pendingUpload:true },
  { id:'street-03', category:'Hosen', name:'Streetwear Entwurf No. 03', alt:'Bild folgt.', status:'Auf Anfrage', isConcept:true, pendingUpload:true }
];
