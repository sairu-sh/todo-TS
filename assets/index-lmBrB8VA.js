var q=Object.defineProperty;var H=(t,e,s)=>e in t?q(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var r=(t,e,s)=>(H(t,typeof e!="symbol"?e+"":e,s),s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function s(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(n){if(n.ep)return;n.ep=!0;const c=s(n);fetch(n.href,c)}})();const M="1234567890",R="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",j=10;function K(){const t=R+M;let e="";for(let s=0;s<j;s++)e+=t[Math.floor(Math.random()*t.length)];return e}let A=[];class Y{constructor(e,s=""){r(this,"id");r(this,"title");r(this,"description");r(this,"isCompleted");for(;;){const i=K();if(!A.includes(i)){this.id=i;break}}A.push(this.id),this.title=e,this.description=s,this.isCompleted=!1}toggleCompleted(){return this.isCompleted=!this.isCompleted,this.isCompleted}}class g{constructor(e){r(this,"list");this.list=e||[]}addToList(e){this.list.push(e)}removeFromList(e){const s=this.list.findIndex(i=>i.id===e);s!==-1&&this.list.splice(s,1)}getTaskById(e){return this.list.find(s=>s.id===e)||null}}const y=document.getElementById("search-word"),E=document.getElementById("task-list"),o=document.getElementById("new-task-controls"),I=document.getElementById("task-adder"),k=document.getElementById("task-title-modal"),B=document.getElementById("task-description"),b=document.getElementById("task-adder-modal"),l=document.getElementById("overlay"),a=document.getElementById("modal"),C=document.getElementById("expander"),z=document.getElementById("cancel-btn"),m=document.getElementById("home"),u=document.getElementById("completed"),p=document.getElementById("remaining");function G(){m.classList.remove("active"),p.classList.remove("active"),u.classList.remove("active")}function T(t,e){G(),t.classList.add("active"),S=e,F("")}function O(){l==null||l.classList.add("hidden"),a==null||a.classList.add("hidden")}function J(){l==null||l.classList.remove("hidden"),a==null||a.classList.remove("hidden")}m==null||m.addEventListener("click",()=>T(m,"task"));u==null||u.addEventListener("click",()=>T(u,"completed"));p==null||p.addEventListener("click",()=>T(p,"remaining"));C==null||C.addEventListener("click",J);l.addEventListener("click",O);z.addEventListener("click",O);const h=new g,w=new g,L=new g;let S="task",f=h;function Q(){switch(S){case"completed":f=w;break;case"remaining":f=L;break;default:f=h;break}}function F(t=""){Q();const e=f.list.filter(i=>i.title.includes(t)),s=new g(e);P(s)}y==null||y.addEventListener("input",t=>{const e=t.target.value;F(e)});F("");function U(t,e=""){const s=new Y(t,e);h.addToList(s),L.addToList(s)}function V(t){w.addToList(t),L.removeFromList(t.id)}function W(t){w.removeFromList(t.id),L.addToList(t)}function X(t){const e=h.getTaskById(t);e&&((e==null?void 0:e.toggleCompleted())?V(e):W(e)),P(f)}function P(t){const e=E==null?void 0:E.querySelector(".container");if(e&&(e.innerHTML=""),t.list.length>0)t.list.forEach(s=>{const i=document.createElement("div");i.classList.add("task--item"),e==null||e.appendChild(i);const n=document.createElement("p");n.classList.add("task--title"),n.textContent=s.title;const c=document.createElement("p");c.classList.add("task--description"),c.textContent=s.description;const d=document.createElement("input");d.setAttribute("type","checkbox"),d.checked=s.isCompleted,d.addEventListener("change",x=>{if(X(s.id),x.target){const v=x.target.closest(".task--item");v&&(v.classList.remove("completed"),s.isCompleted&&v.classList.add("completed"))}}),i.appendChild(n),i.appendChild(c),i.appendChild(d)});else{const s=`<div class="empty">
                          <img src="/assets/images/bullets.svg" alt="" />
                            <p>You don't have any tasks</p>
                      </div>`;e.insertAdjacentHTML("afterbegin",s)}}function N(t="control"){let e,s;t==="control"?(e=o==null?void 0:o.value,s=""):t==="modal"&&(e=k==null?void 0:k.value,s=B==null?void 0:B.value),e&&(U(e,s),P(h),o.value="",O())}I==null||I.addEventListener("click",()=>N());o==null||o.addEventListener("keydown",t=>{t.key==="Enter"&&N()});b==null||b.addEventListener("click",()=>N("modal"));
