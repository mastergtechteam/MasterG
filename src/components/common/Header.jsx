import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import AppText from './AppText';

const Header = () => {
  const { theme } = useTheme();
  const logo =
    theme.mode === 'dark'
      ? require('../../assets/images/light-logo.png')
      : require('../../assets/images/dark-logo.png');

  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.headerLogo} resizeMode="contain" />

      {/* <LinearGradient
        colors={['#000000', '#FFFFFF', '#FFFFFF', '#000000']}
        locations={[0, 0.25, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.divider}
      /> */}

      <AppText
        style={[styles.headerSubtitle, { borderColor: theme.colors.text }]}
      >
        HS
      </AppText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    // paddingHorizontal: 20,
    // paddingTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerLogo: {
    width: 140,
    height: 60,
    marginBottom: 0,
  },

  divider: {
    width: 160,
    height: 1,
    marginBottom: 12,
    opacity: 0.9,
    transform: [{ scaleX: 0.85 }],
  },

  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    // color: '#6B7280',
    letterSpacing: 0.6,
    padding: 10,
    borderWidth: 1.2,
    borderColor: 'white',
    borderRadius: 50,
    marginRight: 5,
  },
});
