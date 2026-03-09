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
  Clipboard,
  Alert,
  Text,
} from 'react-native';

import AppSafeArea from '../../components/common/AppSafeArea';
import AppText from '../../components/common/AppText';
import AppView from '../../components/common/AppView';

import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LegalWebviewModal from '../../components/common/LegalWebviewModal';
import { BASE_URL } from '../../api/apiClient';
import { saveAuthData } from '../../utils/secureStore';
import { loadRetailerProfile } from '../../features/profile/retailerSlice';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function OtpScreen({ navigation, route }) {
  const { mobile } = route.params;

  const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 digit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(120);
  const [resending, setResending] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [legalModalVisible, setLegalModalVisible] = useState(false);
  const [legalUrl, setLegalUrl] = useState('');

  // clipboard-related states
  const [clipboardOtp, setClipboardOtp] = useState(''); // holds suggestion if OTP found
  const [clipboardOtpFilled, setClipboardOtpFilled] = useState(false); // tracks if user already used paste
  const dispatch = useDispatch();

  const inputs = useRef([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const clipboardCheckRef = useRef(null);

  const logo = require('../../assets/images/light-logo.png');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Look for OTP in clipboard and offer paste suggestion
  useEffect(() => {
    const checkClipboard = async () => {
      if (clipboardOtp || clipboardOtpFilled) return; // nothing to do once suggestion shown or used

      try {
        const clipboardContent = await Clipboard.getString();
        const otpMatch = clipboardContent.match(/\d{6}/);

        if (otpMatch) {
          setClipboardOtp(otpMatch[0]);
        }
      } catch (err) {
        console.log('Clipboard read error:', err);
      }
    };

    clipboardCheckRef.current = setTimeout(checkClipboard, 500);

    return () => {
      if (clipboardCheckRef.current) {
        clearTimeout(clipboardCheckRef.current);
      }
    };
  }, [clipboardOtp, clipboardOtpFilled]);

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
    // Only allow digits and single character input
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    // If user pasted multiple digits
    if (value.length > 1) {
      const digits = value
        .split('')
        .filter(d => /\d/.test(d))
        .slice(0, 6 - index);
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      setError(''); // Clear error when user starts entering

      // Auto-focus to the next empty field
      const nextEmptyIndex = newOtp.findIndex((d, i) => i > index && d === '');
      if (nextEmptyIndex !== -1) {
        setTimeout(() => inputs.current[nextEmptyIndex]?.focus(), 50);
      } else {
        setTimeout(() => inputs.current[5]?.focus(), 50);
      }
      return;
    }

    // Single digit input
    newOtp[index] = value;
    setOtp(newOtp);
    setError(''); // Clear error when user starts entering

    // Move to next field when typing a digit
    if (value && index < 5) {
      setTimeout(() => inputs.current[index + 1]?.focus(), 50);
    }
  };

  const handleKeyPress = (e, index) => {
    const { key } = e.nativeEvent;

    if (key === 'Backspace') {
      const newOtp = [...otp];

      if (otp[index]) {
        // Clear current digit if it exists
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous field and clear it if current is empty
        newOtp[index - 1] = '';
        setOtp(newOtp);
        setTimeout(() => inputs.current[index - 1]?.focus(), 50);
      }
    }
  };

  const handleClearOtp = () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    setClipboardOtpFilled(false);
    setClipboardOtp('');
    setTimeout(() => inputs.current[0]?.focus(), 100);
  };

  const openLegal = url => {
    setLegalUrl(url);
    setLegalModalVisible(true);
  };

  const handleVerify = async () => {
    if (!agreed) {
      const message = 'Please agree to our terms and conditions.';
      // show alert with option to read
      Alert.alert('Consent required', message, [
        { text: 'Read', onPress: () => openLegal('https://masterg.ai/') },
        { text: 'OK', style: 'cancel' },
      ]);
      setError(message);
      return;
    }

    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) {
      setError('Please enter all 6 digits');
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
          // otp: enteredOtp,
          otp: 1111,
          role: 'RETAILER',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Clear OTP on failure so user can retry
        setOtp(['', '', '', '', '', '']);
        setClipboardOtpFilled(false);
        setTimeout(() => inputs.current[0]?.focus(), 100);
        throw new Error(
          data.message || 'OTP verification failed. Please try again.',
        );
      }

      // 🔐 Store token + retailerId securely
      await saveAuthData(data.token, data.retailer.retailerId);

      // Load latest profile from backend
      const profile = await dispatch(loadRetailerProfile()).unwrap();
      console.log(profile, 11, profile?.address.pincode);

      // Store non-sensitive data
      await AsyncStorage.setItem('user_mobile', data.user.mobile);
      await AsyncStorage.setItem('user_role', data.user.role);
      await AsyncStorage.setItem(
        'retailer_data',
        JSON.stringify({
          pincode: profile?.address.pincode,
        }),
      );

      // ✅ Check if pincode exists
      const hasLocation =
        profile?.address?.pincode !== null &&
        profile?.address?.pincode !== undefined &&
        profile?.address?.pincode !== '' &&
        profile?.address?.pincode !== 0;

      if (hasLocation) {
        navigation.replace('App'); // 👈 Main app screen
      } else {
        navigation.replace('GetLocation'); // 👈 Ask for location
      }
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
      setClipboardOtpFilled(false); // Reset clipboard flag to allow suggestion for new OTP
      setClipboardOtp(''); // clear old suggestion
      setError('');
      setTimeout(() => inputs.current[0]?.focus(), 100);
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
          <AppView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: spacing.lg,
            }}
          >
            <AppText style={styles.title}>Enter OTP</AppText>
            {otp.join('').length > 0 && (
              <Pressable onPress={handleClearOtp} hitSlop={10}>
                <Icon
                  name="close"
                  size={24}
                  color={colors.textSecondary || '#666'}
                />
              </Pressable>
            )}
          </AppView>

          <AppText style={styles.sentText}>Sent to {mobile}</AppText>

          <AppView style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputs.current[index] = ref)}
                value={digit}
                onChangeText={val => handleChange(val, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={6} // Allow paste of multiple digits
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
                editable={true}
                selectTextOnFocus={true}
                style={[
                  styles.otpBox,
                  {
                    borderColor: error ? '#D32F2F' : colors.border,
                    color: colors.textPrimary,
                    borderWidth: digit ? 2 : 1.5,
                  },
                ]}
                placeholderTextColor={colors.textSecondary || '#999'}
              />
            ))}
          </AppView>

          {error ? <AppText style={styles.errorText}>{error}</AppText> : null}

          {/* if clipboard OTP suggestion exists, show button */}
          {/* {clipboardOtp && otp.join('').length === 0 ? (
            <Pressable
              style={styles.pasteButton}
              onPress={() => {
                // populate fields with clipboard value
                const arr = clipboardOtp.split('');
                setOtp(arr);
                setClipboardOtpFilled(true);
                setClipboardOtp('');
                setTimeout(() => inputs.current[5]?.focus(), 100);
              }}
            >
              <AppText style={styles.resendText}>
                Paste OTP from clipboard
              </AppText>
            </Pressable>
          ) : null} */}

          {/* consent checkbox and links */}
          <AppView style={styles.consentRow}>
            <TouchableOpacity
              onPress={() => setAgreed(prev => !prev)}
              style={styles.checkboxWrapper}
            >
              <Icon
                name={agreed ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color={agreed ? colors.primary : colors.textSecondary}
              />
            </TouchableOpacity>
            {/* <AppText style={styles.consentText}>
              I agree to our{' '}
              <AppText
                style={styles.link}
                onPress={() => openLegal('https://masterg.ai/')}
              >
                Terms & Conditions
              </AppText>{' '}
              and{' '}
              <AppText
                style={styles.link}
                onPress={() => openLegal('https://masterg.ai/')}
              >
                Privacy Policy
              </AppText>
            </AppText> */}

            <AppText style={styles.consentText}>
              By continuing, you agree to our{' '}
              <Text
                style={styles.link}
                onPress={() => openLegal('https://masterg.ai/')}
              >
                Terms & Conditions
              </Text>{' '}
              and{' '}
              <Text
                style={styles.link}
                onPress={() => openLegal('https://masterg.ai/')}
              >
                Privacy Policy
              </Text>
            </AppText>
          </AppView>

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
        <LegalWebviewModal
          visible={legalModalVisible}
          url={legalUrl}
          onClose={() => setLegalModalVisible(false)}
        />
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

  pasteButton: {
    marginBottom: spacing.md,
    alignItems: 'center',
  },

  divider: {
    width: 160,
    height: 1,
    marginBottom: 12,
    opacity: 0.9,
    transform: [{ scaleX: 0.85 }],
  },

  OtpButtonTextSelected: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginBottom: spacing.md,
    zIndex: 1,
    padding: 2,
  },
  checkboxWrapper: {
    marginRight: 8,
  },
  consentText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.textSecondary || '#666',
    marginBottom: spacing.sm,
    padding: 2,
  },
  link: {
    color: colors.primary || '#0066cc',
    textDecorationLine: 'underline',
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
    zIndex: 0,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
