/* TDGT live workstations v0.1: visual-only enhancement, no game-state mutation */
(function(){
'use strict';
const IDS=['to_son','tang_kinh','khi_phuong','dan_cac','linh_mo','linh_dien'];
const RASTER={to_son:0,khi_phuong:1,dan_cac:2,linh_mo:3,linh_dien:4,tang_kinh:0};
let enabled=true,queued=false;
function work(){
 queued=false;
 const stage=document.getElementById('estateMapStage');
 const grid=document.getElementById('estateMapGrid');
 if(!stage||!grid)return;
 const source=Array.from(stage.querySelectorAll('.estate-raster-person.still'));
 if(source.length<5)return;
 for(const node of grid.querySelectorAll('.estate-node.is-built')){
   const btn=node.querySelector('.estate-node-main[onclick]');
   const m=btn&&btn.getAttribute('onclick').match(/openEstateDetailModal\\(['"]([^'"]+)['"]\\)/);
   const id=m&&m[1];
   if(!id||!IDS.includes(id))continue;
   let actor=node.querySelector('.tdgt-live-worker');
   if(!actor){actor=document.createElement('span');actor.className='tdgt-live-worker';actor.setAttribute('aria-hidden','true');actor.dataset.job=id;const img=document.createElement('img');img.alt='';img.draggable=false;actor.appendChild(img);node.insertBefore(actor,btn)}
   const picture=source[RASTER[id]]?.src;
   if(picture&&actor.firstElementChild.src!==picture)actor.firstElementChild.src=picture;
 }
 for(const actor of grid.querySelectorAll('.tdgt-live-worker')){
  if(!actor.closest('.estate-node.is-built'))actor.remove();
 }
 let toggle=stage.querySelector('#tdgt-live-toggle');
 if(!toggle){toggle=document.createElement('button');toggle.type='button';toggle.id='tdgt-live-toggle';toggle.addEventListener('click',()=>{enabled=!enabled;stage.classList.toggle('tdgt-motion-off',!enabled);toggle.textContent='🎞 Hoạt cảnh: '+(enabled?'Bật':'Tắt')});toggle.textContent='🎞 Hoạt cảnh: Bật';stage.appendChild(toggle)}
}
function schedule(){if(queued)return;queued=true;requestAnimationFrame(work)}
function boot(){
 const grid=document.getElementById('estateMapGrid'),stage=document.getElementById('estateMapStage');
 if(!grid||!stage){setTimeout(boot,350);return}
 new MutationObserver(schedule).observe(grid,{childList:true,subtree:false});
 new MutationObserver(schedule).observe(stage,{childList:true,subtree:false});
 schedule();setTimeout(schedule,700);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
