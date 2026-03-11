import React from 'react';
import { View, Text } from 'react-native';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ExpandableSection from './ExpandableSection';
import styles from '../../screens/Cart/styles';
import { colors } from '../../theme/colors';

const BillingSection = ({
  billingAddress,
  ShopName,
  expandedSections,
  toggleSection,
}) => {
  const isAddressEmpty =
    !billingAddress ||
    (!billingAddress.line1 &&
      !billingAddress.line2 &&
      !billingAddress.area &&
      !billingAddress.city &&
      !billingAddress.state &&
      !billingAddress.pincode);

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
        {!isAddressEmpty ? (
          <>
            {ShopName ? (
              <Text style={styles.billingAddress}>{ShopName}</Text>
            ) : null}

            {billingAddress.line1 ? (
              <Text style={styles.billingAddress}>{billingAddress.line1}</Text>
            ) : null}

            <Text style={styles.billingAddress}>{billingAddress.area}</Text>

            <Text style={styles.billingAddress}>
              {billingAddress.city}, {billingAddress.state}
            </Text>

            <Text style={styles.billingZip}>{billingAddress.pincode}</Text>
          </>
        ) : (
          <Text style={styles.billingText}>
            Please complete your profile or add an address.
          </Text>
        )}
      </View>
    </ExpandableSection>
  );
};

export default BillingSection;
