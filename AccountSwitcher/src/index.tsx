import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { getByName } from 'enmity/metro';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';

import { findInReactTree } from 'enmity/utilities';
import { Navigation, React, Token } from 'enmity/metro/common';
import { View } from 'enmity/components';

const Welcome = getByName('Welcome', { default: false });
import { DiscordButton } from './utils';
import SettingsScreens from './components/SettingsScreens';

import patchLogout from './patchLogoutButton';

const Patcher = create('account-switcher');

const AccountSwitcher: Plugin = {
   ...manifest,

   onStart() {
      patchLogout(Patcher);

      const accSwBtn = <DiscordButton
         onPress={() => Navigation.push(SettingsScreens, {
            name: this.name
         })}
         style={{ marginBottom: 0, backgroundColor: '#64d3ff' }}
         text='Account Switcher'
      />;
      Patcher.after(Welcome, 'default', (_ctx, _args, res) => {
         const buttons: any = findInReactTree(res, r => r?.children?.[0]?.type?.name === 'Button');
         if (!buttons) return;

         const lastIdxStyle = buttons.children[buttons.children.length - 1].props.style;
         buttons.children[buttons.children.length - 1].props.style = [...Array.isArray(lastIdxStyle) ? lastIdxStyle : [lastIdxStyle], { marginBottom: 12 }];
         buttons.children.push(
            accSwBtn
         );
      });

      if (Boolean(Token.getToken())) return;

      const unpatchView = Patcher.before(View, 'render', (_ctx, [props], _res) => {
         const welcomeView: any = findInReactTree(props, r => r?.type?.name === 'Welcome');
         if (!welcomeView) return;

         welcomeView.type = Welcome.default;
         unpatchView();
      });
   },

   onStop() {
      Patcher.unpatchAll();
   },

   getSettingsPanel({ settings }) {
      return <View onLayout={() => {
         Navigation.pop();
         Navigation.push(SettingsScreens, {
            name: manifest.name
         });
      }} />;
   }
};

registerPlugin(AccountSwitcher);
