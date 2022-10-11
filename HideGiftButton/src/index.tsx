import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';

import { React } from 'enmity/metro/common';
import Settings from './components/Settings';

import { View } from 'enmity/components';
import { findInReactTree } from 'enmity/utilities';
import { getIDByName } from 'enmity/api/assets';

const Patcher = create('hide-gift-button');

// /assets/modules/chat_input/native/images/ic_gift.png
const ic_gift = getIDByName('ic_add_24px') + 2; // 662
const animVal = { value: 1 };

import { getBoolean as _getBoolean } from 'enmity/api/settings';
const getBoolean = (setting: string, defaults?: boolean) => _getBoolean(manifest.name, setting, defaults);

const HideGiftButton: Plugin = {
   ...manifest,

   onStart() {
      const unpatchView = Patcher.after(View, 'render', (ctx, [props], res) => {
         const chatInput: any = findInReactTree(res, r => Array.isArray(r?.props?.actions));
         if (!chatInput) return;

         Patcher.after(chatInput.type, 'render', (ctx, [props], res) => {
            if (props.isChatInputPolishEnabled) return;
            const [leftBtnsContainer, textInput, sendBtn] = res.props.children;

            if (getBoolean('hide-gift', true)) {
               const leftBtns = leftBtnsContainer?.props?.children;
               if (!Array.isArray(leftBtns)) return;

               const [actionsBtns, moreBtn] = leftBtns;

               // Hide More Button
               actionsBtns.props.animation = animVal;
               actionsBtns.props.animateShowingActionButtons = true;
               moreBtn.props.animation = animVal;

               const actions = actionsBtns.props.actions;
               const index = actions.findIndex(x => x.source === ic_gift);
               if (index === -1) return;

               actions.splice(index, 1);
            }

            if (getBoolean('always-show-send', true)) {
               sendBtn.props.animation = animVal;
            }
         });
         unpatchView();
      });
   },

   onStop() {
      Patcher.unpatchAll();
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(HideGiftButton);
