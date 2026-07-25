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
  { id:'street-bag', category:'Accessoires', name:'Streetwear Rucksack', alt:'Streetwear-Rucksack von Bernd Wagner Designs', image:'../upload/streetwear/bags/StreetWear_Bag.png', status:'Auf Anfrage', isConcept:true, pendingUpload:true },
  { id:'street-shirt', category:'Oberteile', name:'Streetwear Hemd', alt:'Streetwear-Hemd von Bernd Wagner Designs', image:'../upload/streetwear/oberteile/StreetWear_Shirt.png', status:'Auf Anfrage', isConcept:true, pendingUpload:true },
  { id:'street-cap', category:'Accessoires', name:'Streetwear Cap', alt:'Streetwear-Cap von Bernd Wagner Designs', image:'../upload/streetwear/StreetWear_Cap.png', status:'Auf Anfrage', isConcept:true, pendingUpload:true }
];
