/* Tiên Sơn v2: align plaques to architecture on the 9:16 map.
   Coordinates from the user's supplied layout reference. */
(function(){
 'use strict';
 const POS={to_son:[58.6,3.1],tang_kinh:[80.5,32.3],khi_phuong:[77.5,44.8],
   dan_cac:[24.1,51.2],linh_mo:[79.7,63.8],linh_dien:[22.8,91.9]};
 function align(){
   const grid=document.getElementById('estateMapGrid');if(!grid)return;
   for(const node of grid.querySelectorAll('.estate-node')){
     const btn=node.querySelector('.estate-node-main[onclick]');if(!btn)continue;
     const match=btn.getAttribute('onclick').match(/openEstateDetailModal\(['"]([^'"]+)['"]\)/);
     const p=match&&POS[match[1]];if(!p)continue;
     node.style.setProperty('left',p[0]+'%','important');
     node.style.setProperty('top',p[1]+'%','important');
   }
 }
 function init(){
   const grid=document.getElementById('estateMapGrid');
   if(!grid){setTimeout(init,250);return;}
   new MutationObserver(align).observe(grid,{childList:true});
   align();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
 else init();
})();
