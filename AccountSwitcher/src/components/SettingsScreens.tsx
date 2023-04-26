import { React, Navigation, NavigationNative, NavigationStack, StyleSheet, ColorMap, Constants } from 'enmity/metro/common';
import { Button, FormArrow, FormInput, FormRow, Image, Text, TouchableOpacity, View } from 'enmity/components';
import { connectComponent } from 'enmity/api/settings';

import { fetchUser, DiscordButton, Icons, openColorPicker, ColorUtils } from '../utils';

import MainSettings from './MainSettings';

export const Settings = NavigationStack.createStackNavigator();

const { createThemedStyleSheet } = StyleSheet;
const { ThemeColorMap } = ColorMap;

export function HeaderRight({ navigation = NavigationNative.useNavigation() }) {
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
      navigation.navigate('AccountSwitcherAddAccount');
    }}>
      <Image
        style={styles.header}
        source={Icons.AddWhite}
      />
    </TouchableOpacity>
  );
}

export function EditAccount({ settings, navigation = NavigationNative.useNavigation(), route = NavigationNative.useRoute() }) {
  const { account, position } = route.params;

  const [tokenVal, setTokenVal] = React.useState(account.token);
  const [labelVal, setLabelVal] = React.useState(account.label || '');
  const [descVal, setDescVal] = React.useState(account.description || '');
  const [colorVal, setColorVal] = React.useState(account.color || '#524FBF');

  const styles = createThemedStyleSheet({
    container: {
      // backgroundColor: '#1f2026',
      flex: 1,
      padding: 16,
    },
    colorBlock: {
      minWidth: 24,
      height: 24,
      borderRadius: 3,
      marginHorizontal: 0,
      marginVertical: 0,
      marginRight: 8,
      justifyContent: "center",
      alignItems: "center"
    },
    colorText: {
      fontFamily: Constants.Fonts.PRIMARY_SEMIBOLD,
      color: Constants.Colors.PRIMARY_DARK_400
    },
    row: {
      flexDirection: "row",
      alignItems: "center"
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
      <FormRow
        label={() => <Text
          adjustsFontSizeToFit
          style={styles.colorText}
        >
          Color
        </Text>}
        trailing={() => <View style={styles.row}>
          <View style={[
            styles.colorBlock,
            {
              backgroundColor: colorVal
            }
          ]} />
          <Text style={styles.colorText}>
            {colorVal}
          </Text>
          <FormArrow />
        </View>}
        onPress={() => openColorPicker({ onSelect: v => setColorVal(ColorUtils.int2hex(v)), defaultColor: colorVal })}
      />
      <View style={styles.row}>
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
          text='Save account'
        />
      </View>
    </View>);
}

export function AddAccount({ settings, navigation = NavigationNative.useNavigation(), route = NavigationNative.useRoute() }) {
  const { token: pToken, user: pUser } = route?.params || {};
  const [tokenVal, setTokenVal] = React.useState(pToken || '');
  const [labelVal, setLabelVal] = React.useState('');
  const [descVal, setDescVal] = React.useState('');
  const [colorVal, setColorVal] = React.useState('#524FBF');

  const styles = createThemedStyleSheet({
    container: {
      flex: 1,
      padding: 16,
    },
    colorBlock: {
      minWidth: 24,
      height: 24,
      borderRadius: 3,
      marginHorizontal: 0,
      marginVertical: 0,
      marginRight: 8,
      justifyContent: "center",
      alignItems: "center"
    },
    colorText: {
      fontFamily: Constants.Fonts.PRIMARY_SEMIBOLD,
      color: Constants.Colors.PRIMARY_DARK_400
    },
    row: {
      flexDirection: "row",
      alignItems: "center"
    }
  });

  return (
    <View
      style={styles.container}
    >
      <FormInput
        disabled={Boolean(pToken)}
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
      <FormRow
        label={() => <Text
          adjustsFontSizeToFit
          style={styles.colorText}
        >
          Color
        </Text>}
        trailing={() => <View style={styles.row}>
          <View style={[
            styles.colorBlock,
            {
              backgroundColor: colorVal
            }
          ]} />
          <Text style={styles.colorText}>
            {colorVal}
          </Text>
          <FormArrow />
        </View>}
        onPress={() => openColorPicker({ onSelect: v => setColorVal(ColorUtils.int2hex(v)), defaultColor: colorVal })}
      />
      <View style={styles.row}>
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
          text='Add account'
        />
      </View>
    </View>
  );
}

export function MainScreen({ settings, navigation = NavigationNative.useNavigation() }) {
  return <MainSettings settings={settings} navigation={navigation} />;
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

  return <Settings.Navigator
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
}
