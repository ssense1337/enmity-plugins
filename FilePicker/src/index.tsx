import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { Navigation, React } from 'enmity/metro/common';
import { getByName, getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';

const MediaKeyboardHeader = getByName('MediaKeyboardHeader', { default: false });
import { View } from 'enmity/components';

const WebView = getByName('WebView');
const { addFile } = getByProps('addFiles');

import Settings from './components/Settings';
import { getBoolean as _getBoolean } from 'enmity/api/settings';
const getBoolean = (setting: string, defaults?: boolean) => _getBoolean(manifest.name, setting, defaults);

const Patcher = create('file-picker');

const FilePicker: Plugin = {
   ...manifest,

   onStart() {
      const badMimeTypes = ['application/json', 'video/webm'];
      let channelId = '';
      let ref: { postMessage: (message: string) => void };
      function uuidv4() {
         return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = (Math.random() * 16) | 0,
               v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
         });
      }
      const BaseWebView = ({ isInModal = false }) => React.createElement(WebView, {
         ref: r => r && (ref = r),
         style: { backgroundColor: 'transparent' },
         onLoad: _e => isInModal && ref.postMessage('loaded'),
         onMessage: e => {
            const message = e.nativeEvent.data;
            if (message === 'close') return isInModal ? Navigation.pop() : null;
            const data = JSON.parse(message);
            const [filename, fileSize, mimeType, dataUrl] = data;

            const fileId = uuidv4();
            const file = {
               id: fileId,
               uri: dataUrl,
               mimeType: mimeType.startsWith('video/') || badMimeTypes.includes(mimeType) ? undefined : mimeType,
               width: undefined,
               height: undefined,
               filename,
               playableDuration: undefined,
               platform: 0
            };
            addFile(
               {
                  channelId,
                  file,
                  draftType: 0
               }
            );
         },
         source: {
            html: `<input style="display: none" type="file" multiple />
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
</script>`
         }
      });

      const webViewModal = <BaseWebView isInModal />;
      const webViewZeroWidth = <View style={{ width: 0 }}><BaseWebView /></View>;

      Patcher.after(MediaKeyboardHeader, 'default', (_ctx, [props], res) => {
         channelId = props.currentChannel.id;
         res.props.children[0].props.onPress = () => ref.postMessage('open');
         res.props.children[0].props.onLongPress = () => getBoolean('openModal', true) ? Navigation.push(() => webViewModal) : ref.postMessage('open');
         res.props.children.splice(0, 0, webViewZeroWidth);
      });
   },

   onStop() {
      Patcher.unpatchAll();
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(FilePicker);
