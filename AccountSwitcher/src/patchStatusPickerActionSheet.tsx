import { Locale, Navigation, React } from 'enmity/metro/common';
import SettingsScreens from './components/SettingsScreens';
import { Patcher } from 'enmity/patcher';

import manifest from '../manifest.json';
import { FormRow } from 'enmity/components';
import { Icons, LazyActionSheet } from './utils';

export default function (Patcher: Patcher): void {
  const unpatch = Patcher.before(LazyActionSheet, 'openLazy', ({ hideActionSheet }, [component, sheet]) => {
    if (sheet !== 'StatusPicker') return;

    component.then(instance => {
      Patcher.after(instance, 'default', (_, __, res) => {
        const children = res.props.children[1].props.children.props.children;
        children.push({
          ...children[0], props: {
            children: <FormRow
              leading={<FormRow.Icon source={Icons.Sort} />}
              label={Locale.Messages['SWITCH_ACCOUNTS_MENU_ITEM_TITLE']}
              trailing={FormRow.Arrow}
              onPress={() => {
                hideActionSheet();
                Navigation.push(SettingsScreens, {
                  name: manifest.name
                });
              }} />
          }
        });
      });

      unpatch();
    });
  });
}
