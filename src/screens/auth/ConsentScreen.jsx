import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  Text,
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

const ConsentScreen = () => {
  const navigation = useNavigation();
  const retailerId = useSelector(state => state.retailer.profile?.retailerId);
  const [legalVisible, setLegalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logo = require('../../assets/images/light-logo.png');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAgree = () => {
    const vendorId = retailerId || 'unknown';
    const timestamp = new Date().toISOString();
    const appVersion = DeviceInfo.getVersion();

    // log data for now; replace with API call later
    console.log('consent_given', { vendorId, timestamp, appVersion });

    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'App' }],
    // });
  };

  const handleCancel = () => {
    navigation.replace('Auth');
  };

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
        <AppText style={styles.heading}>Age &amp; Platform Consent</AppText>
        <ScrollView style={styles.body}>
          <AppText style={styles.paragraph}>
            Our products contain nicotine and are intended for adults only. By
            giving consent you confirm that you are 18&nbsp;years or older and
            that you understand a delivery person may ask for age proof upon
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
            title="I Understand & Agree"
            onPress={handleAgree}
            style={styles.primaryButton}
          />
          <AppButton
            title="Cancel"
            variant="secondary"
            onPress={handleCancel}
            style={styles.secondaryButton}
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
});
