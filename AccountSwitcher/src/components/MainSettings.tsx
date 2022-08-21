import { React, Navigation, Token, StyleSheet, Users, Locale } from 'enmity/metro/common';
import { FormCTAButton, FormRow, RefreshControl, ScrollView, View } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
const { createThemedStyleSheet } = StyleSheet;
import AccountCard from './AccountCard';

import { AccountUtils, Icons, formatUser, showConfirmLogout } from '../utils';

interface SettingsProps {
   settings: SettingsStore;
   navigation?: any;
   isFromUserSettings: boolean;
}

export default ({ settings, navigation, isFromUserSettings }: SettingsProps) => {
   const [refreshing, setRefreshing] = React.useState(false);

   const getSortedAccounts = () => {
      const accounts: any = settings.get('accounts', []);
      return Array.isArray(accounts) && accounts.sort((a, b) => a.label?.localeCompare(b.label) || a.username?.localeCompare(b.username));
   };
   const [accounts, setAccounts] = React.useState(getSortedAccounts());

   const styles = createThemedStyleSheet({
      container: {
         flex: 1,
         padding: 5
      },
   });

   return (
      <>
         <View style={styles.container}>
            <ScrollView
               style={styles.container}
               refreshControl={
                  <RefreshControl
                     refreshing={refreshing}
                     onRefresh={(): void => {
                        setRefreshing(true);
                        setAccounts(getSortedAccounts());
                        setRefreshing(false);
                     }}
                  />
               }
            >
               {Array.isArray(accounts) && accounts.map((account, idx) => (
                  <AccountCard account={account} position={idx} settings={settings} navigation={navigation} isFromUserSettings={isFromUserSettings ?? undefined} />
               ))}
               <FormRow
                  label='Add Account (Token)'
                  leading={<FormRow.Icon source={Icons.Key} />}
                  onPress={() => {
                     navigation.navigate('AccountSwitcherAddAccount', isFromUserSettings && { navigation, isFromUserSettings });
                  }}
               />
               {Boolean(Token.getToken()) && <FormRow
                  label='Add Current Account'
                  leading={<FormRow.Icon source={Icons.MyAccount} />}
                  onPress={() => {
                     navigation.navigate('AccountSwitcherAddAccount', !isFromUserSettings ? {
                        token: Token.getToken(),
                        user: formatUser(Users.getCurrentUser())
                     } : {
                        navigation,
                        route: {
                           params: {
                              token: Token.getToken(),
                              user: formatUser(Users.getCurrentUser())
                           }
                        },
                        isFromUserSettings
                     });
                  }}
               />}
               <FormRow
                  label='Add Account (User/Pass)'
                  leading={<FormRow.Icon source={Icons.Passport} />}
                  onPress={() => {
                     if (Boolean(Token.getToken())) AccountUtils.loginToken('');
                     Navigation.popAll();
                  }}
               />
               {Boolean(Token.getToken()) && <FormCTAButton
                  color='danger'
                  label={Locale.Messages['LOGOUT']}
                  onPress={showConfirmLogout}
               />}
            </ScrollView>
         </View>
      </>
   );
};
