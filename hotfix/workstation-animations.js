/* TDGT work-at-station animations — independent prototype module.
 * Mount only after worker/station game logic is available.
 * Sprites should be hosted at assets/workstation/{frame}.png.
 * Does not alter saves, resource production, or worker assignment.
 */
(function(global){
'use strict';
const jobs={
 khi_phuong:{frames:['forge_rest','forge_raise','forge_hit','forge_rest'],durations:[550,260,170,550]},
 linh_mo:{frames:['mine'],durations:[1200]},
 linh_dien:{frames:['garden'],durations:[1200]},
 dan_cac:{frames:['alchemy'],durations:[1200]},
 tang_kinh:{frames:[],durations:[]},
 to_son:{frames:[],durations:[]}
};
const active=new Set();
let frameId=0;
function render(now){
 for(const worker of active){
  if(!worker.node.isConnected){active.delete(worker);continue;}
  if(now<worker.next)continue;
  const job=jobs[worker.job];
  if(!job.frames.length)continue;
  worker.index=(worker.index+1)%job.frames.length;
  worker.image.src=worker.base+job.frames[worker.index]+'.png';
  worker.next=now+job.durations[worker.index];
 }
 frameId=active.size?requestAnimationFrame(render):0;
}
function mount(node,jobId,opts={}){
 if(typeof node==='string')node=document.querySelector(node);
 if(!node)throw new Error('Missing workstation element');
 if(!Object.prototype.hasOwnProperty.call(jobs,jobId))throw new Error('Unknown job '+jobId);
 const job=jobs[jobId],base=opts.assetBase||'assets/workstation/';
 const image=document.createElement('img');
 image.alt=jobId;
 image.style.cssText='display:block;width:100%;height:100%;object-fit:contain;object-position:center bottom;pointer-events:none';
 if(job.frames.length)image.src=base+job.frames[0]+'.png';
 else image.style.visibility='hidden';
 node.appendChild(image);
 const worker={node,image,job:jobId,index:0,next:performance.now()+(job.durations[0]||1000),base};
 active.add(worker);
 if(!frameId)frameId=requestAnimationFrame(render);
 return ()=>{active.delete(worker);image.remove();};
}
global.TDGT_Workstations={jobs,mount,unmountAll(){for(const worker of active)worker.image.remove();active.clear();}};
})(window);
