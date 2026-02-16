import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppSafeArea from '../../components/common/AppSafeArea';
import AppText from '../../components/common/AppText';
import AppButton from '../../components/common/AppButton';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const SettingsScreen = () => {
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: () => console.log('User logged out'),
        style: 'destructive',
      },
    ]);
  };

  const handleReportIssue = () => {
    Alert.alert(
      'Report Issue',
      'Thank you for reporting. We will look into it.',
    );
  };

  const SettingItem = ({ icon, label, onPress, rightElement }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={colors.primary}
          style={styles.settingIcon}
        />
        <AppText style={styles.settingLabel}>{label}</AppText>
      </View>
      {rightElement || (
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={colors.textSecondary}
        />
      )}
    </TouchableOpacity>
  );

  const SectionTitle = ({ title }) => (
    <AppText style={styles.sectionTitle}>{title}</AppText>
  );

  return (
    <AppSafeArea>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <AppText style={styles.headerTitle}>Settings</AppText>
          <AppText color="textSecondary" style={styles.headerSubtitle}>
            Manage your preferences
          </AppText>
        </View>

        {/* Account Settings Section */}
        <View style={styles.section}>
          <SectionTitle title="ACCOUNT" />
          <View style={styles.sectionContent}>
            <SettingItem
              icon="account-circle"
              label="Edit Profile"
              onPress={() => console.log('Edit Profile')}
            />
            <SettingItem
              icon="email"
              label="Email Address"
              onPress={() => console.log('Email Address')}
            />
            <SettingItem
              icon="phone"
              label="Phone Number"
              onPress={() => console.log('Phone Number')}
            />
            <SettingItem
              icon="lock"
              label="Change Password"
              onPress={() => console.log('Change Password')}
            />
            <SettingItem
              icon="map-marker"
              label="My Addresses"
              onPress={() => console.log('My Addresses')}
            />
          </View>
        </View>

        {/* Help & Support Section */}
        <View style={styles.section}>
          <SectionTitle title="HELP & SUPPORT" />
          <View style={styles.sectionContent}>
            <SettingItem
              icon="help-circle"
              label="FAQ"
              onPress={() => console.log('FAQ')}
            />
            <SettingItem
              icon="chat"
              label="Contact Us"
              onPress={() => console.log('Contact Us')}
            />
            <SettingItem
              icon="bug-report"
              label="Report an Issue"
              onPress={handleReportIssue}
            />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <SectionTitle title="ABOUT" />
          <View style={styles.sectionContent}>
            <SettingItem
              icon="information"
              label="About App"
              onPress={() => console.log('About App')}
            />
            <View style={styles.versionInfo}>
              <AppText color="textSecondary" style={styles.versionText}>
                Version 1.0.0
              </AppText>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <AppButton
          title="Logout"
          onPress={handleLogout}
          style={styles.logoutButton}
          variant="secondary"
        />

        <View style={{ height: spacing.lg }} />
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xs,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: spacing.md,
    width: 24,
  },
  settingLabel: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  versionInfo: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  versionText: {
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
  },
  logoutButton: {
    marginVertical: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.error,
    borderRadius: 8,
  },
});

export default SettingsScreen;
