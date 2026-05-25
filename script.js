const nav=document.getElementById('mainNav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>40),{passive:true});
const btn=document.getElementById('hamburgerBtn'),menu=document.getElementById('mobileMenu');
btn.addEventListener('click',()=>{const o=menu.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
menu.querySelectorAll('a').forEach(l=>l.addEventListener('click',()=>{menu.classList.remove('open');btn.setAttribute('aria-expanded','false')}));
(function(){var ids=["hs0","hs1","hs2"],cur=0;setInterval(function(){document.getElementById(ids[cur]).style.opacity="0";cur=(cur+1)%ids.length;document.getElementById(ids[cur]).style.opacity="1";},5000);})();
var st=document.getElementById('scrollTop');
window.addEventListener('scroll',function(){st.style.display=window.scrollY>400?'flex':'none';},{passive:true});