(function(){
  try{history.scrollRestoration='manual'}catch(e){}
  function top(){if(!location.hash){window.scrollTo(0,0)}}
  top();setTimeout(top,0);setTimeout(top,120);
  window.addEventListener('pageshow',function(e){document.body.classList.remove('leaving');if(e.persisted)top()});

  var b=document.querySelector('.burger'),m=document.querySelector('.menu');
  if(b&&m){b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
    m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){m.classList.remove('open')})})}

  var h=document.querySelector('header.site');
  function sc(){if(h)h.classList.toggle('scrolled',window.scrollY>10)}
  window.addEventListener('scroll',sc,{passive:true});sc();

  var els=[].slice.call(document.querySelectorAll('.reveal'));
  els.forEach(function(e){
    var sibs=[].filter.call(e.parentNode.children,function(x){return x.classList.contains('reveal')});
    var i=sibs.indexOf(e);
    e.style.transitionDelay=(Math.min(i,5)*110)+'ms';
  });
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(e){io.observe(e)});
  }else{els.forEach(function(e){e.classList.add('in')})}

  document.addEventListener('click',function(ev){
    var a=ev.target.closest&&ev.target.closest('a[href]');
    if(!a||ev.defaultPrevented||ev.metaKey||ev.ctrlKey||ev.shiftKey||a.target==='_blank')return;
    var href=a.getAttribute('href');
    if(!href||/^(#|mailto:|tel:|https?:)/.test(href))return;
    if(!/\.html(#.*)?$/.test(href))return;
    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    ev.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(function(){location.href=href},320);
  });

  /* language switch (ar / en) */
  var D=document.documentElement,lb=document.querySelector('.lang-btn'),tt=document.querySelector('title');
  var ttAr=tt?tt.textContent:'',nodes=[].slice.call(document.querySelectorAll('[data-i18n]'));
  nodes.forEach(function(e){e.__ar=e.textContent});
  function setLang(l,save){
    D.lang=l;D.dir=l==='en'?'ltr':'rtl';
    nodes.forEach(function(e){var v=window.I18N&&window.I18N[e.getAttribute('data-i18n')];e.textContent=(l==='en'&&v!==undefined)?v:e.__ar});
    if(tt)tt.textContent=l==='en'?(D.getAttribute('data-title-en')||ttAr):ttAr;
    if(lb)lb.textContent=l==='en'?'العربية':'English';
    if(save){try{localStorage.setItem('lang',l)}catch(e){}}
  }
  var saved='ar';try{saved=localStorage.getItem('lang')||'ar'}catch(e){}
  function get(u){return fetch(u,{cache:'no-cache'}).then(function(r){return r.ok?r.json():null}).catch(function(){return null})}
  function apply(t,im){
    window.I18N=window.I18N||{};
    if(t&&t.texts){var m={};t.texts.forEach(function(x){m[x.id]=x;if(x.en!==undefined)window.I18N[x.id]=x.en});
      nodes.forEach(function(e){var x=m[e.getAttribute('data-i18n')];if(x&&x.ar!==undefined)e.__ar=x.ar})}
    if(im&&im.images){var p={};im.images.forEach(function(x){if(x.src)p[x.id]=x.src});
      [].forEach.call(document.querySelectorAll('img[data-img]'),function(i){var s=p[i.getAttribute('data-img')];if(s)i.setAttribute('src',s)})}
  }
  function go(){setLang(saved==='en'?'en':'ar',false);D.classList.remove('cms-wait')}
  if(window.fetch&&window.Promise){Promise.all([get('content/texts.json'),get('content/images.json')]).then(function(r){apply(r[0],r[1]);go()})}else go();
  if(lb)lb.addEventListener('click',function(){setLang(D.lang==='en'?'ar':'en',true)});

  var f=document.getElementById('waform');
  if(f){f.addEventListener('submit',function(ev){ev.preventDefault();
    var en=D.lang==='en';var t=(en?'Hello Ink Master,%0AName: ':'مرحباً Ink Master،%0Aالاسم: ')+encodeURIComponent(f.n.value)+(en?'%0ACompany: ':'%0Aالشركة: ')+encodeURIComponent(f.c.value||'-')+(en?'%0AInquiry about: ':'%0Aالاستفسار عن: ')+encodeURIComponent(f.t.value)+'%0A'+encodeURIComponent(f.m.value);
    window.open('https://wa.me/201022490599?text='+t,'_blank','noopener');
  })}

  /* email dropdown */
  (function(){
    var dd=document.getElementById('maildd');if(!dd)return;
    var btn=dd.querySelector('.mail-btn');
    function set(o){dd.classList.toggle('open',o);btn.setAttribute('aria-expanded',o)}
    btn.addEventListener('click',function(e){e.stopPropagation();set(!dd.classList.contains('open'))});
    document.addEventListener('click',function(e){if(!dd.contains(e.target))set(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){set(false);btn.focus()}});
    dd.querySelectorAll('.mail-menu a').forEach(function(a){a.addEventListener('click',function(){setTimeout(function(){set(false)},150)})});
  })();
})();
