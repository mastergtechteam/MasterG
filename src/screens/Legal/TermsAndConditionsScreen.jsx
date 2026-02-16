import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import GoBackHeader from '../../components/common/GoBackHeader';

export default function TermsAndConditionsScreen({ navigation }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      id: 1,
      title: 'Account Registration & Eligibility',
      content:
        'By using the FreshMart Grocery app, you agree to provide accurate, complete, and current information during registration. You must be at least 18 years old to create an account. Each user is responsible for maintaining the confidentiality of their login credentials. FreshMart reserves the right to suspend or terminate accounts that violate our terms or engage in fraudulent activity.',
    },
    {
      id: 2,
      title: 'User Responsibilities',
      content:
        'You agree not to use our app for any illegal activities, harassment, or unauthorized access. You are responsible for verifying product information, pricing, and availability before placing orders. Misuse of promotional codes, fake payments, or fraudulent transactions will result in account termination. You must provide accurate delivery addresses and contact information for order fulfillment.',
    },
    {
      id: 3,
      title: 'Product Information & Pricing',
      content:
        'All product descriptions, images, and prices are subject to change without notice. FreshMart makes no warranties regarding product availability or continuous supply. Prices are accurate at the time of checkout. We reserve the right to adjust prices due to supplier changes or market fluctuations. Errors in pricing, descriptions, or availability do not constitute a binding contract until order confirmation is received.',
    },
    {
      id: 4,
      title: 'Order Acceptance & Cancellation',
      content:
        'FreshMart reserves the right to accept, decline, or cancel any order. Orders are confirmed only after payment verification. You may cancel orders before the "Being Packed" status. Cancellations after packing may incur a restocking fee. Orders are subject to product availability at your location. Delivery time estimates are approximate and not guaranteed.',
    },
    {
      id: 5,
      title: 'Payment & Transaction Terms',
      content:
        'We accept multiple payment methods including credit/debit cards, UPI, net banking, and digital wallets. All transactions are secured with SSL encryption. Payment is required at checkout, and your card details are processed by PCI-compliant providers. Failed transactions will not be charged twice. You agree to pay applicable taxes and delivery fees. Unauthorized use of payment methods will result in legal action.',
    },
    {
      id: 6,
      title: 'Delivery & Liability',
      content:
        'FreshMart is not liable for delays caused by weather, traffic, natural disasters, or force majeure events. Delivery timeframes are estimates and may vary based on location and demand. Damaged items must be reported within 24 hours of delivery. Items left unattended are not our responsibility. We are not liable for items ordered by unauthorized users. Insurance for high-value items is optional.',
    },
    {
      id: 7,
      title: 'Intellectual Property & Content',
      content:
        'All content on the FreshMart app, including logos, text, images, and code, is proprietary and protected by copyright laws. You may not reproduce, distribute, or modify any content without permission. User reviews and feedback may be used for platform improvement. We respect third-party intellectual property rights and respond promptly to infringement claims.',
    },
    {
      id: 8,
      title: 'Limitation of Liability & Disputes',
      content:
        'FreshMart is not liable for indirect, incidental, or consequential damages. Our liability is limited to the amount paid for the order. All disputes shall be governed by Indian law and subject to the exclusive jurisdiction of courts in your location. We make no warranties regarding app availability or uninterrupted service. Users agree to indemnify FreshMart from any claims arising from misuse.',
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
      <GoBackHeader title="Terms And Conditions" showSearch={false} />
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
            Welcome to FreshMart Grocery. By accessing and using our app, you
            agree to be bound by these Terms and Conditions. Please read them
            carefully before placing any orders. If you do not agree with any
            term, please do not use our services.
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
          <Text style={styles.footerTitle}>Questions About Our Terms?</Text>
          <Text style={styles.footerText}>
            These Terms & Conditions were last updated on February 14, 2025. If
            you have any questions or concerns, please contact our Customer Care
            team for clarification.
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
            <Text style={styles.contactText}>support@freshmart.com</Text>
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
