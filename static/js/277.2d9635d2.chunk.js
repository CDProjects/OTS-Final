"use strict";(self.webpackChunkots_final=self.webpackChunkots_final||[]).push([[277],{6736:(e,s,t)=>{t.r(s),t.d(s,{default:()=>l});var a=t(5043),r=t(579);class c extends a.Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,s){console.log("Error caught by ErrorBoundary:",e,s)}render(){return this.state.hasError?(0,r.jsx)("h1",{children:"Something went wrong. Please try again later."}):this.props.children}}const n=c,i=t.p+"static/media/HRC Shamrocks 2024.1536471d9d33a0618fcb.jpg",o=()=>{const[e,s]=(0,a.useState)(""),[t,c]=(0,a.useState)(!0),[o,l]=(0,a.useState)(null);(0,a.useEffect)((()=>{fetch("/competitionTable.html").then((e=>e.text())).then((e=>{const t=(new DOMParser).parseFromString(e,"text/html");t.querySelectorAll("td:nth-child(2)").forEach((e=>{const s=e.querySelector("img"),t=e.textContent.trim();e.innerHTML='\n            <div class="team-info">\n              '.concat(s?s.outerHTML:"","\n              <span>").concat(t,"</span>\n            </div>\n          ")})),s(t.body.innerHTML),c(!1)})).catch((e=>{l(e),c(!1)}))}),[]);return(0,r.jsx)(n,{children:(0,r.jsxs)("section",{id:"fixtures-section",className:"fixtures-section",children:[(0,r.jsx)("div",{id:"fixtures-marker"}),(0,r.jsx)("div",{className:"content-container",children:(0,r.jsx)("h1",{className:"section-title",children:"RESULTS & FIXTURES"})}),t&&(0,r.jsx)("p",{children:"Loading competition table..."}),o&&(0,r.jsxs)("p",{children:["Error loading competition table: ",o.message]}),e&&(0,r.jsx)("div",{className:"competition-table-wrapper",children:(0,r.jsx)("div",{className:"competition-table",dangerouslySetInnerHTML:{__html:e}})}),(0,r.jsxs)("picture",{children:[(0,r.jsx)("source",{srcSet:i.replace(".jpg",".webp"),type:"image/webp"}),(0,r.jsx)("img",{src:i,alt:"3rd game 13th July 2024",className:"fixtures-picture"})]}),(0,r.jsxs)("div",{className:"content-container",children:[(0,r.jsx)("h2",{className:"fixtures-subtitle",children:"2024 Championship"}),(0,r.jsx)("h3",{className:"fixtures-subtitle",children:"OTS FIXTURES & RESULTS"}),[{date:"1.6",teams:"SHAMROCKS - TAMPERE",score:"26 - 14"},{date:"15.6",teams:"SHAMROCKS - WARRIORS",score:"21 - 38"},{date:"29.6",teams:"SHAMROCKS - EAGLES",score:"41 - 14"},{date:"13.7",teams:"SHAMROCKS - HELSINKI",score:"26 - 12"},{date:"20.7",teams:"HELSINKI - SHAMROCKS",score:"00 - 00"},{date:"3.8",teams:"WARRIORS - SHAMROCKS",score:"00 - 00"},{date:"17.8",teams:"TAMPERE - SHAMROCKS",score:"00 - 00"},{date:"24.8",teams:"KALEV - SHAMROCKS",score:"00 - 00"},{date:"31.8",teams:"EAGLES - SHAMROCKS",score:"00 - 00"},{date:"14.9",teams:"SHAMROCKS - KALEV",score:"00 - 00"},{date:"21.9",teams:"SEMI FINAL",score:"TBD"},{date:"28.9",teams:"CHAMPIONSHIP FINAL",score:"TBD"}].map(((e,s)=>(0,r.jsxs)("p",{className:"fixtures-text",children:[(0,r.jsx)("span",{className:"date",children:e.date}),(0,r.jsx)("span",{className:"teams",children:e.teams}),(0,r.jsxs)("span",{className:"score",children:[(0,r.jsx)("b",{children:e.score}),(0,r.jsx)("br",{})]})]},s)))]})]})})},l=a.memo(o)}}]);
//# sourceMappingURL=277.2d9635d2.chunk.js.map