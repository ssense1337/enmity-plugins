import { FormRow, FormSwitch } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';

interface SettingsProps {
   settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
   return <FormRow
      label='Open modal on Long Press (temp fix for search)'
      trailing={
         <FormSwitch
            value={settings.getBoolean('openModal', true)}
            onValueChange={() => settings.toggle('openModal', true)}
         />
      }
   />;
};