import { mkdir, rm, cp, readFile, writeFile, readdir } from 'node:fs/promises';
import { site } from '../src/config.js';
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
await rm('dist', {recursive:true, force:true});
await mkdir('dist', {recursive:true});
await cp('public', 'dist', {recursive:true});
await cp('src', 'dist', {recursive:true});
let html = await readFile('src/index.html','utf8');
html = html.replaceAll('{{title}}',escape(site.title)).replaceAll('{{description}}',escape(site.description)).replaceAll('{{url}}',escape(site.url));
for (const [key,value] of Object.entries(site.hero)) html=html.replace(new RegExp('(data-hero=\"'+key+'\">)[^<]*'), (_,prefix)=>prefix+escape(value));
html=html.replaceAll('{{location}}',escape([site.city,site.geography].filter(Boolean).join(' ↗ ')));
await writeFile('dist/index.html',html);
const houseArt = await readFile('public/assets/project-bereg.svg','utf8');
await writeFile('dist/house-art.js','export const houseArt = '+JSON.stringify(houseArt)+';\n');
await rm('dist/config.js.map',{force:true});
if (!process.argv.includes('--static')) {
  const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.gif':'image/gif','.mp4':'video/mp4','.zip':'application/zip','.png':'image/png','.webp':'image/webp','.woff':'font/woff','.txt':'text/plain; charset=utf-8','.json':'application/json'};
  const assets={};
  async function embed(dir,prefix='') {
    for(const file of await readdir(dir,{withFileTypes:true})) {
      const relative=prefix+'/'+file.name,path=dir+'/'+file.name;
      if(file.isDirectory())await embed(path,relative);
      else {const ext=file.name.slice(file.name.lastIndexOf('.'));assets[relative]={type:mime[ext]||'application/octet-stream',body:(await readFile(path)).toString('base64')};}
    }
  }
  await embed('dist');
  const leads=(await readFile('scripts/leads.mjs','utf8')).replace('export async function','async function');
  const worker=(await readFile('scripts/worker-template.mjs','utf8')).replace('/* LEADS_MODULE */',leads).replace('/* EMBEDDED_ASSETS */ {}',JSON.stringify(assets));
  await rm('dist',{recursive:true,force:true});
  await mkdir('dist/server',{recursive:true});await mkdir('dist/.openai',{recursive:true});
  await writeFile('dist/server/index.js',worker);
  await cp('.openai/hosting.json','dist/.openai/hosting.json');
  console.log('Built self-contained Sites Worker in dist/server/index.js');
} else console.log('Built static fallback in dist/ (automatic sending requires a server)');
