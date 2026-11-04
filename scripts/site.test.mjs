import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { routes } from '../src/pages.mjs';
const root=await mkdtemp(join(tmpdir(),'element-site-'));
for(const path of ['src','public','scripts','.openai'])await cp(path,join(root,path),{recursive:true});
const origin='https://kerbalis1.github.io/element-digital';
try{
 execFileSync(process.execPath,['scripts/build.mjs','--static'],{cwd:root,env:{...process.env,SITE_URL:origin,PUBLIC_LEADS_ENDPOINT:'',YANDEX_METRIKA_ID:''}});
 await test('static pages have unique metadata, one H1, valid local navigation and no template tokens',async()=>{
  const titles=new Set();
  for(const key of routes){const html=await readFile(join(root,'dist',key,'index.html'),'utf8');
   assert.equal((html.match(/<h1[ >]/g)||[]).length,1,key);assert.doesNotMatch(html,/\{\{\w+\}\}/);
   const title=html.match(/<title>(.*?)<\/title>/)[1];assert.ok(!titles.has(title),'duplicate '+key);titles.add(title);
   assert.ok(html.includes(`rel="canonical" href="${origin}/${key?key+'/':''}"`),key);
   assert.match(html,/<meta name="description" content="[^"]+"/);assert.match(html,/<html lang="ru"/);
   for(const raw of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    const url=new URL(raw[1],origin+'/'+(key?key+'/':''));if(url.origin!==new URL(origin).origin)continue;
    assert.ok(url.pathname.startsWith('/element-digital/'),url.href);
    let local=url.pathname.slice('/element-digital/'.length);if(local.endsWith('/')||!local)local+='index.html';
    await stat(join(root,'dist',local));
    if(url.hash){const target=await readFile(join(root,'dist',local),'utf8');assert.ok(target.includes(`id="${url.hash.slice(1)}"`),'missing anchor '+url.href);}
   }
  }
 });
 await test('indexing, public payload and static form fallback are honest',async()=>{
  const sitemap=await readFile(join(root,'dist/sitemap.xml'),'utf8');assert.equal((sitemap.match(/<loc>/g)||[]).length,routes.filter(p=>p!=='privacy'&&!p.startsWith('demo/')).length);assert.doesNotMatch(sitemap,/demo\//);
  for(const path of ['development/websites','development/landing-pages','development/recreation']){assert.ok(sitemap.includes(origin+'/'+path+'/'));const page=await readFile(join(root,'dist',path,'index.html'),'utf8');assert.match(page,/BreadcrumbList/);assert.match(page,/Стоимость и сроки/);assert.doesNotMatch(page,/noindex/);}
  const robots=await readFile(join(root,'dist/robots.txt'),'utf8');assert.ok(robots.includes(origin+'/sitemap.xml'));
  const html=await readFile(join(root,'dist/index.html'),'utf8');assert.match(html,/Подготовить сообщение/);assert.match(html,/"leadsEndpoint":""/);assert.doesNotMatch(html,/TELEGRAM_BOT_TOKEN|chatgpt|codex|нейросет|искусственн/i);
 });
 execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root,env:{...process.env,SITE_URL:origin,PUBLIC_LEADS_ENDPOINT:'',YANDEX_METRIKA_ID:''}});
 const {default:worker}=await import(join(root,'dist/server/index.js'));
 await test('worker serves all routes, redirects directory URLs, handles HEAD, 404, and protects forms',async()=>{
  for(const route of routes){const response=await worker.fetch(new Request(origin+'/'+(route?route+'/':'')),{});assert.equal(response.status,200,route);assert.ok(response.headers.get('Content-Security-Policy'));assert.ok((await response.text()).includes('<h1'));}
  const redirect=await worker.fetch(new Request(origin+'/design?source=test'),{});assert.equal(redirect.status,308);assert.equal(redirect.headers.get('Location'),origin+'/design/?source=test');
  const missing=await worker.fetch(new Request(origin+'/missing/'),{});assert.equal(missing.status,404);assert.match(await missing.text(),/Страница не найдена/);
  const head=await worker.fetch(new Request(origin+'/seo/',{method:'HEAD'}),{});assert.equal(await head.text(),'');assert.equal(head.status,200);
  const status=await worker.fetch(new Request(origin+'/api/leads/status'),{});assert.deepEqual(await status.json(),{enabled:false});
  const form=await worker.fetch(new Request(origin+'/api/leads',{method:'POST',headers:{Origin:'https://evil.example','Content-Type':'application/json'},body:'{}'}),{});assert.equal(form.status,403);
 });
}finally{await rm(root,{recursive:true,force:true});}
