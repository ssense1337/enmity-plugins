function v(o){window.enmity.plugins.registerPlugin(o)}window.enmity.modules.common.Constants,window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars,window.enmity.modules.common.Native;const t=window.enmity.modules.common.React;window.enmity.modules.common.Dispatcher,window.enmity.modules.common.Storage,window.enmity.modules.common.Toasts,window.enmity.modules.common.Dialog,window.enmity.modules.common.Token,window.enmity.modules.common.REST,window.enmity.modules.common.Settings,window.enmity.modules.common.Users;const d=window.enmity.modules.common.Navigation;window.enmity.modules.common.NavigationNative,window.enmity.modules.common.NavigationStack,window.enmity.modules.common.Theme,window.enmity.modules.common.Linking,window.enmity.modules.common.StyleSheet,window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components,window.enmity.modules.common.Locale,window.enmity.modules.common.Profiles,window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes;function S(...o){return window.enmity.modules.getByProps(...o)}function c(...o){return window.enmity.modules.getByName(...o)}window.enmity.modules.common;function b(o){return window.enmity.patcher.create(o)}var T="FilePicker",M="1.0.0",L="Wow File Picker on Discord iOS.",C="#64D3FF",I=[{name:"ssense",id:"146080957965795328"}],w={name:T,version:M,description:L,color:C,authors:I};const{components:e}=window.enmity;e.Alert,e.Button,e.FlatList,e.Image,e.ImageBackground,e.KeyboardAvoidingView,e.Modal,e.Pressable,e.RefreshControl,e.ScrollView,e.SectionList,e.StatusBar,e.StyleSheet,e.Switch,e.Text,e.TextInput,e.TouchableHighlight,e.TouchableOpacity,e.TouchableWithoutFeedback,e.Touchable;const N=e.View;e.VirtualizedList,e.Form,e.FormArrow,e.FormCTA,e.FormCTAButton,e.FormCardSection,e.FormCheckbox,e.FormDivider,e.FormHint,e.FormIcon,e.FormInput,e.FormLabel,e.FormRadio;const B=e.FormRow;e.FormSection,e.FormSelect,e.FormSubLabel;const E=e.FormSwitch;e.FormTernaryCheckBox,e.FormText,e.FormTextColors,e.FormTextSizes;var k=({settings:o})=>t.createElement(B,{label:"Open modal on Long Press (temp fix for search)",trailing:t.createElement(E,{value:o.getBoolean("openModal",!0),onValueChange:()=>o.toggle("openModal",!0)})});function P(o,i,m){return window.enmity.settings.getBoolean(o,i,m)}const R=c("MediaKeyboardHeader",{default:!1}),V=c("WebView"),{addFile:A}=S("addFiles"),D=(o,i)=>P(w.name,o,i),u=b("file-picker"),W={...w,onStart(){const o=["application/json","video/webm"];let i="",m;function y(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,r=>{const n=Math.random()*16|0;return(r=="x"?n:n&3|8).toString(16)})}const a=({isInModal:r=!1})=>t.createElement(V,{ref:n=>n&&(m=n),style:{backgroundColor:"transparent"},onLoad:n=>r&&m.postMessage("loaded"),onMessage:n=>{const s=n.nativeEvent.data;if(s==="close")return r?d.pop():null;const x=JSON.parse(s),[h,O,l,f]=x,F={id:y(),uri:f,mimeType:o.includes(l)?void 0:l,width:void 0,height:void 0,filename:h,playableDuration:void 0,platform:0};A({channelId:i,file:F,draftType:0})},source:{html:`<input style="display: none" type="file" multiple />
<script>
  window.addEventListener('touchstart', e => {
    window.ReactNativeWebView.postMessage('close');
  });

  const fileInput = document.querySelector('input');
  window.addEventListener("message", message => {
    fileInput.click();
  });

  fileInput.onchange = async (e) => {
    const files = e.target.files;
    const lastIdx = files.length - 1;

    Array.from(files).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        window.ReactNativeWebView.postMessage(JSON.stringify([file.name, file.size, file.type, reader.result]));
        if (lastIdx === idx) window.ReactNativeWebView.postMessage('close');
      };
      reader.readAsDataURL(file);
    });
  };
<\/script>`}}),p=t.createElement(a,{isInModal:!0}),g=t.createElement(N,{style:{width:0}},t.createElement(a,null));u.after(R,"default",(r,[n],s)=>{i=n.currentChannel.id,s.props.children[0].props.onPress=()=>m.postMessage("open"),s.props.children[0].props.onLongPress=()=>D("openModal",!0)?d.push(()=>p):m.postMessage("open"),s.props.children.splice(0,0,g)})},onStop(){u.unpatchAll()},getSettingsPanel({settings:o}){return t.createElement(k,{settings:o})}};v(W);
