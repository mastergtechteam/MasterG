import React, { useRef, useState, useEffect } from 'react';
import {
  TextInput,
  Alert,
  View,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';

import AppSafeArea from '../../components/common/AppSafeArea';
import AppText from '../../components/common/AppText';
import AppButton from '../../components/common/AppButton';
import AppView from '../../components/common/AppView';

import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export default function LoginScreen({ navigation }) {
  const [mobile, setMobile] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Dark-only logo
  const logo = require('../../assets/images/light-logo.png');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  const isValidIndianNumber = number => /^[6-9]\d{9}$/.test(number);

  const handleGetOtp = () => {
    if (!isValidIndianNumber(mobile)) {
      Alert.alert('Invalid Number', 'Enter a valid Indian mobile number');
      return;
    }

    navigation.navigate('Otp', {
      mobile: `+91${mobile}`,
    });
  };

  return (
    <AppSafeArea style={{ padding: spacing.lg }}>
      {/* Logo Section */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <LinearGradient
          colors={['#000000', '#FFFFFF', '#FFFFFF', '#000000']}
          locations={[0, 0.25, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.divider}
        />
        <AppText style={styles.subtitle}>B2B Voice Ordering Platform</AppText>
      </Animated.View>

      {/* Login Card */}
      <AppView
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 14,
          padding: spacing.lg,
          marginBottom: spacing.lg,
        }}
      >
        <AppText style={styles.title}>Login With Mobile</AppText>

        <AppView style={[styles.inputRow, { borderColor: colors.border }]}>
          <AppText style={styles.countryCode}>+91</AppText>

          <TextInput
            placeholder="Enter mobile number"
            placeholderTextColor={colors.textMuted}
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
            style={[styles.input, { color: colors.textPrimary }]}
          />
        </AppView>

        <AppButton
          title="Get OTP"
          onPress={handleGetOtp}
          style={styles.button}
        />
        <AppButton
          title="Skip"
          onPress={() => navigation.navigate('App')}
          style={[styles.button]}
        />
      </AppView>
    </AppSafeArea>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 300,
    height: 90,
  },

  title: {
    fontSize: 20,
    marginBottom: 16,
  },

  subtitle: {
    fontSize: 14,
    letterSpacing: 1,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  countryCode: {
    fontSize: 16,
    marginRight: 8,
  },

  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },

  button: {
    fontSize: 20,
    marginBottom: 20,
  },
  divider: {
    width: 160,
    height: 1,
    marginBottom: 12,
    opacity: 0.9,
    transform: [{ scaleX: 0.85 }],
  },
});
