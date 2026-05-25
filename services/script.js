const nav=document.getElementById('mainNav');window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>40),{passive:true});
const btn=document.getElementById('hamburgerBtn'),menu=document.getElementById('mobileMenu');
btn.addEventListener('click',()=>{const o=menu.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
menu.querySelectorAll('a').forEach(l=>l.addEventListener('click',()=>{menu.classList.remove('open');btn.setAttribute('aria-expanded','false')}));
const sections=document.querySelectorAll('.service-section[id]'),navLinks=document.querySelectorAll('.services-nav-inner a');
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(l=>l.classList.remove('active'));const link=document.querySelector('.services-nav-inner a[href*="#'+e.target.id+'"]');if(link)link.classList.add('active');}});},{threshold:0.4});
sections.forEach(s=>obs.observe(s));
var st=document.getElementById('scrollTop');window.addEventListener('scroll',function(){st.style.display=window.scrollY>400?'flex':'none';},{passive:true});