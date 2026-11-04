import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setupCloudMotion } from '../src/cloud-motion.js';

function scene(reduce=false){
 const events={},mediaEvents={};
 const animations=[0,1].map(()=>({state:'idle',pause(){this.state='paused';},play(){this.state='running';}}));
 const button={attrs:{},setAttribute(k,v){this.attrs[k]=v;},addEventListener(k,fn){this[k]=fn;}};
 const doc={hidden:false,documentElement:{dataset:{}},querySelector(){return button;},querySelectorAll(){return animations.map(a=>({animate(){return a;}}));},addEventListener(k,fn){events[k]=fn;}};
 const environment={matchMedia(){return {matches:reduce,addEventListener(k,fn){mediaEvents[k]=fn;}};}};
 setupCloudMotion(doc,environment);
 return {animations,button,doc,events,mediaEvents};
}
test('reduced-motion default pauses clouds; explicit play overrides it and pause is reversible',()=>{
 const s=scene(true);
 assert.ok(s.animations.every(a=>a.state==='paused'));
 assert.equal(s.button.textContent,'Включить облака');
 s.button.click();
 assert.ok(s.animations.every(a=>a.state==='running'));
 assert.equal(s.button.attrs['aria-pressed'],'false');
 s.button.click();
 assert.ok(s.animations.every(a=>a.state==='paused'));
 s.button.click();
 assert.ok(s.animations.every(a=>a.state==='running'));
});
test('backgrounding pauses motion without losing the visitor’s chosen pause',()=>{
 const s=scene();
 assert.ok(s.animations.every(a=>a.state==='running'));
 s.doc.hidden=true;s.events.visibilitychange();
 assert.ok(s.animations.every(a=>a.state==='paused'));
 s.doc.hidden=false;s.events.visibilitychange();
 assert.ok(s.animations.every(a=>a.state==='running'));
 s.button.click();s.doc.hidden=true;s.events.visibilitychange();s.doc.hidden=false;s.events.visibilitychange();
 assert.ok(s.animations.every(a=>a.state==='paused'));
 s.mediaEvents.change({matches:true});
 assert.equal(s.doc.documentElement.dataset.motion,'off');
});
