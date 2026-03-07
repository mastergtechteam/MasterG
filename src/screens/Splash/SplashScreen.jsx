import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { loadRetailerProfile } from '../../features/profile/retailerSlice';
import { getAuthData, clearAuthData } from '../../utils/secureStore';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const logo = require('../../assets/images/light-logo.png');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      initializeApp();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const initializeApp = async () => {
    try {
      const authData = await getAuthData();

      // 🔐 No token → go to Auth
      if (!authData?.token || !authData?.retailerId) {
        navigation.replace('Auth');
        return;
      }

      // 📡 Load profile
      const resultAction = await dispatch(loadRetailerProfile());

      if (loadRetailerProfile.fulfilled.match(resultAction)) {
        const profile = resultAction?.payload?.address;

        // ✅ Check location
        const hasLocation =
          profile?.pincode !== null &&
          profile?.pincode !== undefined &&
          profile?.pincode !== '' &&
          profile?.pincode !== 0;

        if (hasLocation) {
          navigation.replace('App'); // 👈 Main App
        } else {
          navigation.replace('GetLocation'); // 👈 Ask for location
        }
      } else {
        await clearAuthData();
        navigation.replace('Auth');
      }
    } catch (error) {
      console.log('Splash Error:', error);
      await clearAuthData();
      navigation.replace('Auth');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0B" />

      <View style={styles.background} />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <LinearGradient
          colors={['#000000', '#FFFFFF', '#FFFFFF', '#000000']}
          locations={[0, 0.25, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.divider}
        />

        <Text style={styles.subtitle}>B2B Voice Ordering Platform</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0B0B0B',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 320,
    height: 100,
    marginBottom: 10,
  },

  divider: {
    width: 160,
    height: 1,
    marginBottom: 12,
    opacity: 0.9,
    transform: [{ scaleX: 0.85 }], // pin-narrow edges
  },

  subtitle: {
    fontSize: 14,
    color: '#747474',
    letterSpacing: 1,
  },
});

export default SplashScreen;
