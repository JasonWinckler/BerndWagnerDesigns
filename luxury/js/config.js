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
  { id:'bag-01', category:'Handtaschen', name:'Bordeaux Kontur No. 01', image:'../upload/luxury/handtaschen/58134.png', alt:'Bordeauxrote Handtasche mit geometrischen Konturlinien und kurzem Henkel.', status:'Auf Anfrage', isConcept:true },
  { id:'bag-02', category:'Handtaschen', name:'Pinselbogen No. 02', image:'../upload/luxury/handtaschen/58135.png', alt:'Cremefarbene Schultertasche mit schwarzen und braunen Pinselbögen.', status:'Auf Anfrage', isConcept:true },
  { id:'bag-03', category:'Handtaschen', name:'Schwarze Linien No. 03', image:'../upload/luxury/handtaschen/58136.png', alt:'Schwarze Handtasche mit hellen grafischen Ziernähten und zwei Henkeln.', status:'Auf Anfrage', isConcept:true },
  { id:'trouser-01', category:'Hosen', name:'Bordeaux Topografie No. 04', image:'../upload/luxury/hosen/58131.png', alt:'Bordeauxrote Hose mit weitem Bein, feinen Konturlinien und kupferfarbenem Einsatz.', status:'Auf Anfrage', isConcept:true, pendingUpload:true },
  { id:'trouser-02', category:'Hosen', name:'Pinselbogen No. 05', image:'../upload/luxury/hosen/58132.png', alt:'Cremefarbene Bundfaltenhose mit großem schwarzen und kupferfarbenen Pinselbogen.', status:'Auf Anfrage', isConcept:true, pendingUpload:true },
  { id:'trouser-03', category:'Hosen', name:'Schwarze Kontur No. 06', image:'../upload/luxury/hosen/58133.png', alt:'Schwarze Hose mit weitem Bein und grafischen hellen sowie kupferfarbenen Ziernähten.', status:'Auf Anfrage', isConcept:true, pendingUpload:true }
];
