// Server-only: never copy this module or runtime credentials into browser assets.
const recent = new Map(); // Best-effort per-isolate throttle; no contact data stored.
const json = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), {
  status, headers: {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff', ...extra}
});
const ready = env => /^\d+:[A-Za-z0-9_-]{20,}$/.test(env.TELEGRAM_BOT_TOKEN || '') && /^-?\d+$/.test(env.TELEGRAM_CHAT_ID || '');

export async function handleLeads(request, env, send = fetch) {
  const url = new URL(request.url);
  if (url.pathname === '/api/leads/status') {
    return request.method === 'GET' ? json({enabled:ready(env)}) : json({ok:false},405,{Allow:'GET'});
  }
  if (request.method !== 'POST') return json({ok:false},405,{Allow:'POST'});
  const origin = request.headers.get('Origin');
  if (!origin || origin !== url.origin || request.headers.get('Sec-Fetch-Site') === 'cross-site') return json({ok:false,error:'origin'},403);
  if (!ready(env)) return json({ok:false,error:'unavailable'},503);
  if (request.headers.get('Content-Type')?.split(';')[0].trim() !== 'application/json') return json({ok:false,error:'content_type'},415);
  if (Number(request.headers.get('Content-Length')) > 12000) return json({ok:false,error:'too_large'},413);
  let data;
  try {
    // Bound streaming requests as well as requests with a Content-Length header.
    const reader=request.body?.getReader();
    if (!reader) return json({ok:false,error:'invalid'},400);
    const parts=[];let size=0;
    while (true) {const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>12000){await reader.cancel();return json({ok:false,error:'too_large'},413);}parts.push(value);}
    const bytes=new Uint8Array(size);let offset=0;for(const part of parts){bytes.set(part,offset);offset+=part.byteLength;}
    data=JSON.parse(new TextDecoder().decode(bytes));
  } catch {return json({ok:false,error:'invalid'},400);}
  if (!data || typeof data !== 'object' || Array.isArray(data)) return json({ok:false,error:'invalid'},400);
  const fields = [['name',100],['contact',200],['description',3000]];
  for (const [key,max] of fields) {
    if (typeof data[key] !== 'string' || !data[key].trim() || data[key].trim().length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(data[key])) return json({ok:false,error:'validation'},422);
    data[key]=data[key].trim();
  }
  if (data.website) return json({ok:false,error:'validation'},422);
  const now=Date.now();
  for(const [key,expires] of recent) if(expires<=now)recent.delete(key);
  const client=request.headers.get('CF-Connecting-IP') || request.headers.get('oai-authenticated-user-id');
  if(client) {
    if(recent.has(client))return json({ok:false,error:'rate_limit'},429,{'Retry-After':'60'});
    if(recent.size>=1024)recent.delete(recent.keys().next().value);
    recent.set(client,now+60000);
  }
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12000);
  try {
    const response=await send(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,{
      method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,
      body:JSON.stringify({chat_id:env.TELEGRAM_CHAT_ID,text:`Новая заявка · ELEMENT DIGITAL\n\nИмя: ${data.name}\nКонтакт: ${data.contact}\n\nЗадача:\n${data.description}`,link_preview_options:{is_disabled:true}})
    });
    const result=await response.json();
    if(!response.ok || result.ok!==true || !Number.isInteger(result.result?.message_id)) {
      // Log only bounded categories, never URLs, tokens, recipient or applicant data.
      const code=Number(result.error_code)||response.status;
      const category=code===401||code===404?'bot_credentials':code===403?'recipient_permission':code===400?'recipient_or_request':code===429?'provider_rate_limit':'provider_response';
      console.error(JSON.stringify({event:'lead_delivery_failed',provider:'telegram',code,category}));
      return json({ok:false,error:'delivery'},502);
    }
    return json({ok:true});
  } catch {return json({ok:false,error:'delivery_unknown'},504);}
  finally {clearTimeout(timer);}
}
