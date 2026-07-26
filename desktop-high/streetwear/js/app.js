import { initLanguage } from './i18n.js';
import { siteConfig, products } from './config.js';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)], reduced=matchMedia('(prefers-reduced-motion: reduce)');
$('[data-year]').textContent=new Date().getFullYear(); $('[data-contact]').textContent=`Kontakt: ${siteConfig.contactEmail} · ${siteConfig.contactPhone}`;
$$('.reveal').forEach(el=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12}).observe(el));

const processSteps=$$('.process li');
if(processSteps.length){
 const processObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  processSteps.forEach(step=>step.classList.remove('active'));
  entry.target.classList.add('seen','active');
 }),{rootMargin:'-38% 0px -38% 0px',threshold:.05});
 processSteps.forEach(step=>processObserver.observe(step));
}

const design=$('[name=design]');
products.forEach(p=>design.add(new Option(`${p.name} · ${p.category}`,p.id)));
const isStreetwear=products.some(p=>p.id.startsWith('street-'));
const sets=isStreetwear ? [{id:'streetwear-set',items:products}] : [
 {id:'bordeaux-set',items:[products[0],products[3]]},
 {id:'brush-set',items:[products[1],products[4]]},
 {id:'black-set',items:[products[2],products[5]]}
];
let index=0,timer,interacting=false;
const slides=$('[data-slides]'),dots=$('[data-dots]'),count=$('[data-count]'),live=$('[data-live]');
function itemMarkup(p,itemIndex){return `<article class="set-item"><figure><img src="${p.image}" alt="${p.alt}" width="1200" height="1500" ${(index||itemIndex)?'loading="lazy"':'fetchpriority="high"'}></figure><div class="set-item-info"><span class="badge">${p.isConcept?'Designvisualisierung':'Entwurf'}</span><p class="eyebrow">${p.category}</p><h3>${p.name}</h3><p>${p.status}. Fertigung, Preis und Details werden persönlich abgestimmt.</p><button class="btn" data-product="${p.id}">Dieses Design anfragen</button></div></article>`}
function render(){slides.innerHTML=sets.map((set,i)=>`<div class="slide ${i===index?'active':''}" aria-hidden="${i!==index}"><div class="set-grid">${set.items.map(itemMarkup).join('')}</div></div>`).join('');dots.innerHTML=sets.length>1?sets.map((_,i)=>`<button class="${i===index?'active':''}" aria-label="Set ${i+1} anzeigen" data-dot="${i}"></button>`).join(''):'';count.textContent=`${index+1} / ${sets.length}`}
function go(n,manual=false){index=(n+sets.length)%sets.length;render();if(manual){live.textContent=`Set ${index+1} von ${sets.length}`;restart()}}
function restart(){clearInterval(timer);if(sets.length>1&&!reduced.matches&&!interacting&&!document.hidden)timer=setInterval(()=>go(index+1),7000)}
render();restart();
$('[data-next]').onclick=()=>go(index+1,true);$('[data-prev]').onclick=()=>go(index-1,true);dots.onclick=e=>{if(e.target.dataset.dot!==undefined)go(+e.target.dataset.dot,true)};$('[data-carousel]').addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(index+1,true)}if(e.key==='ArrowLeft'){e.preventDefault();go(index-1,true)}});['mouseenter','focusin','pointerdown'].forEach(ev=>$('[data-carousel]').addEventListener(ev,()=>{interacting=true;clearInterval(timer)}));['mouseleave','focusout','pointerup'].forEach(ev=>$('[data-carousel]').addEventListener(ev,()=>{interacting=false;restart()}));document.addEventListener('visibilitychange',restart);reduced.addEventListener('change',restart);let sx=0;$('[data-carousel]').addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});$('[data-carousel]').addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)go(index+(dx<0?1:-1),true)});
function focusForm(){location.hash='anfrage'; setTimeout(()=>$('[data-form] [name=name]').focus(),250)} document.addEventListener('click',e=>{const btn=e.target.closest('[data-product]'); if(btn){const p=products.find(x=>x.id===btn.dataset.product); $('[name=type]').value='Bestehendes Design'; $('[name=category]').value=p.category; design.value=p.id; updateSummary(); focusForm()} if(e.target.closest('[data-open-custom]')){$('[name=type]').value='Individuelles Design'; design.value=''; updateSummary(); focusForm()} if(e.target.closest('[data-open-inquiry]'))focusForm()});
const form=$('[data-form]'), status=$('[data-status]'), summary=$('[data-summary]'), mail=$('[data-mail]'); const fieldMessages={name:'Bitte geben Sie Ihren Namen ein.',email:'Bitte geben Sie eine gültige E-Mail-Adresse ein.',message:'Bitte beschreiben Sie Ihre Anfrage.',privacy:'Bitte bestätigen Sie die Datenschutzerklärung.'}; function updateErrors(){let ok=true; Object.keys(fieldMessages).forEach(name=>{const field=form.elements[name], err=$(`#error-${name}`); if(!field||!err)return; const invalid=!field.validity.valid; field.setAttribute('aria-invalid', invalid ? 'true' : 'false'); err.textContent=invalid ? fieldMessages[name] : ''; if(invalid)ok=false}); return ok} function data(){return Object.fromEntries(new FormData(form).entries())} function summaryText(){const d=data(); return `Anfrage an Bernd Wagner Designs\nName: ${d.name||'-'}\nE-Mail: ${d.email||'-'}\nTelefon: ${d.phone||'-'}\nTyp: ${d.type}\nKategorie: ${d.category}\nDesign-ID: ${d.design||'-'}\nWünsche: ${d.wishes||'-'}\nAnlass/Zeitrahmen: ${d.timeline||'-'}\nBudget: ${d.budget||'-'}\nNachricht: ${d.message||'-'}`} function updateSummary(){const s=summaryText(); summary.textContent=s; mail.href=`mailto:${siteConfig.form.recipient}?subject=${encodeURIComponent('Designanfrage Bernd Wagner Designs')}&body=${encodeURIComponent(s)}`} form.addEventListener('input',()=>{updateSummary(); updateErrors()}); form.addEventListener('change',updateErrors); updateSummary(); form.addEventListener('submit',async e=>{e.preventDefault(); const valid=updateErrors(); if(!valid||!form.checkValidity()){form.reportValidity(); status.textContent='Bitte prüfen Sie die markierten Pflichtfelder.'; return} if(data().website)return; updateSummary(); if(!siteConfig.form.endpoint){status.textContent='Kein Formular-Endpunkt konfiguriert. Bitte nutzen Sie den E-Mail-Fallback oder kopieren Sie die Zusammenfassung.'; return} const submit=$('[data-submit]'); submit.disabled=true; status.textContent='Sendet …'; try{const res=await fetch(siteConfig.form.endpoint,{method:siteConfig.form.method,body:new FormData(form)}); if(!res.ok)throw new Error(); status.textContent='Vielen Dank. Ihre Anfrage wurde übermittelt.'; form.reset(); updateSummary()}catch{status.textContent='Die Übermittlung ist fehlgeschlagen. Bitte nutzen Sie den E-Mail-Fallback.'}finally{submit.disabled=false}}); $('[data-copy]').onclick=async()=>{updateSummary(); await navigator.clipboard.writeText(summary.textContent); status.textContent='Zusammenfassung kopiert.'};

initLanguage();
