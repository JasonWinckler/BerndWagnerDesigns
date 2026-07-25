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
  { id:'bag-01', category:'Handtaschen', name:'Bordeaux Kontur No. 01', image:'upload/handtaschen/58134.png', alt:'Bordeauxrote Handtasche mit geometrischen Konturlinien und kurzem Henkel.', status:'Auf Anfrage', isConcept:true },
  { id:'bag-02', category:'Handtaschen', name:'Pinselbogen No. 02', image:'upload/handtaschen/58135.png', alt:'Cremefarbene Schultertasche mit schwarzen und braunen Pinselbögen.', status:'Auf Anfrage', isConcept:true },
  { id:'bag-03', category:'Handtaschen', name:'Schwarze Linien No. 03', image:'upload/handtaschen/58136.png', alt:'Schwarze Handtasche mit hellen grafischen Ziernähten und zwei Henkeln.', status:'Auf Anfrage', isConcept:true }
];
