function o(e){window.enmity.plugins.registerPlugin(e)}var t="FilePicker",s="1.5.0",c="Wow File Picker on Discord iOS.",u="#64D3FF",a=[{name:"ssense",id:"146080957965795328"}],p={name:t,version:s,description:c,color:u,authors:a};function m(...e){return window.enmity.modules.getByProps(...e)}window.enmity.modules.common;function d(e){return window.enmity.patcher.create(e)}const{ExperimentStore:l}=m("useAndTrackExposureToUserExperiment"),n=d("file-picker"),v={...p,onStart(){n.after(l,"getUserExperimentDescriptor",(e,[i],r)=>{if(!(i!=="2022-10_context_menu_and_new_media_picker"||(r==null?void 0:r.bucket)))return{type:"user",revision:1,population:0,bucket:1,override:!0}})},onStop(){n.unpatchAll()}};o(v);
