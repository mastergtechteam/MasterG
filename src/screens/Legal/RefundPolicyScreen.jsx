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

export default function RefundPolicyScreen({ navigation }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      id: 1,
      title: 'Refund Eligibility',
      content:
        'You are eligible for a refund if your order contains damaged, expired, or incorrect items. Refunds are applicable for orders canceled before delivery. Orders with perishable items must be reported within 24 hours of delivery. Non-perishable items can be returned within 7 days of delivery with original packaging intact.',
    },
    {
      id: 2,
      title: 'How to Request a Refund',
      content:
        'To request a refund, go to "My Orders" in your FreshMart app, select the order, and choose "Report Issue" or "Return Item". Alternatively, contact our Customer Support team with your order number and photos of the damaged items. Our team will review your request within 24 hours and process accordingly.',
    },
    {
      id: 3,
      title: 'Refund Processing Time',
      content:
        'Once your refund is approved, it typically takes 5-7 business days to reflect in your original payment method. For UPI and card payments, it may appear within 2-3 business days. You will receive a notification once your refund is processed. During holidays or weekends, processing may take slightly longer.',
    },
    {
      id: 4,
      title: 'Partial Refunds',
      content:
        'If only some items in your order are damaged or defective, we offer a partial refund for those items only. The refund amount will be calculated based on the current price of the affected items. Delivery charges are non-refundable unless the entire order is canceled before fulfillment.',
    },
    {
      id: 5,
      title: 'Store Credit Option',
      content:
        'In addition to monetary refunds, you can choose to receive store credit worth 110% of the refund amount. This generous option allows you to shop more while we help with the inconvenience. Store credit never expires and can be used anytime on your future purchases.',
    },
    {
      id: 6,
      title: 'Non-Refundable Items',
      content:
        'Custom orders, items purchased during flash sales, or discounted items are generally non-refundable unless they arrive damaged. Final sale items and promotional bundles are also non-refundable. However, we will always replace damaged or defective products at no cost.',
    },
    {
      id: 7,
      title: 'Refund for Expired Products',
      content:
        'If any item is expired or expires within 2 days of delivery, we will issue a full refund or replace it immediately. Photos of the expiry date must be provided. We take product quality seriously and will investigate any quality issues with our suppliers.',
    },
    {
      id: 8,
      title: 'Cancellation & Full Refund',
      content:
        'Orders can be canceled anytime before they are packed for delivery. Full refunds are issued for canceled orders if no delivery charges were incurred. Cancellations are processed within 24 hours, and refunds appear in your account within 5-7 business days.',
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
      <GoBackHeader title="Refund Policy" showSearch={false} />

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
            At FreshMart Grocery, customer satisfaction is our priority. This
            Refund Policy outlines our commitment to ensuring a smooth and fair
            refund process for all transactions.
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
          <Text style={styles.footerTitle}>Need Help with a Refund?</Text>
          <Text style={styles.footerText}>
            This Refund Policy was last updated on February 14, 2025. If you
            have any questions or concerns about your refund, please contact our
            dedicated support team.
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
