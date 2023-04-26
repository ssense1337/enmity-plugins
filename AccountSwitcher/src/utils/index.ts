import { getByName, getByProps, getModule } from 'enmity/metro';
import { Dialog, Locale, Token } from 'enmity/metro/common';
import { Alert } from 'enmity/components';
import { getIDByName } from 'enmity/api/assets';

export const AccountUtils = getByProps('loginToken');

export const { default: DiscordButton } = getModule(m => m?.ButtonColors);

export const formatUser = (user: any) => (
  !user.id ? {} : { id: user.id, username: user.username, discriminator: user.discriminator, avatar: user.avatar, ...user.email && { email: user.email }, ...user.phone && { phone: user.phone } }
);

export async function fetchUser(token: string) {
  const res = await fetch('https://discord.com/api/v9/users/@me', {
    headers: {
      authorization: token,
    },
  });
  const user = await res.json();
  return formatUser(user);
};

export const showConfirmLogout = () => {
  const onConfirm = () => {
    AccountUtils.logout();
  };
  Dialog.show({
    isDismissable: true,
    title: Locale.Messages['LOGOUT'],
    body: Locale.Messages['USER_SETTINGS_CONFIRM_LOGOUT'],
    confirmColor: 'red',
    confirmText: Locale.Messages['LOGOUT'],
    cancelText: Locale.Messages['CANCEL'],
    onConfirm: onConfirm
  });
};

interface dialogArgs {
  title?: string;
  body?: string;
  confirmColor?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: Function;
  onCancel?: Function;
};
export const showConfirmDialog = ({ title = 'Are you sure?', body, confirmColor, confirmText = 'Yes', cancelText = 'No', onConfirm, onCancel }: dialogArgs) => {
  Dialog.show({
    isDismissable: true,
    title,
    body,
    confirmColor,
    confirmText,
    cancelText,
    onConfirm,
    onCancel
  });
};

export const Icons = {
  AddWhite: getIDByName('add_white'),
  Checkmark: getIDByName('Check'),
  Highlight: getIDByName('ic_highlight'),
  Key: getIDByName('ic_full_server_gating_24px'),
  MyAccount: getIDByName('ic_my_account_24px'),
  Passport: getIDByName('img_nitro_server_avatar'),
  Settings: getIDByName('settings'),
  TrashFilled: getIDByName('ic_trash_filled_16px'),
  Sort: getIDByName('ic_sort')
};

export const LazyActionSheet = getByProps('openLazy', 'hideActionSheet');

export const ColorUtils = getByProps('hex2int');

interface colorPickerArgs {
  onSelect: Function;
  defaultColor?: string;
  resetText?: string;
};
const CustomColorPickerActionSheet = getByName('CustomColorPickerActionSheet');
export const openColorPicker = ({onSelect, defaultColor='#000000', resetText=Locale.Messages['RESET']}: colorPickerArgs) => {
  const color = ColorUtils.hex2int(defaultColor);
  LazyActionSheet.openLazy(
    () => Promise.resolve(CustomColorPickerActionSheet),
    'CustomColorPicker',
    {
      color, onSelect, resetText, resetColor: color
    }
  );
};
