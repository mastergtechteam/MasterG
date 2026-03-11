import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForceUpdateScreen() {
  const route = useRoute<any>();
  const { storeUrl } = route.params;

  const openStore = () => {
    if (storeUrl) {
      Linking.openURL(storeUrl);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <View style={styles.content}>
        <Text style={styles.title}>Update Required</Text>
        <Text style={styles.message}>
          A new version of MasterG is available. Please update to continue using
          the app.
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={openStore}
        >
          <Text style={styles.buttonText}>Update Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // semi-transparent dark overlay so underlying UI is dimmed but still hinting at content
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    textAlign: 'center',
  },
});
