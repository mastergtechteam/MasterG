// import React from 'react';
// import { View, Text, Modal, TouchableOpacity } from 'react-native';
// import styles from '../../screens/Cart/styles';

// const OrderConfirmationModal = ({
//   visible,
//   onClose,
//   cartItems,
//   finalTotal,
//   DELIVERY_TIME,
//   onConfirm,
// }) => {
//   return (
//     <Modal transparent visible={visible} onRequestClose={onClose}>
//       <View style={styles.modalOverlay}>
//         <View style={styles.confirmationModalContent}>
//           <Text>Ready to Place Order?</Text>

//           <Text>
//             You're about to place an order with {cartItems.length} item
//             {cartItems.length > 1 ? 's' : ''}
//           </Text>

//           <Text>Total: ₹{finalTotal}</Text>
//           <Text>Delivery: {DELIVERY_TIME}</Text>

//           <TouchableOpacity onPress={onConfirm}>
//             <Text>Place Order</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={onClose}>
//             <Text>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default OrderConfirmationModal;

import React from 'react';
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../screens/Cart/styles';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
const OrderConfirmationModal = ({
  visible,
  onClose,
  cartItems,
  finalTotal,
  DELIVERY_TIME,
  onConfirm,
}) => {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.confirmationModalContent}>
          <View style={styles.confirmationHeader}>
            <MaterialDesignIcons
              name="shopping-outline"
              size={48}
              color={colors.primary}
            />
          </View>

          <Text style={styles.confirmationTitle}>Ready to Place Order?</Text>
          <Text style={styles.confirmationSubtitle}>
            You're about to place an order with {cartItems.length} item
            {cartItems.length > 1 ? 's' : ''}
          </Text>

          <View style={styles.confirmationDetails}>
            <View style={styles.confirmationDetailItem}>
              <Text style={styles.confirmationDetailLabel}>Order Total</Text>
              <Text style={styles.confirmationDetailValue}>₹{finalTotal}</Text>
            </View>
            <View style={styles.confirmationDivider} />
            <View style={styles.confirmationDetailItem}>
              <Text style={styles.confirmationDetailLabel}>Delivery Time</Text>
              <Text style={styles.confirmationDetailValue}>
                {DELIVERY_TIME}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.placeOrderConfirmBtn}
            onPress={onConfirm}
          >
            <MaterialDesignIcons
              name="check-circle"
              size={20}
              color={colors.white}
              style={{ marginRight: spacing.sm }}
            />
            <Text style={styles.placeOrderConfirmText}>Place Order</Text>
          </TouchableOpacity>

          <Pressable style={styles.confirmationCancelBtn} onPress={onClose}>
            <Text style={styles.confirmationCancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default OrderConfirmationModal;
