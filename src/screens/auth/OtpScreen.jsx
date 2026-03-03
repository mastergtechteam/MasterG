import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  Animated,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import AppSafeArea from '../../components/common/AppSafeArea';
import AppText from '../../components/common/AppText';
import AppView from '../../components/common/AppView';

import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../api/apiClient';
import { saveAuthData } from '../../utils/secureStore';
import { loadRetailerProfile } from '../../features/profile/retailerSlice';
import { useDispatch } from 'react-redux';

export default function OtpScreen({ navigation, route }) {
  const { mobile } = route.params;

  const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 digit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(120);
  const [resending, setResending] = useState(false);
  const dispatch = useDispatch();

  const inputs = useRef([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const logo = require('../../assets/images/light-logo.png');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChange = (value, index) => {
    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError('');

      if (value && index < 5) {
        inputs.current[index + 1]?.focus();
      }

      if (!value && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) {
      setError('Please enter 6 digit OTP');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile: mobile,
          otp: enteredOtp,
          // otp: 1111,
          role: 'RETAILER',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Verification failed');
      }

      // 🔐 Store token + retailerId securely
      await saveAuthData(data.token, data.retailer.retailerId);
      await dispatch(loadRetailerProfile()).unwrap();

      // Store other non-sensitive data
      await AsyncStorage.setItem('user_mobile', data.user.mobile);
      await AsyncStorage.setItem('user_role', data.user.role);
      await AsyncStorage.setItem(
        'retailer_data',
        JSON.stringify(data.retailer),
      );

      navigation.replace('GetLocation');

      navigation.replace('GetLocation');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);
      setError('');

      const response = await fetch(`${BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      setTimer(120); // restart timer
      setOtp(['', '', '', '', '', '']); // clear otp
    } catch (err) {
      setError(err.message || 'Unable to resend OTP');
    } finally {
      setResending(false);
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
          }}
        >
          <AppText style={styles.title}>Enter OTP</AppText>

          <AppText style={styles.sentText}>Sent to {mobile}</AppText>

          <AppView style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputs.current[index] = ref)}
                value={digit}
                onChangeText={val => handleChange(val, index)}
                keyboardType="number-pad"
                maxLength={1}
                style={[
                  styles.otpBox,
                  {
                    borderColor: colors.border,
                    color: colors.textPrimary,
                  },
                ]}
              />
            ))}
          </AppView>

          {error ? <AppText style={styles.errorText}>{error}</AppText> : null}

          <TouchableOpacity
            style={[styles.OtpButton, loading && styles.buttonDisabled]}
            onPress={handleVerify}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              <AppText style={styles.OtpButtonTextSelected}>
                Verify & Login
              </AppText>
            )}
          </TouchableOpacity>

          {timer > 0 ? (
            <AppText style={styles.timerText}>
              Resend OTP in {formatTime(timer)}
            </AppText>
          ) : (
            <Pressable onPress={handleResendOtp} disabled={resending}>
              <AppText style={styles.resendText}>
                {resending ? 'Resending...' : 'Resend OTP'}
              </AppText>
            </Pressable>
          )}

          <Pressable onPress={() => navigation.goBack()}>
            <AppText style={styles.changeNumber}>Change number</AppText>
          </Pressable>
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
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 14,
    letterSpacing: 1,
  },

  title: {
    fontSize: 20,
    marginBottom: 6,
  },
  timerText: {
    textAlign: 'center',
    opacity: 0.6,
    marginBottom: 8,

    fontSize: 16,
    padding: 4,
  },

  resendText: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 8,
  },

  sentText: {
    opacity: 0.6,
    marginBottom: 20,
    fontSize: 16,
  },

  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  otpBox: {
    width: 40,
    height: 48,
    borderWidth: 1.5,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
  },

  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },

  changeNumber: {
    textAlign: 'center',
    opacity: 0.8,
    fontSize: 16,
    marginVertical: 10,
  },

  divider: {
    width: 160,
    height: 1,
    marginBottom: 12,
    opacity: 0.9,
    transform: [{ scaleX: 0.85 }],
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

  OtpButtonTextSelected: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },

  buttonDisabled: {
    opacity: 0.7,
  },
});
