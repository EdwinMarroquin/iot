import{A as p,S as k}from"./index.bb7d4635.js";import{_ as g,r as o,d as y,o as w,c as b,a as e,t as n,h as r,u as h,w as _,p as x,i as S,b as u}from"./index.1c201f23.js";const s=t=>(x("data-v-e43cfc6e"),t=t(),S(),t),F={class:"sensor"},I={class:"left"},V={class:"ui-mark-title"},j={class:"ui-mark-content"},C=s(()=>e("div",{class:"ui-mark-content-title"},"Temperatura:",-1)),B={class:"ui-mark-content-info"},D=s(()=>e("div",{class:"ui-mark-content-info-icon fal fa-temperature-sun"},null,-1)),N={class:"ui-mark-content"},T=s(()=>e("div",{class:"ui-mark-content-title"},"Humedad:",-1)),z={class:"ui-mark-content-info"},A=s(()=>e("div",{class:"ui-mark-content-info-icon fal fa-hand-holding-water"},null,-1)),H={class:"action"},Q=s(()=>e("div",{class:"action--title"},"Descargar datos:",-1)),q=["href","download"],E=s(()=>e("i",{style:{color:"seagreen"},class:"action--link-icon fal fa-temperature-sun"},null,-1)),J=s(()=>e("div",{class:"action--link-label"},"Temperatura",-1)),K=[E,J],M=["href","download"],O=s(()=>e("i",{style:{color:"seagreen"},class:"action--link-icon fal fa-hand-holding-droplet"},null,-1)),$=s(()=>e("div",{class:"action--link-label"},"Humedad",-1)),G=[O,$],L=["href","download"],P=s(()=>e("i",{style:{color:"seagreen"},class:"action--link-icon fal fa-file-csv"},null,-1)),R=s(()=>e("div",{class:"action--link-label"},"CSV",-1)),U=[P,R],W=["href","download"],X=s(()=>e("i",{style:{color:"seagreen"},class:"action--link-icon fal fa-code"},null,-1)),Y=s(()=>e("div",{class:"action--link-label"},"JSON",-1)),Z=[X,Y],ee={class:"right"},te={class:"temperatura"},se={class:"chart"},ae=["src"],oe={class:"humedad"},ne={class:"chart"},ie=["src"],ce={props:{id:{type:String,required:!0}},setup(t){const f=t,i=o({}),a=o({}),c=o({}),l=o({}),v=async()=>{const d=await(await fetch(`https://api.thingspeak.com/channels/${f.id}/feeds.json`)).json();i.value=d.feeds,a.value=d.channel,c.value=i.value[i.value.length-1],l.value={lat:parseFloat(a.value.latitude),lng:parseFloat(a.value.longitude)}};return y(()=>{setInterval(()=>{v()},1e3)}),(m,d)=>(w(),b("div",F,[e("div",I,[e("h1",null,n(a.value.name),1),r(h(p),{"api-key":"AIzaSyAor4_IQ6zbgIQ44djnjKo1EdsFD8CyqfQ",class:"map",center:l.value,zoom:18},{default:_(()=>[r(h(k),{options:{position:l.value}},{default:_(()=>[e("div",V,n(a.value.id),1),e("div",j,[C,e("div",B,[D,u(" "+n(parseFloat(c.value.field1).toFixed(2))+" \xB0C ",1)])]),e("div",N,[T,e("div",z,[A,u(" "+n(parseFloat(c.value.field2).toFixed(2))+" % ",1)])])]),_:1},8,["options"])]),_:1},8,["center"]),e("div",H,[Q,e("a",{class:"action--link",href:"https://api.thingspeak.com/channels/"+t.id+"/field/1.csv",download:"temperatura"+t.id,target:"_blank"},K,8,q),e("a",{class:"action--link",href:"https://api.thingspeak.com/channels/"+t.id+"/field/2.csv",download:"humedad"+t.id,target:"_blank"},G,8,M),e("a",{class:"action--link",href:"https://api.thingspeak.com/channels/"+t.id+"/feeds.csv",download:"databaseCsv"+t.id,target:"_blank"},U,8,L),e("a",{class:"action--link",href:"https://api.thingspeak.com/channels/"+t.id+"/feeds.json",download:"databaseJson"+t.id,target:"_blank"},Z,8,W)])]),e("div",ee,[e("div",te,[e("div",se,[e("iframe",{src:"https://thingspeak.com/channels/"+t.id+"/charts/1?dynamic=true&results=25&title=&type=spline&yaxis=Temperatura&xaxis=Fecha",frameborder:"0"},null,8,ae)])]),e("div",oe,[e("div",ne,[e("iframe",{src:"https://thingspeak.com/channels/"+t.id+"/charts/2?dynamic=true&results=25&title=&type=spline&yaxis=Humedad&xaxis=Fecha",frameborder:"0"},null,8,ie)])])])]))}};var re=g(ce,[["__scopeId","data-v-e43cfc6e"]]);export{re as default};