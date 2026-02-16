import React from 'react';
import { Text } from 'react-native';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ExpandableSection from './ExpandableSection';
import styles from '../../screens/Cart/styles';
import { colors } from '../../theme/colors';

const DeliverySection = ({
  DELIVERY_TIME,
  expandedSections,
  toggleSection,
}) => {
  return (
    <ExpandableSection
      title="Estimated Delivery"
      section="delivery"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
      icon={
        <MaterialDesignIcons
          name="truck-delivery"
          size={20}
          color={colors.primary}
        />
      }
    >
      <Text style={styles.deliveryTime}>{DELIVERY_TIME}</Text>
    </ExpandableSection>
  );
};

export default DeliverySection;
