import { React, StyleSheet, ColorMap, Constants, Profiles } from 'enmity/metro/common';
import { Text, TouchableOpacity, View } from 'enmity/components';

const { ThemeColorMap } = ColorMap;

export default function ({ account }) {
  if (!account) {
    return null;
  }

  const styles = StyleSheet.createThemedStyleSheet({
    linkless: {
      color: ThemeColorMap.HEADER_SECONDARY,
      fontFamily: Constants.Fonts.PRIMARY_SEMIBOLD,
      display: 'flex',
      fontSize: 16,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center'
    },

    link: {
      color: ThemeColorMap.HEADER_PRIMARY,
      fontFamily: Constants.Fonts.PRIMARY_SEMIBOLD,
      display: 'flex',
      alignItems: 'center',
      fontSize: 16,
      alignSelf: 'center',
      justifyContent: 'center'
    }
  });

  return <View>
    {((account) => {
      if (typeof account === 'string') {
        return (
          <Text style={styles.linkless}>
            {account}
          </Text>
        );
      } else if (typeof account === 'object' && account.username && !account.id) {
        return (
          <Text style={styles.linkless}>
            {account.username}
          </Text>
        );
      } else if (typeof account === 'object' && account.username && account.id) {
        return (
          <TouchableOpacity
            key={account.id}
            onPress={() => Profiles.showUserProfile({ userId: account.id })}
          >
            <Text style={styles.link}>
              {account.username}
            </Text>
          </TouchableOpacity>
        );
      }

      return null;
    })(account)}
  </View>;
}
