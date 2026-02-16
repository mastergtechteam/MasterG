// import React from 'react';
// import { View, Text, Modal, TouchableOpacity } from 'react-native';
// import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import styles from '../../screens/Cart/styles';

// const PaymentModal = ({
//   visible,
//   onClose,
//   finalTotal,
//   setSelectedPaymentMethod,
//   setOrderConfirmationVisible,
// }) => {
//   const selectMethod = method => {
//     setSelectedPaymentMethod(method);
//     onClose();
//     setOrderConfirmationVisible(true);
//   };

//   return (
//     <Modal
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//       animationType="slide"
//     >
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <Text>Choose Payment Method</Text>

//           <TouchableOpacity onPress={() => selectMethod('UPI')}>
//             <Text>UPI</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => selectMethod('Card')}>
//             <Text>Card</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => selectMethod('COD')}>
//             <Text>Cash on Delivery</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={onClose}>
//             <Text>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default PaymentModal;

import React from 'react';
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../screens/Cart/styles';

const PaymentModal = ({
  visible,
  onClose,
  finalTotal,
  setSelectedPaymentMethod,
  setOrderConfirmationVisible,
}) => {
  const selectMethod = method => {
    setSelectedPaymentMethod(method);
    onClose();
    setOrderConfirmationVisible(true);
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choose Payment Method</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialDesignIcons name="close" style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.paymentAmountBox}>
            <Text style={styles.paymentAmountLabel}>Amount to pay</Text>
            <Text style={styles.paymentAmount}>₹{finalTotal}</Text>
          </View>

          <View style={styles.paymentMethodsContainer}>
            {/* UPI */}
            <TouchableOpacity
              style={styles.paymentMethod}
              onPress={() => {
                setSelectedPaymentMethod('UPI');
                onClose();
                setOrderConfirmationVisible(true);
              }}
            >
              <View style={styles.paymentMethodIcon}>
                <MaterialDesignIcons
                  name="mobile-payment"
                  style={styles.paymentIcon}
                />
              </View>
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodName}>UPI</Text>
                <Text style={styles.paymentMethodDesc}>
                  Google Pay, PhonePe, Paytm
                </Text>
              </View>
              <MaterialDesignIcons
                name="chevron-right"
                style={styles.chevronIcon}
              />
            </TouchableOpacity>

            {/* Card */}
            <TouchableOpacity
              style={styles.paymentMethod}
              onPress={() => {
                setSelectedPaymentMethod('Card');
                onClose();
                setOrderConfirmationVisible(true);
              }}
            >
              <View style={styles.paymentMethodIcon}>
                <MaterialDesignIcons
                  name="credit-card"
                  style={styles.paymentIcon}
                />
              </View>
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodName}>Credit/Debit Card</Text>
                <Text style={styles.paymentMethodDesc}>
                  Visa, Mastercard, American Express
                </Text>
              </View>
              <MaterialDesignIcons
                name="chevron-right"
                style={styles.chevronIcon}
              />
            </TouchableOpacity>

            {/* COD */}
            <TouchableOpacity
              style={styles.paymentMethod}
              onPress={() => {
                setSelectedPaymentMethod('COD');
                onClose();
                setOrderConfirmationVisible(true);
              }}
            >
              <View style={styles.paymentMethodIcon}>
                <MaterialDesignIcons
                  name="cash-multiple"
                  style={styles.paymentIcon}
                />
              </View>
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodName}>Cash on Delivery</Text>
                <Text style={styles.paymentMethodDesc}>
                  Pay when your order arrives
                </Text>
              </View>
              <MaterialDesignIcons
                name="chevron-right"
                style={styles.chevronIcon}
              />
            </TouchableOpacity>
          </View>

          <Pressable style={styles.modalClose} onPress={onClose}>
            <Text style={styles.modalCloseText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;
