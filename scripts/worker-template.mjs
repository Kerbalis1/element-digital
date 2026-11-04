/* LEADS_MODULE */
const assets = /* EMBEDDED_ASSETS */ {};
const base = /* BASE_PATH */;
const csp = /* CSP */;
const decoded = new Map();
const security={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Permissions-Policy':'camera=(), microphone=(), geolocation=()','X-Frame-Options':'SAMEORIGIN','Content-Security-Policy':csp};
export default {async fetch(request, env){
 const url=new URL(request.url);let path;
 try{path=decodeURIComponent(url.pathname);}catch{return new Response('Bad request',{status:400,headers:security});}
 if(!path.startsWith(base))return new Response('Not found',{status:404,headers:security});
 path='/'+path.slice(base.length);
 if(path==='/api/leads'||path==='/api/leads/status')return handleLeads(request,env);
 if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405,headers:{...security,Allow:'GET, HEAD'}});
 if(!path.endsWith('/')&&assets[path+'/index.html']){url.pathname+='/';return Response.redirect(url,308);}
 const entry=assets[path.endsWith('/')?path+'index.html':path];
 const selected=entry||assets['/404.html'];const cacheKey=entry?path:'/404.html';
 if(!decoded.has(cacheKey))decoded.set(cacheKey,Uint8Array.from(atob(selected.body),c=>c.charCodeAt(0)));
 return new Response(request.method==='HEAD'?null:decoded.get(cacheKey),{status:entry?200:404,headers:{...security,'Content-Type':selected.type,'Cache-Control':/\.(webp|woff|png|svg)$/.test(path)?'public, max-age=86400':'public, max-age=0, must-revalidate'}});
}};
