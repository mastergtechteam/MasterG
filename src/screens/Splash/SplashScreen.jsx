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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import {
  loadRetailerProfile,
  setRetailerProfile,
} from '../../features/profile/retailerSlice';
import { BASE_URL } from '../../api/apiClient';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const logo = require('../../assets/images/light-logo.png');

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const uuid = await AsyncStorage.getItem('user_uuid');

      if (!uuid) {
        navigation.replace('Auth');
        return;
      }

      await dispatch(loadRetailerProfile(uuid)).unwrap();

      navigation.replace('App');
    } catch (error) {
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
