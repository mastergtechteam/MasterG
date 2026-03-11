import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const Header = () => {
  const retailer = useSelector(state => state.retailer.profile);
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

      <TouchableOpacity onPress={handleProfile} style={styles.profileContainer}>
        {retailer?.shop_image || retailer?.storeImage || retailer?.userImage ? (
          <Image
            source={{
              uri:
                retailer?.shop_image ||
                retailer?.storeImage ||
                retailer?.userImage,
            }}
            style={styles.profileImage}
          />
        ) : (
          <MaterialDesignIcons
            name="account-circle-outline"
            size={30}
            color="#ffffff"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
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
    fontSize: 12,
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginLeft: 10,
  },

  profileContainer: {
    padding: 10,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
