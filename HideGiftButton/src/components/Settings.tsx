import { FormRow, FormSwitch } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';

interface SettingsProps {
  settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
  return <>
    <FormRow
      label="Always show send button"
      trailing={
        <FormSwitch
          value={settings.getBoolean("always-show-send", true)}
          onValueChange={() => settings.toggle("always-show-send", true)}
        />
      }
    />
    <FormRow
      label="Hide gift button"
      trailing={
        <FormSwitch
          value={settings.getBoolean("hide-gift", true)}
          onValueChange={() => settings.toggle("hide-gift", true)}
        />
      }
    />
  </>;
};
