(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={};(function e(t,n,r,i){var a=!!(t.Worker&&t.Blob&&t.Promise&&t.OffscreenCanvas&&t.OffscreenCanvasRenderingContext2D&&t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype.transferControlToOffscreen&&t.URL&&t.URL.createObjectURL),o=typeof Path2D==`function`&&typeof DOMMatrix==`function`,s=(function(){if(!t.OffscreenCanvas)return!1;try{var e=new OffscreenCanvas(1,1),n=e.getContext(`2d`);n.fillRect(0,0,1,1);var r=e.transferToImageBitmap();n.createPattern(r,`no-repeat`)}catch{return!1}return!0})();function c(){}function l(e){var r=n.exports.Promise,i=r===void 0?t.Promise:r;return typeof i==`function`?new i(e):(e(c,c),null)}var u=(function(e,t){return{transform:function(n){if(e)return n;if(t.has(n))return t.get(n);var r=new OffscreenCanvas(n.width,n.height);return r.getContext(`2d`).drawImage(n,0,0),t.set(n,r),r},clear:function(){t.clear()}}})(s,new Map),d=function(){var e,t,n={},r=0;return typeof requestAnimationFrame==`function`&&typeof cancelAnimationFrame==`function`?(e=function(e){var t=Math.random();return n[t]=requestAnimationFrame(function i(a){r===a||r+16-1<a?(r=a,delete n[t],e()):n[t]=requestAnimationFrame(i)}),t},t=function(e){n[e]&&cancelAnimationFrame(n[e])}):(e=function(e){return setTimeout(e,16)},t=function(e){return clearTimeout(e)}),{frame:e,cancel:t}}(),f=(function(){var t,n,i={};function o(e){function t(t,n){e.postMessage({options:t||{},callback:n})}e.init=function(t){var n=t.transferControlToOffscreen();e.postMessage({canvas:n},[n])},e.fire=function(r,a,o){if(n)return t(r,null),n;var s=Math.random().toString(36).slice(2);return n=l(function(a){function c(t){t.data.callback===s&&(delete i[s],e.removeEventListener(`message`,c),n=null,u.clear(),o(),a())}e.addEventListener(`message`,c),t(r,s),i[s]=c.bind(null,{data:{callback:s}})}),n},e.reset=function(){for(var t in e.postMessage({reset:!0}),i)i[t](),delete i[t]}}return function(){if(t)return t;if(!r&&a){var n=[`var CONFETTI, SIZE = {}, module = {};`,`(`+e.toString()+`)(this, module, true, SIZE);`,`onmessage = function(msg) {`,`  if (msg.data.options) {`,`    CONFETTI(msg.data.options).then(function () {`,`      if (msg.data.callback) {`,`        postMessage({ callback: msg.data.callback });`,`      }`,`    });`,`  } else if (msg.data.reset) {`,`    CONFETTI && CONFETTI.reset();`,`  } else if (msg.data.resize) {`,`    SIZE.width = msg.data.resize.width;`,`    SIZE.height = msg.data.resize.height;`,`  } else if (msg.data.canvas) {`,`    SIZE.width = msg.data.canvas.width;`,`    SIZE.height = msg.data.canvas.height;`,`    CONFETTI = module.exports.create(msg.data.canvas);`,`  }`,`}`].join(`
`);try{t=new Worker(URL.createObjectURL(new Blob([n])))}catch(e){return typeof console<`u`&&typeof console.warn==`function`&&console.warn(`🎊 Could not load worker`,e),null}o(t)}return t}})(),p={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:[`square`,`circle`],zIndex:100,colors:[`#26ccff`,`#a25afd`,`#ff5e7e`,`#88ff5a`,`#fcff42`,`#ffa62d`,`#ff36ff`],disableForReducedMotion:!1,scalar:1};function m(e,t){return t?t(e):e}function h(e){return e!=null}function g(e,t,n){return m(e&&h(e[t])?e[t]:p[t],n)}function _(e){return e<0?0:Math.floor(e)}function v(e,t){return Math.floor(Math.random()*(t-e))+e}function y(e){return parseInt(e,16)}function b(e){return e.map(x)}function x(e){var t=String(e).replace(/[^0-9a-f]/gi,``);return t.length<6&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),{r:y(t.substring(0,2)),g:y(t.substring(2,4)),b:y(t.substring(4,6))}}function S(e){var t=g(e,`origin`,Object);return t.x=g(t,`x`,Number),t.y=g(t,`y`,Number),t}function C(e){e.width=document.documentElement.clientWidth,e.height=document.documentElement.clientHeight}function w(e){var t=e.getBoundingClientRect();e.width=t.width,e.height=t.height}function T(e){var t=document.createElement(`canvas`);return t.style.position=`fixed`,t.style.top=`0px`,t.style.left=`0px`,t.style.pointerEvents=`none`,t.style.zIndex=e,t}function E(e,t,n,r,i,a,o,s,c){e.save(),e.translate(t,n),e.rotate(a),e.scale(r,i),e.arc(0,0,1,o,s,c),e.restore()}function D(e){var t=e.angle*(Math.PI/180),n=e.spread*(Math.PI/180);return{x:e.x,y:e.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:e.startVelocity*.5+Math.random()*e.startVelocity,angle2D:-t+(.5*n-Math.random()*n),tiltAngle:(Math.random()*.5+.25)*Math.PI,color:e.color,shape:e.shape,tick:0,totalTicks:e.ticks,decay:e.decay,drift:e.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:e.gravity*3,ovalScalar:.6,scalar:e.scalar,flat:e.flat}}function O(e,t){t.x+=Math.cos(t.angle2D)*t.velocity+t.drift,t.y+=Math.sin(t.angle2D)*t.velocity+t.gravity,t.velocity*=t.decay,t.flat?(t.wobble=0,t.wobbleX=t.x+10*t.scalar,t.wobbleY=t.y+10*t.scalar,t.tiltSin=0,t.tiltCos=0,t.random=1):(t.wobble+=t.wobbleSpeed,t.wobbleX=t.x+10*t.scalar*Math.cos(t.wobble),t.wobbleY=t.y+10*t.scalar*Math.sin(t.wobble),t.tiltAngle+=.1,t.tiltSin=Math.sin(t.tiltAngle),t.tiltCos=Math.cos(t.tiltAngle),t.random=Math.random()+2);var n=t.tick++/t.totalTicks,r=t.x+t.random*t.tiltCos,i=t.y+t.random*t.tiltSin,a=t.wobbleX+t.random*t.tiltCos,s=t.wobbleY+t.random*t.tiltSin;if(e.fillStyle=`rgba(`+t.color.r+`, `+t.color.g+`, `+t.color.b+`, `+(1-n)+`)`,e.beginPath(),o&&t.shape.type===`path`&&typeof t.shape.path==`string`&&Array.isArray(t.shape.matrix))e.fill(N(t.shape.path,t.shape.matrix,t.x,t.y,Math.abs(a-r)*.1,Math.abs(s-i)*.1,Math.PI/10*t.wobble));else if(t.shape.type===`bitmap`){var c=Math.PI/10*t.wobble,l=Math.abs(a-r)*.1,d=Math.abs(s-i)*.1,f=t.shape.bitmap.width*t.scalar,p=t.shape.bitmap.height*t.scalar,m=new DOMMatrix([Math.cos(c)*l,Math.sin(c)*l,-Math.sin(c)*d,Math.cos(c)*d,t.x,t.y]);m.multiplySelf(new DOMMatrix(t.shape.matrix));var h=e.createPattern(u.transform(t.shape.bitmap),`no-repeat`);h.setTransform(m),e.globalAlpha=1-n,e.fillStyle=h,e.fillRect(t.x-f/2,t.y-p/2,f,p),e.globalAlpha=1}else if(t.shape===`circle`)e.ellipse?e.ellipse(t.x,t.y,Math.abs(a-r)*t.ovalScalar,Math.abs(s-i)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI):E(e,t.x,t.y,Math.abs(a-r)*t.ovalScalar,Math.abs(s-i)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI);else if(t.shape===`star`)for(var g=Math.PI/2*3,_=4*t.scalar,v=8*t.scalar,y=t.x,b=t.y,x=5,S=Math.PI/x;x--;)y=t.x+Math.cos(g)*v,b=t.y+Math.sin(g)*v,e.lineTo(y,b),g+=S,y=t.x+Math.cos(g)*_,b=t.y+Math.sin(g)*_,e.lineTo(y,b),g+=S;else e.moveTo(Math.floor(t.x),Math.floor(t.y)),e.lineTo(Math.floor(t.wobbleX),Math.floor(i)),e.lineTo(Math.floor(a),Math.floor(s)),e.lineTo(Math.floor(r),Math.floor(t.wobbleY));return e.closePath(),e.fill(),t.tick<t.totalTicks}function k(e,t,n,a,o){var s=t.slice(),c=e.getContext(`2d`),f,p,m=l(function(t){function l(){f=p=null,c.clearRect(0,0,a.width,a.height),u.clear(),o(),t()}function m(){r&&!(a.width===i.width&&a.height===i.height)&&(a.width=e.width=i.width,a.height=e.height=i.height),!a.width&&!a.height&&(n(e),a.width=e.width,a.height=e.height),c.clearRect(0,0,a.width,a.height),s=s.filter(function(e){return O(c,e)}),s.length?f=d.frame(m):l()}f=d.frame(m),p=l});return{addFettis:function(e){return s=s.concat(e),m},canvas:e,promise:m,reset:function(){f&&d.cancel(f),p&&p()}}}function A(e,n){var r=!e,i=!!g(n||{},`resize`),o=!1,s=g(n,`disableForReducedMotion`,Boolean),c=a&&g(n||{},`useWorker`)?f():null,u=r?C:w,d=e&&c?!!e.__confetti_initialized:!1,p=typeof matchMedia==`function`&&matchMedia(`(prefers-reduced-motion)`).matches,m;function h(t,n,r){for(var i=g(t,`particleCount`,_),a=g(t,`angle`,Number),o=g(t,`spread`,Number),s=g(t,`startVelocity`,Number),c=g(t,`decay`,Number),l=g(t,`gravity`,Number),d=g(t,`drift`,Number),f=g(t,`colors`,b),p=g(t,`ticks`,Number),h=g(t,`shapes`),y=g(t,`scalar`),x=!!g(t,`flat`),C=S(t),w=i,T=[],E=e.width*C.x,O=e.height*C.y;w--;)T.push(D({x:E,y:O,angle:a,spread:o,startVelocity:s,color:f[w%f.length],shape:h[v(0,h.length)],ticks:p,decay:c,gravity:l,drift:d,scalar:y,flat:x}));return m?m.addFettis(T):(m=k(e,T,u,n,r),m.promise)}function y(n){var a=s||g(n,`disableForReducedMotion`,Boolean),f=g(n,`zIndex`,Number);if(a&&p)return l(function(e){e()});r&&m?e=m.canvas:r&&!e&&(e=T(f),document.body.appendChild(e)),i&&!d&&u(e);var _={width:e.width,height:e.height};c&&!d&&c.init(e),d=!0,c&&(e.__confetti_initialized=!0);function v(){if(c){var t={getBoundingClientRect:function(){if(!r)return e.getBoundingClientRect()}};u(t),c.postMessage({resize:{width:t.width,height:t.height}});return}_.width=_.height=null}function y(){m=null,i&&(o=!1,t.removeEventListener(`resize`,v)),r&&e&&(document.body.contains(e)&&document.body.removeChild(e),e=null,d=!1)}return i&&!o&&(o=!0,t.addEventListener(`resize`,v,!1)),c?c.fire(n,_,y):h(n,_,y)}return y.reset=function(){c&&c.reset(),m&&m.reset()},y}var j;function M(){return j||=A(null,{useWorker:!0,resize:!0}),j}function N(e,t,n,r,i,a,o){var s=new Path2D(e),c=new Path2D;c.addPath(s,new DOMMatrix(t));var l=new Path2D;return l.addPath(c,new DOMMatrix([Math.cos(o)*i,Math.sin(o)*i,-Math.sin(o)*a,Math.cos(o)*a,n,r])),l}function P(e){if(!o)throw Error(`path confetti are not supported in this browser`);var t,n;typeof e==`string`?t=e:(t=e.path,n=e.matrix);var r=new Path2D(t),i=document.createElement(`canvas`).getContext(`2d`);if(!n){for(var a=1e3,s=a,c=a,l=0,u=0,d,f,p=0;p<a;p+=2)for(var m=0;m<a;m+=2)i.isPointInPath(r,p,m,`nonzero`)&&(s=Math.min(s,p),c=Math.min(c,m),l=Math.max(l,p),u=Math.max(u,m));d=l-s,f=u-c;var h=10,g=Math.min(h/d,h/f);n=[g,0,0,g,-Math.round(d/2+s)*g,-Math.round(f/2+c)*g]}return{type:`path`,path:t,matrix:n}}function F(e){var t,n=1,r=`#000000`,i=`"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif`;typeof e==`string`?t=e:(t=e.text,n=`scalar`in e?e.scalar:n,i=`fontFamily`in e?e.fontFamily:i,r=`color`in e?e.color:r);var a=10*n,o=``+a+`px `+i,s=new OffscreenCanvas(a,a),c=s.getContext(`2d`);c.font=o;var l=c.measureText(t),u=Math.ceil(l.actualBoundingBoxRight+l.actualBoundingBoxLeft),d=Math.ceil(l.actualBoundingBoxAscent+l.actualBoundingBoxDescent),f=2,p=l.actualBoundingBoxLeft+f,m=l.actualBoundingBoxAscent+f;u+=f+f,d+=f+f,s=new OffscreenCanvas(u,d),c=s.getContext(`2d`),c.font=o,c.fillStyle=r,c.fillText(t,p,m);var h=1/n;return{type:`bitmap`,bitmap:s.transferToImageBitmap(),matrix:[h,0,0,h,-u*h/2,-d*h/2]}}n.exports=function(){return M().apply(this,arguments)},n.exports.reset=function(){M().reset()},n.exports.create=A,n.exports.shapeFromPath=P,n.exports.shapeFromText=F})((function(){return typeof window<`u`?window:typeof self<`u`?self:this||{}})(),e,!1);var t=e.exports;e.exports.create;var n=`/api`,r=`lumina_jwt_access_token`,i=`lumina_user_profile`,a={token:localStorage.getItem(r)||null,user:JSON.parse(localStorage.getItem(i)||`null`),setSession(e,t){this.token=e,this.user=t,e?localStorage.setItem(r,e):localStorage.removeItem(r),t?localStorage.setItem(i,JSON.stringify(t)):localStorage.removeItem(i)},clearSession(){this.token=null,this.user=null,localStorage.removeItem(r),localStorage.removeItem(i)},isAuthenticated(){return!!this.token}};async function o(e,t={}){let r={"Content-Type":`application/json`,...t.headers||{}};a.token&&(r.Authorization=`Bearer ${a.token}`);try{let i=await fetch(`${n}${e}`,{...t,headers:r}),a=await i.json().catch(()=>({}));if(!i.ok){i.status;let e=a.message||`API Error (${i.status})`;throw Error(e)}return a}catch(t){throw console.error(`API Fetch Error [${e}]:`,t),t}}var s={async checkHealth(){return o(`/hello`)},async signup(e){return o(`/auth/signup`,{method:`POST`,body:JSON.stringify(e)})},async signin(e,t){let n=await o(`/auth/signin`,{method:`POST`,body:JSON.stringify({auth:{email:e,password:t}})});if(n?.data?.attributes?.token){let e={id:n.data.id,email:n.data.attributes.email,name:n.data.attributes.name,country:n.data.attributes.country,createdAt:n.data.attributes.createdAt,updatedAt:n.data.attributes.updatedAt};a.setSession(n.data.attributes.token,e)}return n},logout(){a.clearSession()},async listContents(){return o(`/contents`)},async getContent(e){return o(`/contents/${e}`)},async createContent(e,t){return o(`/contents`,{method:`POST`,body:JSON.stringify({title:e,body:t})})},async updateContent(e,t,n){return o(`/contents/${e}`,{method:`PUT`,body:JSON.stringify({title:t,body:n})})},async partialUpdateContent(e,t){return o(`/contents/${e}`,{method:`PATCH`,body:JSON.stringify(t)})},async deleteContent(e){return o(`/contents/${e}`,{method:`DELETE`})}},c={theme:localStorage.getItem(`lumina_theme`)||`dark`,contents:[],filteredContents:[],activeFilter:`all`,searchQuery:``,sortBy:`newest`,viewMode:`grid`,apiOnline:!1,selectedContent:null,isEditMode:!1,updateMethod:`PUT`},l=document.getElementById(`app`);document.addEventListener(`DOMContentLoaded`,()=>{u(c.theme),y(),f(),a.isAuthenticated()&&_()});function u(e){c.theme=e,document.documentElement.setAttribute(`data-theme`,e),localStorage.setItem(`lumina_theme`,e)}function d(){u(c.theme===`dark`?`light`:`dark`),b()}async function f(){try{c.apiOnline=!!(await s.checkHealth())?.message}catch{c.apiOnline=!1}p()}function p(){let e=document.getElementById(`api-status-container`);e&&(e.innerHTML=`
    <div class="api-status-badge ${c.apiOnline?``:`offline`}">
      <span class="api-status-dot"></span>
      <span>${c.apiOnline?`API Connected`:`API Offline`}</span>
    </div>
  `)}function m(e,t=`info`){let n=document.getElementById(`toast-container`);n||(n=document.createElement(`div`),n.id=`toast-container`,n.className=`toast-container`,document.body.appendChild(n));let r={success:`✓`,error:`✕`,info:`ℹ`,warning:`⚠`},i=document.createElement(`div`);i.className=`toast toast-${t}`,i.innerHTML=`
    <div class="toast-icon">${r[t]||`ℹ`}</div>
    <div class="toast-message">${h(e)}</div>
  `,n.appendChild(i),setTimeout(()=>{i.style.opacity=`0`,i.style.transform=`translateX(100%)`,i.style.transition=`all 0.3s ease`,setTimeout(()=>i.remove(),300)},3500)}function h(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}function g(e){if(!e)return``;let t=new Date(e),n=Math.floor((new Date-t)/1e3);return n<60?`Just now`:n<3600?`${Math.floor(n/60)}m ago`:n<86400?`${Math.floor(n/3600)}h ago`:n<604800?`${Math.floor(n/86400)}d ago`:t.toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`})}async function _(){try{c.contents=(await s.listContents()).data||[],v()}catch(e){m(e.message||`Failed to load contents`,`error`)}}function v(){let e=[...c.contents];if(c.activeFilter===`mine`&&a.user,c.searchQuery.trim()){let t=c.searchQuery.toLowerCase();e=e.filter(e=>e.attributes.title.toLowerCase().includes(t)||e.attributes.body.toLowerCase().includes(t))}c.sortBy===`newest`?e.sort((e,t)=>new Date(t.attributes.createdAt)-new Date(e.attributes.createdAt)):c.sortBy===`oldest`?e.sort((e,t)=>new Date(e.attributes.createdAt)-new Date(t.attributes.createdAt)):c.sortBy===`title`&&e.sort((e,t)=>e.attributes.title.localeCompare(t.attributes.title)),c.filteredContents=e,S()}function y(){l.innerHTML=`
    <header id="navbar-root"></header>
    <main id="main-root" class="main-content"></main>
    <div id="modal-root"></div>
  `,b(),S()}function b(){let e=document.getElementById(`navbar-root`);if(!e)return;let t=a.isAuthenticated(),n=a.user;e.className=`navbar`,e.innerHTML=`
    <div class="navbar-container">
      <a href="#" class="brand-logo" id="brand-home-link">
        <img src="/app_logo.jpg" alt="Lumina CMS Logo" class="brand-icon-img" />
        <span>LUMINA<span class="brand-text-gradient">CMS</span></span>
        <span class="brand-badge">v1.0</span>
      </a>

      <div class="nav-actions">
        <div id="api-status-container"></div>

        <button class="btn btn-icon btn-outline" id="theme-toggle-btn" title="Toggle Light/Dark Theme">
          ${c.theme===`dark`?`☀️`:`🌙`}
        </button>

        ${t?`
          <button class="btn btn-primary" id="create-content-nav-btn">
            ✨ New Content
          </button>

          <div class="user-menu-btn" id="user-profile-menu-btn" title="View Profile & JWT Token">
            <div class="user-avatar">${(n?.name||n?.email||`U`)[0].toUpperCase()}</div>
            <span class="user-name-text">${h(n?.name||n?.email)}</span>
          </div>

          <button class="btn btn-secondary btn-icon" id="logout-btn" title="Sign Out">
            🚪
          </button>
        `:`
          <button class="btn btn-outline" id="open-signin-btn">Sign In</button>
          <button class="btn btn-primary" id="open-signup-btn">Get Started</button>
        `}
      </div>
    </div>
  `,document.getElementById(`theme-toggle-btn`)?.addEventListener(`click`,d),document.getElementById(`open-signin-btn`)?.addEventListener(`click`,()=>w(`signin`)),document.getElementById(`open-signup-btn`)?.addEventListener(`click`,()=>w(`signup`)),document.getElementById(`create-content-nav-btn`)?.addEventListener(`click`,()=>T()),document.getElementById(`user-profile-menu-btn`)?.addEventListener(`click`,O),document.getElementById(`logout-btn`)?.addEventListener(`click`,x),document.getElementById(`brand-home-link`)?.addEventListener(`click`,e=>{e.preventDefault(),c.activeFilter=`all`,c.searchQuery=``,v()}),p()}function x(){s.logout(),m(`Logged out successfully`,`info`),c.contents=[],c.filteredContents=[],y()}function S(){let e=document.getElementById(`main-root`);if(e){if(!a.isAuthenticated()){e.innerHTML=`
      <div class="hero-section glass-panel">
        <div>
          <h1 class="hero-title">Manage Content with <span class="brand-text-gradient">Precision & Speed</span></h1>
          <p class="hero-subtitle">Experience full CRUD power, REST API precision, and instant authorization driven by Django Ninja and JWT security.</p>
          <div style="margin-top: 24px; display: flex; gap: 14px;">
            <button class="btn btn-primary" id="hero-get-started-btn">🚀 Create Account</button>
            <button class="btn btn-outline" id="hero-signin-btn">🔑 Sign In to Demo</button>
          </div>
        </div>
        <div>
          <img src="/app_logo.jpg" alt="Lumina CMS Prism" style="width: 180px; height: 180px; border-radius: var(--radius-lg); box-shadow: var(--shadow-glow);" />
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card glass-panel">
          <div class="stat-icon-wrapper">🔐</div>
          <div class="stat-info">
            <span class="stat-value">JWT Auth</span>
            <span class="stat-label">Secure Token Session</span>
          </div>
        </div>
        <div class="stat-card glass-panel">
          <div class="stat-icon-wrapper">⚡</div>
          <div class="stat-info">
            <span class="stat-value">Django Ninja</span>
            <span class="stat-label">Fast REST Endpoints</span>
          </div>
        </div>
        <div class="stat-card glass-panel">
          <div class="stat-icon-wrapper">🛡️</div>
          <div class="stat-info">
            <span class="stat-value">Permission Guard</span>
            <span class="stat-label">Owner-based Authorization</span>
          </div>
        </div>
      </div>

      <div class="empty-state-container glass-panel">
        <img src="/empty_state.jpg" alt="Sign in required" class="empty-state-img" />
        <h2 class="empty-state-title">Sign in to Access Content Dashboard</h2>
        <p class="empty-state-text">Join thousands of content managers or log in to create, edit, and explore live REST content entries.</p>
        <button class="btn btn-primary" id="guest-access-signin-btn">🔑 Sign In Now</button>
      </div>
    `,document.getElementById(`hero-get-started-btn`)?.addEventListener(`click`,()=>w(`signup`)),document.getElementById(`hero-signin-btn`)?.addEventListener(`click`,()=>w(`signin`)),document.getElementById(`guest-access-signin-btn`)?.addEventListener(`click`,()=>w(`signin`));return}c.contents.length,e.innerHTML=`
    <!-- Stats Banner -->
    <div class="hero-section glass-panel" style="padding: 28px 36px;">
      <div>
        <h1 class="hero-title">Welcome back, <span class="brand-text-gradient">${h(a.user?.name||`Creator`)}</span></h1>
        <p class="hero-subtitle">You are authenticated as <strong>${h(a.user?.email)}</strong> (${h(a.user?.country||`Global`)})</p>
      </div>
      <button class="btn btn-primary" id="hero-create-btn">
        ✨ Create Content
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card glass-panel">
        <div class="stat-icon-wrapper">📚</div>
        <div class="stat-info">
          <span class="stat-value">${c.contents.length}</span>
          <span class="stat-label">Total Articles</span>
        </div>
      </div>

      <div class="stat-card glass-panel">
        <div class="stat-icon-wrapper">👤</div>
        <div class="stat-info">
          <span class="stat-value">${a.user?.email?`Active`:`Guest`}</span>
          <span class="stat-label">Current Session</span>
        </div>
      </div>

      <div class="stat-card glass-panel" id="stat-ping-card" style="cursor: pointer;" title="Click to test live /api/hello">
        <div class="stat-icon-wrapper">📡</div>
        <div class="stat-info">
          <span class="stat-value" id="ping-result-val">${c.apiOnline?`200 OK`:`Checking`}</span>
          <span class="stat-label">Backend API Status</span>
        </div>
      </div>
    </div>

    <!-- Toolbar Section -->
    <div class="toolbar-section glass-panel">
      <div class="toolbar-left">
        <button class="filter-tab ${c.activeFilter===`all`?`active`:``}" id="filter-all-btn">
          All Contents (${c.contents.length})
        </button>

        <div class="input-wrapper search-box">
          <span class="input-left-icon">🔍</span>
          <input 
            type="text" 
            class="input-field input-icon-left" 
            id="search-input" 
            placeholder="Search content by title or body..."
            value="${h(c.searchQuery)}"
          />
        </div>
      </div>

      <div class="toolbar-right">
        <select class="input-field" id="sort-select" style="width: 150px; padding: 8px 12px;">
          <option value="newest" ${c.sortBy===`newest`?`selected`:``}>Newest First</option>
          <option value="oldest" ${c.sortBy===`oldest`?`selected`:``}>Oldest First</option>
          <option value="title" ${c.sortBy===`title`?`selected`:``}>Title (A-Z)</option>
        </select>

        <div style="display: flex; gap: 4px;">
          <button class="view-toggle-btn ${c.viewMode===`grid`?`active`:``}" id="view-grid-btn" title="Grid View">
            田 Grid
          </button>
          <button class="view-toggle-btn ${c.viewMode===`table`?`active`:``}" id="view-table-btn" title="Table View">
            ☰ Table
          </button>
        </div>
      </div>
    </div>

    <!-- Content Items Grid / Table -->
    <div id="contents-container"></div>
  `,document.getElementById(`hero-create-btn`)?.addEventListener(`click`,()=>T()),document.getElementById(`filter-all-btn`)?.addEventListener(`click`,()=>{c.activeFilter=`all`,v()}),document.getElementById(`search-input`)?.addEventListener(`input`,e=>{c.searchQuery=e.target.value,v()}),document.getElementById(`sort-select`)?.addEventListener(`change`,e=>{c.sortBy=e.target.value,v()}),document.getElementById(`view-grid-btn`)?.addEventListener(`click`,()=>{c.viewMode=`grid`,S()}),document.getElementById(`view-table-btn`)?.addEventListener(`click`,()=>{c.viewMode=`table`,S()}),document.getElementById(`stat-ping-card`)?.addEventListener(`click`,async()=>{try{let e=performance.now(),t=await s.checkHealth(),n=Math.round(performance.now()-e);m(`API Ping Response: "${t.message}" (${n}ms)`,`success`),document.getElementById(`ping-result-val`).innerText=`${n}ms OK`}catch(e){m(`API ping failed: `+e.message,`error`)}}),C()}}function C(){let e=document.getElementById(`contents-container`);if(!e)return;let t=c.filteredContents;if(t.length===0){e.innerHTML=`
      <div class="empty-state-container glass-panel">
        <img src="/empty_state.jpg" alt="No content" class="empty-state-img" />
        <h2 class="empty-state-title">No Contents Found</h2>
        <p class="empty-state-text">
          ${c.searchQuery?`No articles match "${h(c.searchQuery)}". Try adjusting your search query.`:`Be the first to publish an article! Click below to create content.`}
        </p>
        <button class="btn btn-primary" id="empty-create-btn">✨ Create First Content</button>
      </div>
    `,document.getElementById(`empty-create-btn`)?.addEventListener(`click`,()=>T());return}c.viewMode===`grid`?(e.className=`contents-grid`,e.innerHTML=t.map(e=>{let t=e.attributes;return`
        <div class="content-card glass-panel" data-id="${e.id}">
          <div class="card-header">
            <h3 class="card-title">${h(t.title)}</h3>
            <span class="owner-pill is-mine">REST Article #${e.id}</span>
          </div>

          <p class="card-body-preview">${h(t.body)}</p>

          <div class="card-footer">
            <span>📅 ${g(t.createdAt)}</span>
            <div class="card-actions">
              <button class="card-action-btn view-btn" data-id="${e.id}" title="Read Full Article">👁 View</button>
              <button class="card-action-btn edit-btn" data-id="${e.id}" title="Edit Article">✏ Edit</button>
              <button class="card-action-btn delete delete-btn" data-id="${e.id}" title="Delete Article">🗑 Delete</button>
            </div>
          </div>
        </div>
      `}).join(``)):(e.className=``,e.innerHTML=`
      <div class="glass-panel" style="overflow-x: auto; padding: 12px;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-secondary);">
              <th style="padding: 12px 16px;">ID</th>
              <th style="padding: 12px 16px;">Title</th>
              <th style="padding: 12px 16px;">Preview</th>
              <th style="padding: 12px 16px;">Created</th>
              <th style="padding: 12px 16px; text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(e=>`
              <tr style="border-bottom: 1px solid var(--border-subtle);" class="table-row-hover">
                <td style="padding: 14px 16px; font-weight: 700; color: var(--accent-cyan);">#${e.id}</td>
                <td style="padding: 14px 16px; font-weight: 600;">${h(e.attributes.title)}</td>
                <td style="padding: 14px 16px; color: var(--text-secondary); max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  ${h(e.attributes.body)}
                </td>
                <td style="padding: 14px 16px; color: var(--text-muted); font-size: 0.82rem;">${g(e.attributes.createdAt)}</td>
                <td style="padding: 14px 16px; text-align: right;">
                  <div class="card-actions" style="justify-content: flex-end;">
                    <button class="card-action-btn view-btn" data-id="${e.id}">👁</button>
                    <button class="card-action-btn edit-btn" data-id="${e.id}">✏</button>
                    <button class="card-action-btn delete delete-btn" data-id="${e.id}">🗑</button>
                  </div>
                </td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>
    `),e.querySelectorAll(`.view-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`),n=c.contents.find(e=>e.id==t);n&&E(n)})}),e.querySelectorAll(`.edit-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`),n=c.contents.find(e=>e.id==t);n&&T(n)})}),e.querySelectorAll(`.delete-btn`).forEach(e=>{e.addEventListener(`click`,e=>{D(e.currentTarget.getAttribute(`data-id`))})})}function w(e=`signin`){let n=document.getElementById(`modal-root`),r=e;function i(){n.innerHTML=`
      <div class="modal-backdrop open" id="auth-modal-backdrop">
        <div class="modal-content glass-panel">
          <div class="modal-header">
            <h2 class="modal-title" style="font-size: 1.5rem;">
              ${r===`signin`?`Welcome Back`:`Create Account`}
            </h2>
            <button class="modal-close-btn" id="close-auth-modal">✕</button>
          </div>

          <!-- Auth Tab Switcher -->
          <div style="display: flex; gap: 8px; background: var(--bg-input); padding: 4px; border-radius: var(--radius-md); margin-bottom: 24px;">
            <button class="filter-tab ${r===`signin`?`active`:``}" id="tab-signin-btn" style="flex: 1; text-align: center;">
              Sign In
            </button>
            <button class="filter-tab ${r===`signup`?`active`:``}" id="tab-signup-btn" style="flex: 1; text-align: center;">
              Sign Up
            </button>
          </div>

          <form id="auth-form">
            ${r===`signup`?`
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="form-group">
                  <label class="form-label" for="first_name">First Name</label>
                  <input type="text" class="input-field" id="first_name" required placeholder="Jane" />
                </div>
                <div class="form-group">
                  <label class="form-label" for="last_name">Last Name</label>
                  <input type="text" class="input-field" id="last_name" required placeholder="Doe" />
                </div>
              </div>
            `:``}

            <div class="form-group">
              <label class="form-label" for="auth-email">Email Address</label>
              <div class="input-wrapper">
                <span class="input-left-icon">✉</span>
                <input type="email" class="input-field input-icon-left" id="auth-email" required placeholder="user@example.com" autocomplete="username" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="auth-password">Password</label>
              <div class="input-wrapper">
                <span class="input-left-icon">🔒</span>
                <input type="password" class="input-field input-icon-left input-icon-right" id="auth-password" required placeholder="••••••••" autocomplete="${r===`signup`?`new-password`:`current-password`}" />
                <span class="input-right-icon" id="toggle-pwd-btn">👁</span>
              </div>
            </div>

            ${r===`signup`?`
              <div class="form-group">
                <label class="form-label" for="auth-country">Country (Optional)</label>
                <input type="text" class="input-field" id="auth-country" placeholder="e.g. United States, Germany, Nepal" />
              </div>
            `:`
              <div style="margin-bottom: 20px; background: rgba(0, 242, 254, 0.08); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid rgba(0, 242, 254, 0.2);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.85rem; color: var(--text-secondary);">Need a quick test login?</span>
                  <button type="button" class="btn btn-outline" id="prefill-demo-btn" style="padding: 4px 10px; font-size: 0.78rem;">
                    ⚡ Quick Demo Fill
                  </button>
                </div>
              </div>
            `}

            <button type="submit" class="btn btn-primary" id="auth-submit-btn" style="width: 100%; margin-top: 8px;">
              ${r===`signin`?`🔑 Sign In`:`✨ Register Account`}
            </button>
          </form>
        </div>
      </div>
    `,document.getElementById(`close-auth-modal`)?.addEventListener(`click`,k),document.getElementById(`auth-modal-backdrop`)?.addEventListener(`click`,e=>{e.target.id===`auth-modal-backdrop`&&k()}),document.getElementById(`tab-signin-btn`)?.addEventListener(`click`,()=>{r=`signin`,i()}),document.getElementById(`tab-signup-btn`)?.addEventListener(`click`,()=>{r=`signup`,i()});let e=document.getElementById(`auth-password`);document.getElementById(`toggle-pwd-btn`)?.addEventListener(`click`,()=>{e&&(e.type=e.type===`password`?`text`:`password`)}),document.getElementById(`prefill-demo-btn`)?.addEventListener(`click`,()=>{document.getElementById(`auth-email`).value=`demo@lumina.io`,document.getElementById(`auth-password`).value=`DemoPassword123!`}),document.getElementById(`auth-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let n=document.getElementById(`auth-submit-btn`);n.disabled=!0,n.innerText=`Processing...`;try{if(r===`signin`){let e=document.getElementById(`auth-email`).value,n=document.getElementById(`auth-password`).value;await s.signin(e,n),t({particleCount:80,spread:60,origin:{y:.6}}),m(`Signed in successfully!`,`success`),k(),y(),_()}else{let e={first_name:document.getElementById(`first_name`).value,last_name:document.getElementById(`last_name`).value,email:document.getElementById(`auth-email`).value,password:document.getElementById(`auth-password`).value,country:document.getElementById(`auth-country`)?.value||null};await s.signup(e),t({particleCount:100,spread:70,origin:{y:.6}}),m(`Account created successfully! Please sign in.`,`success`),r=`signin`,i(),document.getElementById(`auth-email`).value=e.email}}catch(e){m(e.message||`Authentication failed`,`error`)}finally{n.disabled=!1,n.innerText=r===`signin`?`🔑 Sign In`:`✨ Register Account`}})}i()}function T(e=null){let n=!!e;c.isEditMode=n,c.selectedContent=e,c.updateMethod=`PUT`;let r=document.getElementById(`modal-root`);r.innerHTML=`
    <div class="modal-backdrop open" id="content-modal-backdrop">
      <div class="modal-content glass-panel" style="max-width: 620px;">
        <div class="modal-header">
          <h2 class="modal-title">${n?`Edit Content #${e.id}`:`Create New Content`}</h2>
          <button class="modal-close-btn" id="close-content-modal">✕</button>
        </div>

        <form id="content-form">
          <div class="form-group">
            <label class="form-label" for="content-title">Title</label>
            <input 
              type="text" 
              class="input-field" 
              id="content-title" 
              required 
              placeholder="e.g., Master Django Ninja REST APIs"
              value="${n?h(e.attributes.title):``}" 
            />
          </div>

          ${n?`
            <div class="form-group" style="margin-bottom: 14px;">
              <label class="form-label">HTTP Method for Update</label>
              <div style="display: flex; gap: 12px;">
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                  <input type="radio" name="update-method" value="PUT" checked /> 
                  <span><strong>PUT</strong> (Full replacement)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                  <input type="radio" name="update-method" value="PATCH" /> 
                  <span><strong>PATCH</strong> (Partial update)</span>
                </label>
              </div>
            </div>
          `:``}

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label class="form-label" for="content-body">Content Body</label>
              <span id="char-counter" style="font-size: 0.78rem; color: var(--text-muted);">0 characters</span>
            </div>
            <textarea 
              class="input-field" 
              id="content-body" 
              required 
              placeholder="Write your article content here..."
              style="min-height: 180px;"
            >${n?h(e.attributes.body):``}</textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
            <button type="button" class="btn btn-outline" id="cancel-content-btn">Cancel</button>
            <button type="submit" class="btn btn-primary" id="save-content-btn">
              ${n?`💾 Update Content`:`🚀 Publish Article`}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,document.getElementById(`close-content-modal`)?.addEventListener(`click`,k),document.getElementById(`cancel-content-btn`)?.addEventListener(`click`,k),document.getElementById(`content-modal-backdrop`)?.addEventListener(`click`,e=>{e.target.id===`content-modal-backdrop`&&k()});let i=document.getElementById(`content-body`),a=document.getElementById(`char-counter`);function o(){let e=i.value.length;a.innerText=`${e} character${e===1?``:`s`}`}i?.addEventListener(`input`,o),o(),document.getElementById(`content-form`)?.addEventListener(`submit`,async r=>{r.preventDefault();let i=document.getElementById(`save-content-btn`);i.disabled=!0,i.innerText=`Saving...`;let a=document.getElementById(`content-title`).value,o=document.getElementById(`content-body`).value;try{n?((document.querySelector(`input[name="update-method"]:checked`)?.value||`PUT`)===`PUT`?await s.updateContent(e.id,a,o):await s.partialUpdateContent(e.id,{title:a,body:o}),m(`Content updated successfully!`,`success`)):(await s.createContent(a,o),t({particleCount:70,spread:50,origin:{y:.7}}),m(`Content created successfully!`,`success`)),k(),_()}catch(e){m(e.message||`Operation failed`,`error`)}finally{i.disabled=!1,i.innerText=n?`💾 Update Content`:`🚀 Publish Article`}})}function E(e){let t=document.getElementById(`modal-root`),n=e.attributes;t.innerHTML=`
    <div class="modal-backdrop open" id="detail-modal-backdrop">
      <div class="modal-content glass-panel" style="max-width: 680px;">
        <div class="modal-header">
          <div>
            <span class="owner-pill is-mine" style="margin-bottom: 6px; display: inline-block;">Content #${e.id}</span>
            <h2 class="modal-title" style="font-size: 1.6rem;">${h(n.title)}</h2>
          </div>
          <button class="modal-close-btn" id="close-detail-modal">✕</button>
        </div>

        <div style="margin-bottom: 20px; font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 16px;">
          <span>📅 Created: ${g(n.createdAt)}</span>
          <span>🔄 Updated: ${g(n.updatedAt)}</span>
        </div>

        <div style="background: var(--bg-input); padding: 20px; border-radius: var(--radius-md); font-size: 1rem; line-height: 1.7; white-space: pre-wrap; word-break: break-word; color: var(--text-primary); border: 1px solid var(--border-subtle);">
          ${h(n.body)}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px;">
          <button class="btn btn-outline" id="copy-article-btn">📋 Copy Text</button>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-secondary" id="detail-edit-btn">✏ Edit</button>
            <button class="btn btn-danger" id="detail-delete-btn">🗑 Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,document.getElementById(`close-detail-modal`)?.addEventListener(`click`,k),document.getElementById(`detail-modal-backdrop`)?.addEventListener(`click`,e=>{e.target.id===`detail-modal-backdrop`&&k()}),document.getElementById(`copy-article-btn`)?.addEventListener(`click`,()=>{navigator.clipboard.writeText(`${n.title}\n\n${n.body}`),m(`Article text copied to clipboard!`,`success`)}),document.getElementById(`detail-edit-btn`)?.addEventListener(`click`,()=>{k(),T(e)}),document.getElementById(`detail-delete-btn`)?.addEventListener(`click`,()=>{k(),D(e.id)})}async function D(e){if(confirm(`Are you sure you want to delete content #${e}?`))try{await s.deleteContent(e),m(`Content deleted successfully`,`success`),_()}catch(e){m(e.message||`Delete failed. You may only delete content you created.`,`error`)}}function O(){let e=document.getElementById(`modal-root`),t=a.user,n=a.token;e.innerHTML=`
    <div class="modal-backdrop open" id="token-modal-backdrop">
      <div class="modal-content glass-panel" style="max-width: 640px;">
        <div class="modal-header">
          <h2 class="modal-title">🔐 JWT Session & Token Inspector</h2>
          <button class="modal-close-btn" id="close-token-modal">✕</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: var(--bg-input); padding: 16px; border-radius: var(--radius-md);">
            <div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">USER NAME</div>
              <div style="font-weight: 700;">${h(t?.name||`N/A`)}</div>
            </div>
            <div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">EMAIL ADDRESS</div>
              <div style="font-weight: 700;">${h(t?.email||`N/A`)}</div>
            </div>
            <div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">COUNTRY</div>
              <div style="font-weight: 700;">${h(t?.country||`Not specified`)}</div>
            </div>
            <div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">ACCOUNT ID</div>
              <div style="font-weight: 700; color: var(--accent-cyan);">#${t?.id||`N/A`}</div>
            </div>
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label class="form-label">JWT Bearer Access Token</label>
              <button class="btn btn-outline" id="copy-token-btn" style="padding: 4px 10px; font-size: 0.78rem;">
                📋 Copy Bearer Token
              </button>
            </div>
            <textarea 
              class="input-field" 
              readonly 
              style="font-family: var(--font-mono); font-size: 0.78rem; height: 90px;"
            >${n||`No active token`}</textarea>
          </div>

          <div style="background: rgba(16, 185, 129, 0.08); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid rgba(16, 185, 129, 0.2); font-size: 0.85rem; color: var(--accent-emerald);">
            <strong>Authorization Header:</strong> <code>Authorization: Bearer ${n?n.substring(0,20)+`...`:`none`}</code>
          </div>
        </div>
      </div>
    </div>
  `,document.getElementById(`close-token-modal`)?.addEventListener(`click`,k),document.getElementById(`token-modal-backdrop`)?.addEventListener(`click`,e=>{e.target.id===`token-modal-backdrop`&&k()}),document.getElementById(`copy-token-btn`)?.addEventListener(`click`,()=>{n&&(navigator.clipboard.writeText(`Bearer ${n}`),m(`Authorization Bearer token copied to clipboard!`,`success`))})}function k(){let e=document.getElementById(`modal-root`);e&&(e.innerHTML=``)}