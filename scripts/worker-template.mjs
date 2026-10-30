// Build-time placeholders become a self-contained Cloudflare Worker.
/* LEADS_MODULE */
const assets = /* EMBEDDED_ASSETS */ {};
const decoded = new Map();
export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if(path === '/api/leads' || path === '/api/leads/status') return handleLeads(request, env);
    if(request.method !== 'GET' && request.method !== 'HEAD')return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD'}});
    const entry = assets[path === '/' ? '/index.html' : path];
    if(!entry)return new Response('Not found',{status:404});
    if(!decoded.has(path)) decoded.set(path, Uint8Array.from(atob(entry.body), c=>c.charCodeAt(0)));
    return new Response(request.method === 'HEAD' ? null : decoded.get(path),{headers:{'Content-Type':entry.type,'X-Content-Type-Options':'nosniff','Cache-Control':'public, max-age=0, must-revalidate'}});
  }
};
