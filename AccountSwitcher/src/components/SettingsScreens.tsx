import { React, Navigation, NavigationNative, NavigationStack, StyleSheet, ColorMap } from 'enmity/metro/common';
import { Button, FormInput, Image, TouchableOpacity, View } from 'enmity/components';
import { connectComponent } from 'enmity/api/settings';

import { fetchUser, DiscordButton, Icons } from '../utils';

import MainSettings from './MainSettings';

export const Settings = NavigationStack.createStackNavigator();

const { createThemedStyleSheet } = StyleSheet;
const { ThemeColorMap } = ColorMap;

export function HeaderRight({ navigation, isFromUserSettings }) {
  const styles = createThemedStyleSheet({
    header: {
      tintColor: ThemeColorMap.HEADER_PRIMARY,
      marginRight: 15,
      width: 18,
      height: 18
    },
    wrapper: {
      marginRight: 15,
      width: 32,
      height: 32
    }
  });

  return (
    <TouchableOpacity styles={styles.wrapper} onPress={(): void => {
      navigation.navigate('AccountSwitcherAddAccount', isFromUserSettings && { navigation, isFromUserSettings });
    }}>
      <Image
        style={styles.header}
        source={Icons.AddWhite}
      />
    </TouchableOpacity>
  );
}

export function EditAccount({ settings, navigation, route }) {
  const { account, position } = route.params;

  const [tokenVal, setTokenVal] = React.useState(account.token);
  const [labelVal, setLabelVal] = React.useState(account.label || '');
  const [descVal, setDescVal] = React.useState(account.description || '');
  const [colorVal, setColorVal] = React.useState(account.color || '');

  const styles = createThemedStyleSheet({
    container: {
      // backgroundColor: '#1f2026',
      flex: 1,
      padding: 16,
      paddingTop: 36,
      paddingBottom: 36,
    }
  });

  return (
    <View
      style={styles.container}
    >
      <FormInput
        value={tokenVal}
        onChange={v => setTokenVal(v)}
        title='Account Token'
      />
      <FormInput
        value={labelVal}
        onChange={v => setLabelVal(v)}
        title='Label'
      />
      <FormInput
        value={descVal}
        onChange={v => setDescVal(v)}
        title='Description'
      />
      <FormInput
        value={colorVal}
        onChange={v => setColorVal(v)}
        title='Color'
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <DiscordButton
          onPress={async function () {
            const user = await fetchUser(tokenVal);
            // if (!user.id) return Toasts.open({
            //   content: 'Invalid token',
            //   source: getIDByName('ic_close_16px')
            // });
            const accs = settings.get('accounts', []);
            accs[position] = {
              token: tokenVal,
              user: user,
              label: labelVal || null,
              description: descVal || null,
              color: colorVal || null
            };
            settings.set('accounts', accs);
            navigation.goBack();
          }}
          style={{ backgroundColor: '#64d3ff' }}
          text='Save account'
        />
      </View>
    </View>);
}

export function AddAccount({ settings, navigation, route }) {
  const { token: pToken, user: pUser } = route?.params || {};
  const [tokenVal, setTokenVal] = React.useState(pToken || '');
  const [labelVal, setLabelVal] = React.useState('');
  const [descVal, setDescVal] = React.useState('');
  const [colorVal, setColorVal] = React.useState('');

  const styles = createThemedStyleSheet({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 36,
      paddingBottom: 36,
    }
  });

  return (
    <View
      style={styles.container}
    >
      <FormInput
        value={pToken || ''}
        onChange={v => setTokenVal(v)}
        title='Account Token'
      />
      <FormInput
        onChange={v => setLabelVal(v)}
        title='Label'
      />
      <FormInput
        onChange={v => setDescVal(v)}
        title='Description'
      />
      <FormInput
        value={colorVal}
        onChange={v => setColorVal(v)}
        title='Color'
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <DiscordButton
          onPress={async function () {
            const user = pUser || await fetchUser(tokenVal);
            // if (!user.id) return Toasts.open({
            //   content: 'Invalid token',
            //   source: getIDByName('ic_close_16px')
            // });
            const accs = settings.get('accounts', []);
            accs.push({
              token: tokenVal,
              user: user,
              label: labelVal || null,
              description: descVal || null,
              color: colorVal || null
            });
            settings.set('accounts', accs);
            navigation.goBack();
          }}
          style={{ backgroundColor: '#64d3ff' }}
          text='Add account'
        />
      </View>
    </View>
  );
}

export function MainScreen({ settings, navigation, isFromUserSettings }) {
  return <MainSettings settings={settings} navigation={navigation} isFromUserSettings={isFromUserSettings ?? undefined}></MainSettings>;
}

export default function ({ name = 'pluginName', mainScreen = MainScreen, addAccount = AddAccount } = {}) {
  const styles = createThemedStyleSheet({
    container: {
      backgroundColor: ThemeColorMap.BACKGROUND_MOBILE_SECONDARY,
      flex: 1,
    },
    cardStyle: {
      backgroundColor: ThemeColorMap.BACKGROUND_MOBILE_PRIMARY,
      color: ThemeColorMap.TEXT_NORMAL
    },
    header: {
      backgroundColor: ThemeColorMap.BACKGROUND_MOBILE_SECONDARY,
      shadowColor: 'transparent',
      elevation: 0,
    },
    headerTitleContainer: {
      color: ThemeColorMap.HEADER_PRIMARY,
    },
    close: {
      color: ThemeColorMap.HEADER_PRIMARY
    }
  });

  return <NavigationNative.NavigationContainer>
    <Settings.Navigator
      initialRouteName={name}
      style={styles.container}
      screenOptions={{
        cardOverlayEnabled: !1,
        cardShadowEnabled: !1,
        cardStyle: styles.cardStyle,
        headerStyle: styles.header,
        headerTitleContainerStyle: styles.headerTitleContainer,
        headerTitleAlign: 'center',
        safeAreaInsets: {
          top: 0,
        },
      }}
    >
      <Settings.Screen
        name={name}
        component={connectComponent(mainScreen, name)}
        options={({ navigation }) => ({
          headerTitle: 'Account Switcher',
          headerTitleStyle: {
            color: 'white',
          },
          headerLeft: () => (<Button
            color={styles.close.color}
            title='Close'
            onPress={(): void => Navigation.pop()}
          />),
          headerRight: () => (<HeaderRight
            navigation={navigation}
            isFromUserSettings={undefined}
          />),
          ...NavigationStack.TransitionPresets.ModalSlideFromBottomIOS
        })}
      />
      <Settings.Screen
        name={'AccountSwitcherAddAccount'}
        component={connectComponent(addAccount, name)}
        options={{
          headerTitle: 'Add account',
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: styles.close.color,
        }}
      />
      <Settings.Screen
        name={'AccountSwitcherEditAccount'}
        component={connectComponent(EditAccount, name)}
        options={{
          headerTitle: 'Edit account',
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: styles.close.color,
        }}
      />
    </Settings.Navigator>
  </NavigationNative.NavigationContainer>;
}
