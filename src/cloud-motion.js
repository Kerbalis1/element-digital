export function setupCloudMotion(document,environment){
const motion=document.querySelector('#motion-toggle'),reduced=environment.matchMedia('(prefers-reduced-motion: reduce)');
// Separate image layers visibly move over a stationary mountain. Explicit play
// must also work when the OS prefers reduced motion; default remains paused.
const cloudAnimations=[...document.querySelectorAll('.cloud')].map((cloud,index)=>{
 const frames=index===0
  ?[{transform:'translate3d(-12%,3%,0)'},{transform:'translate3d(12%,-3%,0)'}]
  :[{transform:'translate3d(10%,-2%,0)'},{transform:'translate3d(-14%,3%,0)'}];
 const animation=cloud.animate(frames,{duration:index===0?24000:32000,iterations:Infinity,direction:'alternate',easing:'linear'});
 animation.pause();return animation;
});
function syncClouds(){const paused=document.hidden||document.documentElement.dataset.motion==='off';cloudAnimations.forEach(animation=>paused?animation.pause():animation.play());}
function setMotion(off){document.documentElement.dataset.motion=off?'off':'on';if(motion){motion.setAttribute('aria-pressed',String(off));motion.textContent=off?'Включить облака':'Остановить облака';}syncClouds();}
setMotion(reduced.matches);reduced.addEventListener('change',e=>setMotion(e.matches));
motion?.addEventListener('click',()=>setMotion(document.documentElement.dataset.motion!=='off'));
document.addEventListener('visibilitychange',syncClouds);
}
