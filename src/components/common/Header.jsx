// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { useTheme } from '../../hooks/useTheme';
// import { useNavigation } from '@react-navigation/native';

// const Header = () => {
//   const { theme } = useTheme();
//   const navigation = useNavigation();
//   const logo = require('../../assets/images/light-logo.png');

//   const handleProfile = () => {
//     navigation.navigate('Profile');
//   };

//   return (
//     <View style={styles.header}>
//       <View>
//         <Image source={logo} style={styles.headerLogo} resizeMode="contain" />

//         <LinearGradient
//           colors={['#000000', '#FFFFFF', '#FFFFFF', '#000000']}
//           locations={[0, 0.25, 0.5, 1]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={styles.divider}
//         />
//         <Text style={styles.headerSubtitle}>B2B Voice Ordering Platform</Text>
//       </View>

//       <TouchableOpacity onPress={handleProfile}>
//         <Text style={[styles.headerProfile]}>HS</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Header;

// const styles = StyleSheet.create({
//   header: {
//     // paddingHorizontal: 20,
//     // paddingTop: 10,
//     marginBottom: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },

//   headerLogo: {
//     width: 140,
//     height: 60,
//     marginBottom: 0,
//   },

//   divider: {
//     width: 160,
//     height: 1,
//     marginBottom: 12,
//     opacity: 0.9,
//     transform: [{ scaleX: 0.85 }],
//   },

//   headerProfile: {
//     fontSize: 16,
//     fontWeight: '400',
//     color: '#6B7280',
//     letterSpacing: 0.6,
//     padding: 10,
//     borderWidth: 1.2,
//     borderColor: 'white',
//     borderRadius: 50,
//     marginRight: 5,
//   },
//   headerSubtitle: {
//     fontSize: 12,
//     color: '#9CA3AF',
//     letterSpacing: 0.5,
//     marginLeft: 10,
//   },
// });
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = () => {
  const navigation = useNavigation();
  const logo = require('../../assets/images/light-logo.png');

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.header}>
      <View>
        <Image source={logo} style={styles.headerLogo} resizeMode="contain" />

        <LinearGradient
          colors={['#000000', '#FFFFFF', '#FFFFFF', '#000000']}
          locations={[0, 0.25, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.divider}
        />

        <Text style={styles.headerSubtitle}>B2B Voice Ordering Platform</Text>
      </View>

      <TouchableOpacity onPress={handleProfile}>
        <MaterialDesignIcons
          name="account-circle-outline"
          size={30}
          color="#ffffff"
          style={styles.headerProfile}
        />
      </TouchableOpacity>
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

  headerProfile: {
    // fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
    letterSpacing: 0.6,
    padding: 10,

    marginRight: 5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginLeft: 10,
  },
});
