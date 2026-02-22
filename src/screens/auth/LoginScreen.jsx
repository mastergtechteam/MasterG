import React, { useRef, useState, useEffect } from 'react';
import {
  TextInput,
  Alert,
  View,
  StyleSheet,
  Image,
  Animated,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';

import AppSafeArea from '../../components/common/AppSafeArea';
import AppText from '../../components/common/AppText';
import AppButton from '../../components/common/AppButton';
import AppView from '../../components/common/AppView';

import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { getAuth, signInWithPhoneNumber } from '@react-native-firebase/auth';

import { setConfirmation } from '../../utils/authStore';

export default function LoginScreen({ navigation }) {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const logo = require('../../assets/images/light-logo.png');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  const isValidIndianNumber = number => /^[6-9]\d{9}$/.test(number);

  const handleGetOtp = async () => {
    if (!isValidIndianNumber(mobile)) {
      Alert.alert('Invalid Number', 'Enter a valid Indian mobile number');
      return;
    }

    try {
      setLoading(true);

      const fullNumber = `+91${mobile}`;

      const confirmationResult = await signInWithPhoneNumber(
        getAuth(),
        fullNumber,
      );

      setConfirmation(confirmationResult);

      navigation.navigate('Otp', {
        mobile: fullNumber,
      });
    } catch (error) {
      console.log('OTP Send Error:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppSafeArea style={{ padding: spacing.lg }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
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

          <TouchableOpacity style={styles.OtpButton} onPress={handleGetOtp}>
            <Text style={styles.OtpButtonTextSelected}>
              {loading ? 'Sending...' : 'Get OTP'}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.languageButton}
            onPress={() => navigation.navigate('App')}
          >
            <Text style={styles.languageButtonText}>Skip</Text>
          </TouchableOpacity> */}
        </AppView>
      </KeyboardAvoidingView>
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

  languageButton: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 10,
  },
  OtpButton: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    marginBottom: 10,
  },

  languageButtonSelected: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },

  languageButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },

  OtpButtonTextSelected: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});
