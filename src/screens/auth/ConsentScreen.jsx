import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';

import AppText from '../../components/common/AppText';
import AppButton from '../../components/common/AppButton';
import LegalWebviewModal from '../../components/common/LegalWebviewModal';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import AppSafeArea from '../../components/common/AppSafeArea';
import LinearGradient from 'react-native-linear-gradient';
import { BASE_URL } from '../../api/apiClient';

const ConsentScreen = () => {
  const navigation = useNavigation();
  const retailerId = useSelector(state => state.retailer.profile?.retailerId);

  const [legalVisible, setLegalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [consentGiven, setConsentGiven] = useState(null);
  const [autoNavigating, setAutoNavigating] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logo = require('../../assets/images/light-logo.png');

  /**
   * Fade animation
   */
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  /**
   * Check consent from API
   */
  const checkConsent = useCallback(async () => {
    if (!retailerId) return;

    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/consent/${retailerId}`);

      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }

      const data = await response.json();
      if (data?.consentGiven === true) {
        setAutoNavigating(true);

        // setTimeout(() => {
        //   navigation.replace('GetLocation');
        // }, 1200);

        return;
      }

      setConsentGiven(false);
    } catch (error) {
      console.warn('Consent check failed:', error);
      setConsentGiven(false);
    } finally {
      setLoading(false);
    }
  }, [retailerId, navigation]);

  /**
   * Run consent check when retailerId is available
   */
  useEffect(() => {
    if (retailerId) {
      checkConsent();
    }
  }, [retailerId, checkConsent]);

  /**
   * Save consent
   */
  const saveConsent = async () => {
    if (!retailerId) return;

    try {
      setSubmitting(true);

      const payload = {
        retailerId,
        timestamp: new Date().toISOString(),
        appVersion: DeviceInfo.getVersion(),
      };

      const response = await fetch(`${BASE_URL}/consent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`POST failed ${response.status}`);
      }

      await checkConsent();
    } catch (error) {
      console.warn('Consent save failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigation.replace('Auth');
  };

  /**
   * Show loader while checking initial consent
   */
  if (loading && consentGiven === null) {
    return (
      <AppSafeArea
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" />
      </AppSafeArea>
    );
  }

  if (autoNavigating) {
    return (
      <AppSafeArea style={styles.redirectContainer}>
        <Animated.View style={[styles.redirectContent, { opacity: fadeAnim }]}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />

          <LinearGradient
            colors={['#000000', '#FFFFFF', '#FFFFFF', '#000000']}
            locations={[0, 0.25, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.divider}
          />

          <AppText style={styles.subtitle}>B2B Voice Ordering Platform</AppText>

          <View style={styles.redirectBox}>
            <ActivityIndicator size="large" color={colors.primary} />

            <AppText style={styles.redirectTitle}>You're all set!</AppText>

            <AppText style={styles.redirectText}>
              We’ve verified your consent. Taking you to location setup...
            </AppText>
          </View>
        </Animated.View>
      </AppSafeArea>
    );
  }

  return (
    <AppSafeArea style={{ padding: spacing.lg }}>
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

      <View style={styles.container}>
        <AppText style={styles.heading}>Age & Platform Consent</AppText>

        <ScrollView style={styles.body}>
          <AppText style={styles.paragraph}>
            Our products contain nicotine and are intended for adults only. By
            giving consent you confirm that you are 18 years or older and that
            you understand a delivery person may ask for age proof upon
            delivery. We only ship to customers who provide this confirmation.
          </AppText>

          <AppText style={styles.paragraph}>
            Please read our full terms and legal information before proceeding.
          </AppText>

          <TouchableOpacity onPress={() => setLegalVisible(true)}>
            <Text style={[styles.paragraph, styles.linkText]}>
              View detailed policy
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.buttonRow}>
          <AppButton
            title={submitting ? 'Saving...' : 'I Understand & Agree'}
            onPress={saveConsent}
            style={styles.primaryButton}
            disabled={submitting}
          />

          <AppButton
            title="Cancel"
            variant="secondary"
            onPress={handleCancel}
            style={styles.secondaryButton}
            disabled={submitting}
          />
        </View>

        <LegalWebviewModal
          visible={legalVisible}
          url="https://masterg.ai/"
          onClose={() => setLegalVisible(false)}
        />
      </View>
    </AppSafeArea>
  );
};

export default ConsentScreen;

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

  container: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.background || '#fff',
  },

  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: spacing.md,
    textAlign: 'center',
  },

  body: {
    flex: 1,
    marginBottom: spacing.md,
  },

  paragraph: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  linkText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  buttonRow: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingVertical: spacing.sm,
  },

  primaryButton: {
    marginBottom: spacing.sm,
  },

  secondaryButton: {},
  redirectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },

  redirectContent: {
    alignItems: 'center',
    width: '100%',
  },

  redirectBox: {
    marginTop: 40,
    alignItems: 'center',
  },

  redirectTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },

  redirectText: {
    marginTop: 6,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
