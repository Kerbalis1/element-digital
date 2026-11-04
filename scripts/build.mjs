import { mkdir, rm, cp, readFile, writeFile, readdir } from 'node:fs/promises';
import { site } from '../src/config.js';
import { routes, renderPage, esc } from '../src/pages.mjs';
const staticBuild=process.argv.includes('--static');
const parsedUrl=new URL(process.env.SITE_URL||site.url);
if(parsedUrl.protocol!=='https:'||parsedUrl.search||parsedUrl.hash||parsedUrl.username||parsedUrl.password)throw Error('SITE_URL must be an HTTPS URL without query, hash or credentials');
const publicUrl=parsedUrl.href.replace(/\/$/,'');
const base=new URL(publicUrl).pathname.replace(/\/$/,'')+'/';
const endpoint=process.env.PUBLIC_LEADS_ENDPOINT||'';
if(endpoint){const target=new URL(endpoint);if(target.protocol!=='https:'||target.username||target.password)throw Error('PUBLIC_LEADS_ENDPOINT must use HTTPS');}
const analyticsId=process.env.YANDEX_METRIKA_ID||'';
if(analyticsId&&!/^\d{1,12}$/.test(analyticsId))throw Error('Invalid analytics ID');
const config={telegram:site.telegram,leadsEndpoint:endpoint||(staticBuild?'':base+'api/leads'),analyticsId:analyticsId?Number(analyticsId):null};
const json=value=>JSON.stringify(value).replace(/</g,'\\u003c');
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});await cp('public','dist',{recursive:true});
for(const file of ['premium.css','premium.js','house.js'])await cp('src/'+file,'dist/'+file);
const houseArt=await readFile('public/assets/project-bereg.svg','utf8');await writeFile('dist/house-art.js','export const houseArt = '+json(houseArt)+';\n');
const template=await readFile('src/index.html','utf8');
for(const key of routes){
 const page=renderPage(key,base,{manual:!config.leadsEndpoint});
 const canonical=publicUrl+'/'+(key?key+'/':'');
 const schema={'@context':'https://schema.org','@type':'WebPage',name:page.title,description:page.description,url:canonical,isPartOf:{'@type':'WebSite',name:'Element Digital',url:publicUrl+'/'},publisher:{'@type':'Organization',name:'Element Digital',url:publicUrl+'/',logo:publicUrl+'/assets/favicon.svg'}};
 const values={title:esc(page.title),description:esc(page.description),canonical:esc(canonical),url:esc(publicUrl),base:esc(base),schema:json(schema),config:json(config),theme:page.theme,demo:key.startsWith('demo/')?`data-demo="${esc(key.split('/')[1])}"`:'',body:page.html};
 const html=(key.startsWith('demo/')?template.replace('<meta name="theme-color"', '<meta name="robots" content="noindex, follow"><meta name="theme-color"'):template).replace(/\{\{(\w+)\}\}/g,(_,key)=>values[key]);
 const dir='dist'+(key?'/'+key:'');await mkdir(dir,{recursive:true});await writeFile(dir+'/index.html',html);
}
const indexed=routes.filter(p=>p!=='privacy'&&!p.startsWith('demo/'));
await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+indexed.map(p=>`\n<url><loc>${esc(publicUrl+'/'+(p?p+'/':''))}</loc></url>`).join('')+'\n</urlset>\n');
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${publicUrl}/sitemap.xml\n`);
await writeFile('dist/404.html',`<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Страница не найдена — Element Digital</title><link rel="stylesheet" href="${base}premium.css"><body><main class="section wrap"><p class="eyebrow">ELEMENT / 404</p><h1>Здесь пока<br>ничего нет.</h1><p>Проверьте адрес или вернитесь на главную.</p><a class="button" href="${base}">На главную ↗</a></main></body></html>`);
if(staticBuild){await writeFile('dist/.nojekyll','');console.log(`Built ${routes.length} static pages for ${publicUrl}`);}else{
 const mime={html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',js:'text/javascript; charset=utf-8',svg:'image/svg+xml',jpg:'image/jpeg',gif:'image/gif',mp4:'video/mp4',zip:'application/zip',png:'image/png',webp:'image/webp',woff:'font/woff',txt:'text/plain; charset=utf-8',xml:'application/xml; charset=utf-8',json:'application/json'};
 const assets={};
 async function embed(dir,prefix=''){for(const file of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+file.name,relative=prefix+'/'+file.name;if(file.isDirectory())await embed(path,relative);else assets[relative]={type:mime[file.name.split('.').pop()]||'application/octet-stream',body:(await readFile(path)).toString('base64')};}}
 await embed('dist');
 const leads=(await readFile('scripts/leads.mjs','utf8')).replace('export async function','async function');
 const worker=(await readFile('scripts/worker-template.mjs','utf8')).replace('/* LEADS_MODULE */',()=>leads).replace('/* EMBEDDED_ASSETS */ {}',()=>JSON.stringify(assets)).replace('/* BASE_PATH */',()=>JSON.stringify(base)).replace('/* CSP */',()=>JSON.stringify(makeCsp()));
 await rm('dist',{recursive:true,force:true});await mkdir('dist/server',{recursive:true});await mkdir('dist/.openai',{recursive:true});await writeFile('dist/server/index.js',worker);await cp('.openai/hosting.json','dist/.openai/hosting.json');console.log(`Built Worker with ${routes.length} pages at ${base}`);
}
function makeCsp(){let connect="'self'";if(endpoint)connect+=' '+new URL(endpoint).origin;if(analyticsId)connect+=' https://mc.yandex.ru https://mc.yandex.com https://*.mc.yandex.ru';return `default-src 'self'; script-src 'self'${analyticsId?' https://mc.yandex.ru':''}; style-src 'self'; img-src 'self' data:${analyticsId?' https://mc.yandex.ru https://mc.yandex.com':''}; font-src 'self'; connect-src ${connect}; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'self'`;}
