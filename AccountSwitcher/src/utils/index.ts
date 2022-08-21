import { getByProps, getModule } from 'enmity/metro';
import { Dialog, Locale, Token } from 'enmity/metro/common';
import { Alert } from 'enmity/components';

export const AccountUtils = getByProps('loginToken');

export const { default: DiscordButton } = getModule(m => m?.ButtonColors);

export async function fetchUser(token: string) {
  const res = await fetch('https://discord.com/api/v9/users/@me', {
    headers: {
      authorization: token,
    },
  });
  const user = await res.json();
  return !user.id ? {} : { id: user.id, username: user.username, discriminator: user.discriminator, avatar: user.avatar, ...user.email && { email: user.email }, ...user.phone && { phone: user.phone } };
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
  if (!Token.getToken()) return Alert.alert(
    title,
    body,
    [
      {
        text: confirmText,
        onPress: onConfirm
      },
      {
        text: cancelText,
        onPress: onCancel
      }
    ]
  );
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
