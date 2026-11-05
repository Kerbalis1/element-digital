import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

// Run the actual page script, not a copied animation implementation. The cloud
// initializer supplies no ambient variables, matching its separate module.
const source=(await readFile(new URL('../src/premium.js',import.meta.url),'utf8'))
 .replace(/^import \{ setupCloudMotion \} from [^\n]+;\n/,'');
function page(reduce){
 const timers=new Map();let next=0;
 const status={textContent:''};
 const bubble={dataset:{bubbleState:'idle'},querySelector(){return {decode:async()=>{}};}};
 const idle={addEventListener(){},setAttribute(){},hidden:true};
 const elements={'#site-config':{textContent:'{}'},'#mobile-nav':idle,'.menu-toggle':idle,'[data-bubble-state]':bubble,'#bubble-status':status};
 const document={querySelector:s=>elements[s]||null,querySelectorAll:()=>[],addEventListener(){},body:{dataset:{}}};
 const context=vm.createContext({document,window:{},setupCloudMotion(){},matchMedia:()=>({matches:reduce,addEventListener(){}}),requestAnimationFrame:fn=>fn(),setTimeout:fn=>{timers.set(++next,fn);return next;},clearTimeout:id=>timers.delete(id)});
 vm.runInContext(source,context);
 return {context,bubble,status,finish(){const pending=[...timers.values()];timers.clear();pending.forEach(fn=>fn());}};
}
for(const reduce of [false,true])test(`Design bubble pops and inflates without cloud globals (reduced motion: ${reduce})`,async()=>{
 const p=page(reduce);
 await vm.runInContext("setBubble('pop')",p.context);
 if(!reduce)assert.equal(p.bubble.dataset.bubbleState,'popping');
 p.finish();assert.equal(p.bubble.dataset.bubbleState,'popped');
 assert.equal(p.status.textContent,'Хлоп! Пузырь лопнул.');
 await vm.runInContext("setBubble('inflate')",p.context);
 if(!reduce)assert.equal(p.bubble.dataset.bubbleState,'inflating');
 p.finish();assert.equal(p.bubble.dataset.bubbleState,'idle');
 assert.equal(p.status.textContent,'Пузырь надут.');
});
