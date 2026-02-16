import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import GoBackHeader from '../../components/common/GoBackHeader';

export default function PrivacyPolicyScreen({ navigation }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      id: 1,
      title: 'Information We Collect',
      content:
        'We collect information you provide directly, including account details, delivery addresses, payment information, and phone numbers. We also automatically collect device information, app usage patterns, location data (with your permission), and browsing history to improve your shopping experience.',
    },
    {
      id: 2,
      title: 'Purpose of Data Collection',
      content:
        'We use your data to process and deliver orders, personalize your shopping experience, recommend products, provide customer support, process payments securely, send promotional offers and updates, and improve our app features and services.',
    },
    {
      id: 3,
      title: 'Data Security',
      content:
        'We implement industry-standard security measures including SSL encryption for all transactions, secure payment gateways, regular security audits, and access controls. Your financial information is never stored on our servers and is processed by PCI-compliant payment providers only.',
    },
    {
      id: 4,
      title: 'Sharing of Data',
      content:
        'We share your information only with trusted partners necessary to fulfill your orders, including delivery partners, payment processors, and customer support services. We never sell your personal data to third parties. All partners are bound by strict confidentiality agreements.',
    },
    {
      id: 5,
      title: 'Cookies & Analytics',
      content:
        'We use cookies and analytics tools to understand your preferences, track app performance, and enhance user experience. You can control cookie preferences through your device settings. This helps us provide better service and relevant product recommendations.',
    },
    {
      id: 6,
      title: 'Your Rights',
      content:
        'You have the right to access, update, delete, or export your personal data. You can opt-out of promotional communications anytime. You can also request data portability or erasure of your account. Contact our support team to exercise any of these rights.',
    },
    {
      id: 7,
      title: 'Data Retention',
      content:
        'We retain order history and account information for 5 years to comply with tax regulations and customer service needs. Payment information is retained only for the duration necessary for transaction processing. You can request data deletion anytime.',
    },
    {
      id: 8,
      title: 'Policy Updates',
      content:
        'We may update this Privacy Policy to reflect changes in our practices or applicable laws. We will notify you of significant changes via the app. Your continued use of FreshMart after updates constitutes your acceptance of the revised policy.',
    },
  ];

  const toggleSection = id => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const ExpandableSection = ({ section }) => {
    const isExpanded = expandedSection === section.id;

    return (
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(section.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.sectionTitle}>
            {section.id}. {section.title}
          </Text>
          <MaterialIcons
            name={isExpanded ? 'expand-less' : 'expand-more'}
            size={28}
            color={colors.primary}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.sectionContent}>
            <Text style={styles.contentText}>{section.content}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <GoBackHeader title="Privacy Policy" showSearch={false} />

      {/* Divider */}
      <View style={styles.divider} />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Intro Text */}
        <View style={styles.introSection}>
          <Text style={styles.introText}>
            At FreshMart Grocery, your privacy is of paramount importance. This
            Privacy Policy explains how we collect, store, use, and safeguard
            your personal and sensitive information when using our app and
            services.
          </Text>
        </View>

        {/* Sections */}
        <View style={styles.sectionsWrapper}>
          {sections.map(section => (
            <ExpandableSection key={section.id} section={section} />
          ))}
        </View>

        {/* Footer Contact Info */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerTitle}>Questions or Concerns?</Text>
          <Text style={styles.footerText}>
            These Terms & Conditions were last updated on February 14, 2025. If
            you have any questions, please contact our Customer Care team.
          </Text>

          <View style={styles.contactInfo}>
            <MaterialIcons name="phone" size={18} color={colors.primary} />
            <Text style={styles.contactText}>+91 99903 18880</Text>
          </View>

          <View style={styles.contactInfo}>
            <MaterialIcons name="phone" size={18} color={colors.primary} />
            <Text style={styles.contactText}>+91 99181 90555</Text>
          </View>

          <View style={styles.contactInfo}>
            <MaterialIcons name="email" size={18} color={colors.primary} />
            <Text style={styles.contactText}>privacy@freshmart.com</Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  introSection: {
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  introText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 22,
    fontWeight: '500',
  },
  sectionsWrapper: {
    marginBottom: spacing.lg,
  },
  sectionContainer: {
    marginBottom: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  sectionContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  contentText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 22,
    fontWeight: '400',
  },
  footerContainer: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  footerTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
    fontWeight: '400',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingVertical: spacing.xs,
  },
  contactText: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
    fontWeight: '500',
  },
});
