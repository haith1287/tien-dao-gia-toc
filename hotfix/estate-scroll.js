/* Sprint 3F.4.4b — mobile-safe estate map overlay.
   Runs after DOMContentLoaded; reacts to rebuilt estate nodes.
   Coordinates are percentages of the complete 768×1376 illustration. */
(function(){
 'use strict';
 const POS={
  to_son:[58.6,4.7],tang_kinh:[80.5,32.3],khi_phuong:[77.5,44.8],
  dan_cac:[24.1,51.2],linh_mo:[79.7,63.8],linh_dien:[22.8,91.9]
 };
 const ACTORS={
  to_son:[51,17],tang_kinh:[70,37],khi_phuong:[68,48],
  dan_cac:[31,56],linh_mo:[70,69],linh_dien:[32,84]
 };
 function makeActor(x,y,walk){
  const el=document.createElement('span');
  el.className='estate-worker'+(walk?' walker':'');
  el.style.left=x+'%';el.style.top=y+'%';
  el.setAttribute('aria-hidden','true');
  el.innerHTML='<i class="hair"></i><i class="head"></i><i class="robe"></i>';
  return el;
 }
 function init(){
  const grid=document.getElementById('estateMapGrid');
  const stage=document.getElementById('estateMapStage');
  if(!grid||!stage)return;
  let scheduled=false;
  function refresh(){
   scheduled=false;
   const nodes=[...grid.querySelectorAll('.estate-node')];
   const built=[];
   for(const [id,pos] of Object.entries(POS)){
    const node=nodes.find(n=>{
     const btn=n.querySelector('.estate-node-main[onclick]');
     return btn && btn.getAttribute('onclick').includes("'"+id+"'");
    });
    if(!node)continue;
    node.style.setProperty('left',pos[0]+'%','important');
    node.style.setProperty('top',pos[1]+'%','important');
    if(node.classList.contains('is-built'))built.push(id);
   }
   let layer=stage.querySelector('.estate-worker-layer');
   if(!layer){
    layer=document.createElement('div');
    layer.className='estate-worker-layer';
    layer.setAttribute('aria-hidden','true');
    stage.appendChild(layer);
   }
   const signature=built.join('|');
   if(layer.dataset.signature===signature)return;
   layer.dataset.signature=signature;
   layer.replaceChildren();
   for(const id of built){
    const [x,y]=ACTORS[id];
    layer.appendChild(makeActor(x,y,false));
   }
   // A wandering disciple appears when the clan has at least one built site.
   if(built.length)layer.appendChild(makeActor(47,80,true));
  }
  const observer=new MutationObserver(()=>{
   if(!scheduled){scheduled=true;requestAnimationFrame(refresh)}
  });
  observer.observe(grid,{childList:true,subtree:false});
  refresh();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
 else init();
})();
