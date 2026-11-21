/* TDGT profession artwork v0.2 — purely visual, preserve game state and saves. */
(function () {
 'use strict';
 const JOBS = new Set(['khi_phuong','linh_mo','linh_dien','dan_cac','tang_kinh','to_son']);
 const RE = /openEstateDetailModal\(['"]([^'"]+)['"]\)/;
 let queued = false;
 let enabled = true;
 function update() {
   queued = false;
   const grid = document.getElementById('estateMapGrid');
   const stage = document.getElementById('estateMapStage');
   if (!grid || !stage) return;
   for (const node of grid.querySelectorAll('.estate-node')) {
     const button = node.querySelector('.estate-node-main[onclick]');
     const id = button?.getAttribute('onclick')?.match(RE)?.[1];
     const built = node.classList.contains('is-built');
     const existing = node.querySelector('.tdgt-live-worker');
     if (!built || !JOBS.has(id)) { if (existing) existing.remove(); continue; }
     if (!existing) {
       const art = document.createElement('span');
       art.className = 'tdgt-live-worker';
       art.dataset.job = id;
       art.setAttribute('aria-hidden','true');
       node.insertBefore(art,button);
     }
   }
   let button = stage.querySelector('#tdgt-live-toggle');
   if (!button) {
     button = document.createElement('button');
     button.id='tdgt-live-toggle'; button.type='button';
     button.addEventListener('click',function(){
       enabled=!enabled;
       stage.classList.toggle('tdgt-motion-off',!enabled);
       button.textContent='🎞 Hoạt cảnh: '+(enabled?'Bật':'Tắt');
     });
     button.textContent='🎞 Hoạt cảnh: Bật';
     stage.appendChild(button);
   }
 }
 function schedule(){ if(!queued){ queued=true;requestAnimationFrame(update); } }
 function boot(){
   const grid=document.getElementById('estateMapGrid');
   if(!grid){setTimeout(boot,250);return;}
   new MutationObserver(schedule).observe(grid,{childList:true});
   schedule();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
 else boot();
})();