import{A as p,S as k}from"./index.28e1d055.js";import{_ as g,r as o,i as w,o as b,c as x,a as t,k as r,u as h,w as _,p as y,h as S,t as l,b as u}from"./index.ae705c32.js";const a=s=>(y("data-v-2f8d6600"),s=s(),S(),s),F={class:"sensor"},I={class:"left"},V={class:"ui-mark-title"},j={class:"ui-mark-content"},C=a(()=>t("div",{class:"ui-mark-content-title"},"Temperatura:",-1)),D={class:"ui-mark-content-info"},B=a(()=>t("div",{class:"ui-mark-content-info-icon fal fa-temperature-sun"},null,-1)),N={class:"ui-mark-content"},T=a(()=>t("div",{class:"ui-mark-content-title"},"Humedad:",-1)),z={class:"ui-mark-content-info"},A=a(()=>t("div",{class:"ui-mark-content-info-icon fal fa-hand-holding-water"},null,-1)),H={class:"action"},Q=a(()=>t("div",{class:"action--title"},"Descargar :",-1)),q=["href","download"],E=a(()=>t("i",{class:"action--link-icon fat fa-temperature-sun"},null,-1)),J=a(()=>t("div",{class:"action--link-label"},"Temperatura",-1)),K=[E,J],M=["href","download"],O=a(()=>t("i",{class:"action--link-icon fat fa-hand-holding-droplet"},null,-1)),U=a(()=>t("div",{class:"action--link-label"},"Humedad",-1)),$=[O,U],G=["href","download"],L=a(()=>t("i",{class:"action--link-icon fat fa-file-csv"},null,-1)),P=a(()=>t("div",{class:"action--link-label"},"CSV",-1)),R=[L,P],W=["href","download"],X=a(()=>t("i",{class:"action--link-icon fat fa-code"},null,-1)),Y=a(()=>t("div",{class:"action--link-label"},"JSON",-1)),Z=[X,Y],tt={class:"right"},st={class:"temperatura"},at={class:"chart"},et=["src"],ot={class:"humedad"},it={class:"chart"},nt=["src"],ct={props:{id:{type:String,required:!0}},setup(s){const f=s,i=o({}),e=o({}),n=o({}),c=o({}),v=async()=>{const d=await(await fetch(`https://api.thingspeak.com/channels/${f.id}/feeds.json`)).json();i.value=d.feeds,e.value=d.channel,n.value=i.value[i.value.length-1],c.value={lat:parseFloat(e.value.latitude),lng:parseFloat(e.value.longitude)}};return w(()=>{setInterval(()=>{v()},1e3)}),(m,d)=>(b(),x("div",F,[t("div",I,[r(h(p),{"api-key":"AIzaSyAor4_IQ6zbgIQ44djnjKo1EdsFD8CyqfQ",class:"map",center:c.value,zoom:18,disableDefaultUi:"true"},{default:_(()=>[r(h(k),{options:{position:c.value}},{default:_(()=>[t("div",V,l(e.value.name),1),t("div",j,[C,t("div",D,[B,u(" "+l(parseFloat(n.value.field1).toFixed(2))+" \xB0C ",1)])]),t("div",N,[T,t("div",z,[A,u(" "+l(parseFloat(n.value.field2).toFixed(2))+" % ",1)])])]),_:1},8,["options"])]),_:1},8,["center"]),t("div",H,[Q,t("a",{class:"action--link",href:"https://api.thingspeak.com/channels/"+s.id+"/field/1.csv",download:"temperatura"+s.id,target:"_blank"},K,8,q),t("a",{class:"action--link",href:"https://api.thingspeak.com/channels/"+s.id+"/field/2.csv",download:"humedad"+s.id,target:"_blank"},$,8,M),t("a",{class:"action--link",href:"https://api.thingspeak.com/channels/"+s.id+"/feeds.csv",download:"databaseCsv"+s.id,target:"_blank"},R,8,G),t("a",{class:"action--link",href:"https://api.thingspeak.com/channels/"+s.id+"/feeds.json?results=25000",download:"databaseJson"+s.id,target:"_blank"},Z,8,W)])]),t("div",tt,[t("div",st,[t("div",at,[t("iframe",{src:"https://thingspeak.com/channels/"+s.id+"/charts/1?dynamic=true&results=50&title=&type=spline&yaxis=Temperatura&xaxis=Fecha",frameborder:"0"},null,8,et)])]),t("div",ot,[t("div",it,[t("iframe",{src:"https://thingspeak.com/channels/"+s.id+"/charts/2?dynamic=true&results=50&title=&type=spline&yaxis=Humedad&xaxis=Fecha",frameborder:"0"},null,8,nt)])])])]))}};var rt=g(ct,[["__scopeId","data-v-2f8d6600"]]);export{rt as default};
