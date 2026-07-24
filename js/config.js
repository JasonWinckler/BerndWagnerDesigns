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
  { id:'bag-01', category:'Handtasche', name:'Atelierlinien No. 01', image:'upload/handtaschen/handtasche-01.svg', alt:'Designvisualisierung einer exklusiven Handtasche mit ruhigen Atelierlinien.', status:'Auf Anfrage', isConcept:true },
  { id:'bag-02', category:'Handtasche', name:'Pinselbogen No. 02', image:'upload/handtaschen/handtasche-02.svg', alt:'Designvisualisierung einer exklusiven Handtasche mit bogenförmigem Print.', status:'Auf Anfrage', isConcept:true },
  { id:'bag-03', category:'Handtasche', name:'Kontur No. 03', image:'upload/handtaschen/handtasche-03.svg', alt:'Designvisualisierung einer exklusiven Handtasche mit kontrastreicher Kontur.', status:'Auf Anfrage', isConcept:true },
  { id:'trouser-01', category:'Bespoke-Hose', name:'Atelierlinien No. 04', image:'upload/hosen/hose-01.svg', alt:'Designvisualisierung einer Bespoke-Hose mit reduzierten Atelierlinien.', status:'Auf Anfrage', isConcept:true },
  { id:'trouser-02', category:'Bespoke-Hose', name:'Pinselzug No. 05', image:'upload/hosen/hose-02.svg', alt:'Designvisualisierung einer Bespoke-Hose mit expressivem Pinselzug.', status:'Auf Anfrage', isConcept:true },
  { id:'trouser-03', category:'Bespoke-Hose', name:'Topografie No. 06', image:'upload/hosen/hose-03.svg', alt:'Designvisualisierung einer Bespoke-Hose mit topografischem Linienbild.', status:'Auf Anfrage', isConcept:true }
];
