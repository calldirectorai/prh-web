/* PRH form guard: spam layers shared by the Intake and Contact forms.
   - human gate: a real (trusted) tap/click/key on the page, and at least 4 s between it and submit
   - automation guard: navigator.webdriver blocks sending (visitor is shown the phone number)
   - honeypot: hidden "website" field; if filled, pretend success and send nothing
   - link block: no URLs in typed fields
   - length limits on every typed field */
(function(){
  var firstHuman = 0;
  function mark(e){ if(e.isTrusted && !firstHuman){ firstHuman = Date.now(); } }
  ['pointerdown','touchstart','keydown'].forEach(function(t){ document.addEventListener(t, mark, {capture:true, passive:true}); });

  var LINK = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|ru|xyz|info|biz|io|co|top|site|online)\b)/i;

  function addHoneypot(root){
    if(root.querySelector('.prh-hp')) return;
    var w = document.createElement('div');
    w.className = 'prh-hp';
    w.setAttribute('aria-hidden','true');
    w.style.cssText = 'position:absolute!important;left:-9999px!important;top:auto;width:1px;height:1px;overflow:hidden';
    w.innerHTML = '<label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label>';
    root.appendChild(w);
  }

  window.PRHGuard = {
    init: function(root, limits){
      addHoneypot(root);
      Object.keys(limits || {}).forEach(function(id){
        var el = document.getElementById(id); if(el) el.maxLength = limits[id];
      });
    },
    /* returns 'ok' | 'bot' (silently drop) | 'webdriver' | 'link' | 'slow-down' */
    check: function(root, textIds){
      if(navigator.webdriver) return 'webdriver';
      var hp = root.querySelector('.prh-hp input');
      if(hp && hp.value) return 'bot';
      if(!firstHuman) return 'bot';
      if(Date.now() - firstHuman < 4000) return 'slow-down';
      for(var i=0;i<textIds.length;i++){
        var el = document.getElementById(textIds[i]);
        if(el && LINK.test(el.value)) { return 'link:' + textIds[i]; }
      }
      return 'ok';
    },
    clear: function(root){
      root.querySelectorAll('input,textarea,select').forEach(function(el){
        if(el.type === 'checkbox' || el.type === 'radio') el.checked = el.defaultChecked;
        else if(el.tagName === 'SELECT') el.selectedIndex = 0;
        else el.value = '';
        el.classList.remove('error');
      });
      root.querySelectorAll('.error-msg.show').forEach(function(e){ e.classList.remove('show'); });
    },
    say: function(anchor, text){
      var m = anchor.parentNode.querySelector('.prh-form-msg');
      if(!m){
        m = document.createElement('p');
        m.className = 'prh-form-msg';
        m.setAttribute('role','alert');
        m.style.cssText = 'margin:12px 0 0;font-size:.9rem;color:#b03a2e;width:100%';
        anchor.parentNode.appendChild(m);
      }
      m.innerHTML = text || '';
      m.style.display = text ? 'block' : 'none';
    }
  };
})();
