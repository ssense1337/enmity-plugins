import { getByName } from 'enmity/metro';
import { Locale, Scenes } from 'enmity/metro/common';
import { findInReactTree } from 'enmity/utilities';
import { connectComponent } from 'enmity/api/settings';
import * as SettingsScreens from './components/SettingsScreens';
import { Patcher } from 'enmity/patcher';

import manifest from '../manifest.json';

export default function (Patcher: Patcher): void {
  patchScreens(Patcher);
  patchSettings(Patcher);
}

function patchScreens(Patcher: Patcher) {
  Patcher.after(Scenes, 'default', (_, _args, res) => {
    return {
      ...res,
      AccountSwitcherMain: {
        key: 'AccountSwitcherMain',
        title: 'Account Switcher',
        render: connectComponent(SettingsScreens.MainScreen, manifest.name),
        headerRight: SettingsScreens.HeaderRight
      },
      AccountSwitcherAddAccount: {
        key: 'AccountSwitcherAddAccount',
        title: 'Add Account',
        render: connectComponent(SettingsScreens.AddAccount, manifest.name)
      },
      AccountSwitcherEditAccount: {
        key: 'AccountSwitcherEditAccount',
        title: 'Edit Account',
        render: connectComponent(SettingsScreens.EditAccount, manifest.name)
      }
    };
  });
}

function patchSettings(Patcher: Patcher) {
  const Settings = getByName('UserSettingsOverviewWrapper', { default: false });

  const unpatch = Patcher.after(Settings, 'default', (_, __, ret) => {
    const Overview = findInReactTree(ret, m => m.type?.name === 'UserSettingsOverview');

    Patcher.after(Overview.type.prototype, 'render', ({ props: { navigation } }, __, res) => {
      const { children } = res.props;

      const index = children.findIndex(x => Locale.Messages['LOGOUT'] === x.props.label);
      children[index].props.label = 'Account Switcher';
      children[index].props.onPress = () => {
        navigation.navigate('AccountSwitcherMain');
      };
    });

    unpatch();
  });
}
