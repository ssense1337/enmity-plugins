import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';

import { getByProps } from 'enmity/metro';
import { findInReactTree } from 'enmity/utilities';

const Patcher = create('hide-gift-button');

const ChatInputWrapper = getByProps('ChatInput');

const HideGiftButton: Plugin = {
   ...manifest,

   onStart() {
      Patcher.after(ChatInputWrapper.ChatInput.prototype, 'render', (ctx, [props], res) => {
         const chatInput: any = findInReactTree(res, r => typeof r.props?.hideGiftButton === 'boolean');
         if (!chatInput) return;

         chatInput.props.hideGiftButton = true;
      });
   },

   onStop() {
      Patcher.unpatchAll();
   }
};

registerPlugin(HideGiftButton);
