function f(o){window.enmity.plugins.registerPlugin(o)}window.enmity.modules.common.Constants,window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars,window.enmity.modules.common.Native;const i=window.enmity.modules.common.React;window.enmity.modules.common.Dispatcher,window.enmity.modules.common.Storage,window.enmity.modules.common.Toasts,window.enmity.modules.common.Dialog,window.enmity.modules.common.Token,window.enmity.modules.common.REST,window.enmity.modules.common.Settings,window.enmity.modules.common.Users;const d=window.enmity.modules.common.Navigation;window.enmity.modules.common.NavigationNative,window.enmity.modules.common.NavigationStack,window.enmity.modules.common.Theme,window.enmity.modules.common.Linking,window.enmity.modules.common.StyleSheet,window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components,window.enmity.modules.common.Locale,window.enmity.modules.common.Profiles,window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes;function F(...o){return window.enmity.modules.getByProps(...o)}function l(...o){return window.enmity.modules.getByName(...o)}window.enmity.modules.common;function v(o){return window.enmity.patcher.create(o)}var S="FilePicker",b="1.0.0",T="Wow File Picker on Discord iOS.",M="#64D3FF",C=[{name:"ssense",id:"146080957965795328"}],c={name:S,version:b,description:T,color:M,authors:C};const{components:e}=window.enmity;e.Alert,e.Button,e.FlatList,e.Image,e.ImageBackground,e.KeyboardAvoidingView,e.Modal,e.Pressable,e.RefreshControl,e.ScrollView,e.SectionList,e.StatusBar,e.StyleSheet,e.Switch,e.Text,e.TextInput,e.TouchableHighlight,e.TouchableOpacity,e.TouchableWithoutFeedback,e.Touchable;const L=e.View;e.VirtualizedList,e.Form,e.FormArrow,e.FormCTA,e.FormCTAButton,e.FormCardSection,e.FormCheckbox,e.FormDivider,e.FormHint,e.FormIcon,e.FormInput,e.FormLabel,e.FormRadio;const N=e.FormRow;e.FormSection,e.FormSelect,e.FormSubLabel;const B=e.FormSwitch;e.FormTernaryCheckBox,e.FormText,e.FormTextColors,e.FormTextSizes;var E=({settings:o})=>i.createElement(N,{label:"Open modal on Long Press (temp fix for search)",trailing:i.createElement(B,{value:o.getBoolean("openModal",!0),onValueChange:()=>o.toggle("openModal",!0)})});function I(o,t,a){return window.enmity.settings.getBoolean(o,t,a)}const P=l("MediaKeyboardHeader",{default:!1}),k=l("WebView"),{addFile:R}=F("addFiles"),V=(o,t)=>I(c.name,o,t),w=v("file-picker"),A={...c,onStart(){let o="",t;function a(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,m=>{const n=Math.random()*16|0;return(m=="x"?n:n&3|8).toString(16)})}const r=({isInModal:m=!1})=>i.createElement(k,{ref:n=>n&&(t=n),style:{backgroundColor:"transparent"},onLoad:n=>m&&t.postMessage("loaded"),onMessage:n=>{if(m&&n.nativeEvent.data==="close")return d.pop();const s=JSON.parse(n.nativeEvent.data),[p,D,g,x]=s,h={id:a(),uri:x,mimeType:g,width:void 0,height:void 0,filename:p,playableDuration:void 0,platform:0};R({channelId:o,file:h,draftType:0})},source:{html:`<input style="display: none" type="file" multiple />
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
<\/script>`}}),u=i.createElement(r,{isInModal:!0}),y=i.createElement(L,{style:{width:0}},i.createElement(r,null));w.after(P,"default",(m,[n],s)=>{o=n.currentChannel.id,s.props.children[0].props.onPress=()=>t.postMessage("open"),s.props.children[0].props.onLongPress=()=>V("openModal",!0)?d.push(()=>u):t.postMessage("open"),s.props.children.splice(0,0,y)})},onStop(){w.unpatchAll()},getSettingsPanel({settings:o}){return i.createElement(E,{settings:o})}};f(A);
