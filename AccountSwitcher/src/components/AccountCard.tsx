import { React, Navigation, StyleSheet, ColorMap, Constants, Toasts } from 'enmity/metro/common';
import { Text, Image, TouchableOpacity, View, FormRow } from 'enmity/components';
import TouchableAccount from './TouchableAccount';
import { SettingsStore } from 'enmity/api/settings';

import { AccountUtils, Icons, showConfirmDialog } from '../utils';

const { ThemeColorMap } = ColorMap;

export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  email?: string;
  phone?: string;
}

export interface AccountInfo {
  token: string;
  user: User;
  label: string;
  description: string;
  color?: string;
}

interface AccountCardProps {
  account: AccountInfo;
  settings: SettingsStore;
  position: number;
  navigation: any;
}

export default function AccountCard({ account, position, settings, navigation }: AccountCardProps) {
  const styles = StyleSheet.createThemedStyleSheet({
    container: {
      backgroundColor: ThemeColorMap.BACKGROUND_SECONDARY,
      borderRadius: 5,
      borderLeftColor: account.color ?? '#524FBF',
      borderLeftWidth: 5,
      marginBottom: 15,
    },
    name: {
      color: ThemeColorMap.HEADER_PRIMARY,
      fontFamily: Constants.Fonts.PRIMARY_SEMIBOLD,
      fontSize: 16
    },
    content: {
      height: 'auto',
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10
    },
    actions: {
      justifyContent: 'flex-end',
      flexDirection: 'row',
      alignItems: 'center'
    },
    description: {
      color: ThemeColorMap.HEADER_SECONDARY,
      fontFamily: Constants.Fonts.PRIMARY_SEMIBOLD,
    },
    info: {
      marginLeft: -6,
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      width: '100%'
    },
    delete: {
      marginRight: 7.5
    },
    trashIcon: {
      width: 22,
      height: 22,
      tintColor: ThemeColorMap.INTERACTIVE_NORMAL
    },
    settingsIcon: {
      width: 22,
      height: 22,
      tintColor: ThemeColorMap.INTERACTIVE_NORMAL
    }
  });

  return (
    <TouchableOpacity style={styles.container} onPress={() => {
      const onConfirm = () => {
        Navigation.popAll();
        AccountUtils.loginToken(account.token);
        Toasts.open({ content: 'Account Switched', source: Icons.Checkmark })
      };
      // if (!Token.getToken()) Navigation.pop();
      showConfirmDialog({
        body: `Switch to ${account.label || account.user.username + '#' + account.user.discriminator}?`,
        onConfirm
      });
    }}>
      <View>
        <FormRow
          label={() => <View style={styles.info}>
            {account.label && <Text
              adjustsFontSizeToFit
              style={styles.name}
            >
              {`${account.label} ( `}
            </Text>}
            <TouchableAccount account={account.user} />
            {account.label && <Text
              adjustsFontSizeToFit
              style={styles.name}
            >
              {' )'}
            </Text>}
          </View>}
          trailing={() => <View style={styles.actions}>
            <TouchableOpacity
              style={styles.delete}
              onPress={(): void => {
                navigation.navigate('AccountSwitcherEditAccount', { account, position });
              }}
            >
              <Image style={styles.settingsIcon} source={Icons.Settings} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.delete}
              onPress={(): void => {
                const onConfirm = () => {
                  const accounts: any = settings.get('accounts', []);
                  accounts.splice(position, 1);
                  settings.set('accounts', accounts);
                  Toasts.open({ content: 'Account Deleted', source: Icons.Checkmark })
                };
                // if (!Token.getToken()) Navigation.pop();
                showConfirmDialog({
                  body: account.label ? `Delete ${account.label} (${account.user.username}#${account.user.discriminator})?` : `Delete ${account.user.username}#${account.user.discriminator}?`,
                  confirmColor: 'red',
                  onConfirm
                });
              }}
            >
              <Image style={styles.trashIcon} source={Icons.TrashFilled} />
            </TouchableOpacity>
          </View>}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>
          {account.description ?? `ID: ${account.user.id}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
