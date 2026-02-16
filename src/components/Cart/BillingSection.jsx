import React from 'react';
import { View, Text } from 'react-native';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ExpandableSection from './ExpandableSection';
import styles from '../../screens/Cart/styles';
import { colors } from '../../theme/colors';

const BillingSection = ({
  billingAddress,
  expandedSections,
  toggleSection,
}) => {
  return (
    <ExpandableSection
      title="Billing Address"
      section="billing"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
      icon={
        <MaterialDesignIcons
          name="map-marker"
          size={20}
          color={colors.primary}
        />
      }
    >
      <View style={styles.billingDetails}>
        <Text style={styles.billingName}>{billingAddress.name}</Text>
        <Text style={styles.billingText}>{billingAddress.phone}</Text>
        <Text style={styles.billingText}>{billingAddress.email}</Text>
        <Text style={styles.billingAddress}>{billingAddress.address}</Text>
        <Text style={styles.billingAddress}>{billingAddress.city}</Text>
        <Text style={styles.billingZip}>{billingAddress.zipCode}</Text>
      </View>
    </ExpandableSection>
  );
};

export default BillingSection;
