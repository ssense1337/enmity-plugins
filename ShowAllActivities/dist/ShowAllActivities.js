function s(e){window.enmity.plugins.registerPlugin(e)}function u(e){return window.enmity.patcher.create(e)}var l="ShowAllActivities",c="1.0.0",m="See every status a user has enabled.",d="#64D3FF",p=[{name:"ssense",id:"146080957965795328"}],g={name:l,version:c,description:m,color:d,authors:p};function y(...e){return window.enmity.modules.getByProps(...e)}function v(...e){return window.enmity.modules.getByName(...e)}window.enmity.modules.common;const w=v("ue",{default:!1}),f=y("getStatus","getState"),a=u("show-all-activities"),h={...g,onStart(){a.instead(w,"default",(e,[t],i)=>{const r=f.getActivities(t.user.id).filter(n=>n.type!==4);return r.length<=1?i.apply(e,[t]):r.map((n,o)=>i.apply(e,[{...t,activity:n,stream:o===0?t.stream:null}]))})},onStop(){a.unpatchAll()}};s(h);
