import{s as g}from"./stations.933f52c0.js";import{r as s,d as x,e as w,o as n,f as m,w as y,a as e,t as _,b as v,n as F,_ as B,c as f,F as C,g as S}from"./index.1c201f23.js";const b={class:"ui-mark-title"},V={class:"ui-mark-content"},N=e("div",{class:"ui-mark-content-title"},"Temperatura:",-1),$={class:"ui-mark-content-info"},j=e("div",{class:"ui-mark-content-info-icon fal fa-temperature-sun"},null,-1),D={class:"ui-mark-content"},I=e("div",{class:"ui-mark-content-title"},"Humedad:",-1),T={class:"ui-mark-content-info"},q=e("div",{class:"ui-mark-content-info-icon fal fa-hand-holding-water"},null,-1),z={props:{id:{type:Number,required:!0}},setup(i){const c=i,a=s({}),r=s({}),o=s({}),t=s({}),l=s(),u=s(),p=async()=>{const d=await(await fetch(`https://api.thingspeak.com/channels/${c.id}/feeds.json`)).json();a.value=d.feeds,r.value=d.channel,t.value=a.value[a.value.length-1],o.value.created_at!==t.value.created_at?(o.value=t.value,l.value="green",u.value="white"):(l.value="whitesmoke",u.value="#333")};return x(()=>{setInterval(()=>{p()},2e3)}),(h,d)=>{const k=w("router-link");return n(),m(k,{class:"ui-mark",to:"/sensor/"+i.id,style:F("background:"+l.value+";color:"+u.value)},{default:y(()=>[e("div",b,_(r.value.id),1),e("div",V,[N,e("div",$,[j,v(" "+_(parseFloat(t.value.field1).toFixed(2))+" \xB0C ",1)])]),e("div",D,[I,e("div",T,[q,v(" "+_(parseFloat(t.value.field2).toFixed(2))+" % ",1)])])]),_:1},8,["to","style"])}}};const E={class:"sensors"},H={setup(i){const c=s(g);return(a,r)=>(n(),f("div",E,[(n(!0),f(C,null,S(c.value,(o,t)=>(n(),m(z,{key:t,id:o.id},null,8,["id"]))),128))]))}};var A=B(H,[["__scopeId","data-v-1f7373cd"]]);export{A as default};