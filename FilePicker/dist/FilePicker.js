function F(o){window.enmity.plugins.registerPlugin(o)}window.enmity.modules.common.Constants,window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars,window.enmity.modules.common.Native;const i=window.enmity.modules.common.React;window.enmity.modules.common.Dispatcher,window.enmity.modules.common.Storage,window.enmity.modules.common.Toasts,window.enmity.modules.common.Dialog,window.enmity.modules.common.Token,window.enmity.modules.common.REST,window.enmity.modules.common.Settings,window.enmity.modules.common.Users;const d=window.enmity.modules.common.Navigation;window.enmity.modules.common.NavigationNative,window.enmity.modules.common.NavigationStack,window.enmity.modules.common.Theme,window.enmity.modules.common.Linking,window.enmity.modules.common.StyleSheet,window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components,window.enmity.modules.common.Locale,window.enmity.modules.common.Profiles,window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes;function v(...o){return window.enmity.modules.getByProps(...o)}function c(...o){return window.enmity.modules.getByName(...o)}window.enmity.modules.common;function S(o){return window.enmity.patcher.create(o)}var b="FilePicker",T="1.0.0",M="Wow File Picker on Discord iOS.",C="#64D3FF",L=[{name:"ssense",id:"146080957965795328"}],w={name:b,version:T,description:M,color:C,authors:L};const{components:e}=window.enmity;e.Alert,e.Button,e.FlatList,e.Image,e.ImageBackground,e.KeyboardAvoidingView,e.Modal,e.Pressable,e.RefreshControl,e.ScrollView,e.SectionList,e.StatusBar,e.StyleSheet,e.Switch,e.Text,e.TextInput,e.TouchableHighlight,e.TouchableOpacity,e.TouchableWithoutFeedback,e.Touchable;const I=e.View;e.VirtualizedList,e.Form,e.FormArrow,e.FormCTA,e.FormCTAButton,e.FormCardSection,e.FormCheckbox,e.FormDivider,e.FormHint,e.FormIcon,e.FormInput,e.FormLabel,e.FormRadio;const B=e.FormRow;e.FormSection,e.FormSelect,e.FormSubLabel;const E=e.FormSwitch;e.FormTernaryCheckBox,e.FormText,e.FormTextColors,e.FormTextSizes;var N=({settings:o})=>i.createElement(B,{label:"Open modal on Long Press (temp fix for search)",trailing:i.createElement(E,{value:o.getBoolean("openModal",!0),onValueChange:()=>o.toggle("openModal",!0)})});function P(o,t,r){return window.enmity.settings.getBoolean(o,t,r)}const k=c("MediaKeyboardHeader",{default:!1}),R=c("WebView"),{addFile:V}=v("addFiles"),A=(o,t)=>P(w.name,o,t),u=S("file-picker"),D={...w,onStart(){let o="",t;function r(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,s=>{const n=Math.random()*16|0;return(s=="x"?n:n&3|8).toString(16)})}const a=({isInModal:s=!1})=>i.createElement(R,{ref:n=>n&&(t=n),style:{backgroundColor:"transparent"},onLoad:n=>s&&t.postMessage("loaded"),onMessage:n=>{const m=n.nativeEvent.data;if(m==="close")return s?d.pop():null;const g=JSON.parse(m),[x,W,l,h]=g,f={id:r(),uri:h,mimeType:l==="application/json"?void 0:l,width:void 0,height:void 0,filename:x,playableDuration:void 0,platform:0};V({channelId:o,file:f,draftType:0})},source:{html:`<input style="display: none" type="file" multiple />
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
<\/script>`}}),p=i.createElement(a,{isInModal:!0}),y=i.createElement(I,{style:{width:0}},i.createElement(a,null));u.after(k,"default",(s,[n],m)=>{o=n.currentChannel.id,m.props.children[0].props.onPress=()=>t.postMessage("open"),m.props.children[0].props.onLongPress=()=>A("openModal",!0)?d.push(()=>p):t.postMessage("open"),m.props.children.splice(0,0,y)})},onStop(){u.unpatchAll()},getSettingsPanel({settings:o}){return i.createElement(N,{settings:o})}};F(D);
