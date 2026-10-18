
/* eased in-page scrolling */
(function(){
var rm=window.matchMedia('(prefers-reduced-motion: reduce)');
var root=document.documentElement,raf=null,cancel=function(){if(raf){cancelAnimationFrame(raf);raf=null}};
var ease=function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
root.style.scrollBehavior='auto';
function offset(){var v=parseFloat(getComputedStyle(root).scrollPaddingTop);if(v>0)return v;var h=document.querySelector('header');if(h){var p=getComputedStyle(h).position;if(p==='sticky'||p==='fixed')return h.offsetHeight+8}return 0}
function go(getY,done){
 cancel();var s=window.scrollY,d0=Math.abs(getY()-s);
 if(rm.matches||d0<2){window.scrollTo(0,getY());if(done)done();return}
 var dur=Math.min(1600,Math.max(700,650+d0*0.12)),t0=null;
 var stop=function(){cancel();['wheel','touchstart','keydown','mousedown'].forEach(function(e){window.removeEventListener(e,stop)})};
 ['wheel','touchstart','keydown','mousedown'].forEach(function(e){window.addEventListener(e,stop,{passive:true,once:true})});
 var step=function(ts){if(t0===null)t0=ts;var p=Math.min(1,(ts-t0)/dur),y=s+(getY()-s)*ease(p);window.scrollTo(0,y);
  if(p<1){raf=requestAnimationFrame(step)}else{raf=null;window.scrollTo(0,getY());if(done)done()}};
 raf=requestAnimationFrame(step);
}
window.__hzScroll=function(y){go(function(){return y})};
function closeMenu(){root.classList.remove('nav-open');var n0=document.getElementById('nav'),b0=document.querySelector('.burger');if(n0)n0.classList.remove('open');if(b0)b0.setAttribute('aria-expanded','false');document.querySelectorAll('[data-nav].open').forEach(function(n){n.classList.remove('open')});
 document.querySelectorAll('[data-menu],[data-nav-toggle]').forEach(function(b){b.setAttribute('aria-expanded','false')})}
document.addEventListener('click',function(e){
 if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;
 var h=a.getAttribute('href');if(h.length<2&&h!=='#')return;
 var id=h.slice(1),el=id?document.getElementById(decodeURIComponent(id)):null;if(id&&!el)return;
 if(rm.matches){closeMenu();return}
 e.preventDefault();closeMenu();
 var getY=el&&id!=='top'?function(){return Math.max(0,el.getBoundingClientRect().top+window.scrollY-offset())}:function(){return 0};
 setTimeout(function(){go(getY,function(){try{history.pushState(null,'',id?'#'+id:location.pathname+location.search)}catch(_){}if(el){el.setAttribute('tabindex','-1');el.focus({preventScroll:true})}})},0);
});
})();
