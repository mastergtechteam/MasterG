import React from 'react';
import { View, Text } from 'react-native';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ExpandableSection from './ExpandableSection';
import styles from '../../screens/Cart/styles';
import { colors } from '../../theme/colors';

const SummarySection = ({
  total,
  SHIPPING_CHARGE,
  taxAmount,
  finalTotal,
  expandedSections,
  toggleSection,
}) => {
  return (
    <ExpandableSection
      title="Bill Summary"
      section="summary"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
      icon={
        <MaterialDesignIcons name="receipt" size={20} color={colors.primary} />
      }
    >
      <View style={styles.summaryItem}>
        <Text style={styles.itemName}>Subtotal</Text>
        <Text style={styles.itemPrice}>₹{total}</Text>
      </View>

      <View style={styles.summaryItem}>
        <Text style={styles.itemName}>Shipping</Text>
        <Text style={styles.itemPrice}>₹{SHIPPING_CHARGE}</Text>
      </View>

      <View style={styles.summaryItem}>
        <Text style={styles.itemName}>Tax (5%)</Text>
        <Text style={styles.itemPrice}>₹{taxAmount}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalPrice}>₹{finalTotal}</Text>
      </View>
    </ExpandableSection>
  );
};

export default SummarySection;
