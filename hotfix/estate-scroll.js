/* Sprint 3F.4.4 — match scroll plaque coordinates to source artwork.
   Reapply after renderEstateMap regenerates the nodes; no gameplay logic changed. */
(function(){
 'use strict';
 const locations={
  to_son:[58.6,5.0],tang_kinh:[80.5,32.3],khi_phuong:[77.5,44.8],
  dan_cac:[24.1,51.2],linh_mo:[79.7,63.8],linh_dien:[22.8,91.9]
 };
 const workers={
  to_son:[53,17,'🧘'],tang_kinh:[74,36,'📖'],khi_phuong:[67,48,'⚒️'],
  dan_cac:[33,56,'🧪'],linh_mo:[73,68,'⛏️'],linh_dien:[31,83,'🧑‍🌾']
 };
 const grid=document.getElementById('estateMapGrid');
 const stage=document.getElementById('estateMapStage');
 if(!grid||!stage)return;
 let busy=false;
 function refresh(){
  if(busy)return;busy=true;
  try{
   const nodes=[...grid.querySelectorAll('.estate-node')];
   const active=[];
   for(const [id,pos] of Object.entries(locations)){
    const node=nodes.find(n=>{const b=n.querySelector('.estate-node-main');return b&&b.getAttribute('onclick')?.includes("'"+id+"'")});
    if(!node)continue;
    node.style.setProperty('left',pos[0]+'%');
    node.style.setProperty('top',pos[1]+'%');
    if(node.classList.contains('is-built'))active.push(id);
   }
   let layer=stage.querySelector('.estate-worker-layer');
   if(!layer){layer=document.createElement('div');layer.className='estate-worker-layer';layer.setAttribute('aria-hidden','true');stage.appendChild(layer)}
   const key=active.join('|');
   if(layer.dataset.workers!==key){
    layer.dataset.workers=key;
    layer.replaceChildren();
    for(const id of active){
     const [x,y,emoji]=workers[id];
     const el=document.createElement('span');el.className='estate-worker';
     el.style.left=x+'%';el.style.top=y+'%';el.textContent=emoji;layer.appendChild(el);
    }
    if(active.length>=2){
     const el=document.createElement('span');el.className='estate-worker walker';
     el.style.left='45%';el.style.top='84%';el.textContent='🚶';layer.appendChild(el);
    }
   }
  }finally{busy=false}
 }
 const observer=new MutationObserver(()=>refresh());
 observer.observe(grid,{childList:true});
 refresh();
})();
