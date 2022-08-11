import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { findInReactTree } from 'enmity/utilities';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';

import { View } from 'enmity/components';

const Patcher = create('dashless');

const dashRegExp = new RegExp('-', 'g');

const Dashless: Plugin = {
   ...manifest,

   onStart() {
      const unpatchView = Patcher.after(View, 'render', (_ctx, _args, res) => {
         const textChannel: any = findInReactTree(res, r => r?.props?.channel?.name && r?.props?.hasOwnProperty?.('isRulesChannel'));
         if (!textChannel) return;

         Patcher.after(textChannel.type, 'type', (_ctx, _args, res) => {
            const textChannelName: any = findInReactTree(res, r => typeof r?.children === 'string');
            if (!textChannelName) return;

            textChannelName.children = textChannelName.children.replace(dashRegExp, ' ');
            return res;
         });
         unpatchView();
      });
   },

   onStop() {
      Patcher.unpatchAll();
   }
};

registerPlugin(Dashless);
