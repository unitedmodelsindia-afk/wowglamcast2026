const C="wg-v19",SHELL=["./","index.html","config.js","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png","icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!=="GET"||u.pathname.endsWith(".apk"))return;
 const own=u.origin===location.origin,lib=u.hostname==="www.gstatic.com"||u.hostname.endsWith("fonts.googleapis.com")||u.hostname.endsWith("fonts.gstatic.com");
 if(!own&&!lib)return;
 if(own&&(r.mode==="navigate"||u.pathname.endsWith(".html")||u.pathname.endsWith("config.js"))){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));return}
 e.respondWith(caches.match(r).then(m=>{const f=fetch(r).then(res=>{if(res.ok||res.type==="opaque"){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>m);return m||f}))});
