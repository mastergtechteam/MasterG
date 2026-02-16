// import React from 'react';
// import { View, Text, Modal } from 'react-native';
// import styles from '../../screens/Cart/styles';

// const OrderSuccessModal = ({ visible, DELIVERY_TIME }) => {
//   return (
//     <Modal transparent visible={visible}>
//       <View style={styles.confirmedModalOverlay}>
//         <View style={styles.confirmedModalContent}>
//           <Text style={{ fontSize: 80 }}>🎉</Text>
//           <Text>Order Confirmed!</Text>
//           <Text>Estimated delivery: {DELIVERY_TIME}</Text>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default OrderSuccessModal;
// import React from 'react';
// import { View, Text, Modal } from 'react-native';
// import styles from '../../screens/Cart/styles';

// const OrderSuccessModal = ({ visible, DELIVERY_TIME }) => {
//   return (
//     <Modal
//       transparent={true}
//       visible={orderPlaced}
//       onRequestClose={() => setOrderPlaced(false)}
//     >
//       <View style={styles.confirmedModalOverlay}>
//         <View style={styles.confirmedModalContent}>
//           <View style={styles.celebrationContainer}>
//             <Text style={styles.partyPopper}>🎉</Text>
//           </View>

//           <Text style={styles.confirmedTitle}>Order Confirmed!</Text>
//           <Text style={styles.confirmedSubtitle}>
//             Your order has been placed successfully
//           </Text>

//           <View style={styles.confirmedDetails}>
//             <View style={styles.confirmedDetailRow}>
//               <MaterialDesignIcons
//                 name="check-circle"
//                 size={20}
//                 color={colors.primary}
//               />
//               <Text style={styles.confirmedDetailText}>
//                 Order confirmed and processing
//               </Text>
//             </View>
//             <View style={styles.confirmedDetailRow}>
//               <MaterialDesignIcons
//                 name="truck-delivery"
//                 size={20}
//                 color={colors.primary}
//               />
//               <Text style={styles.confirmedDetailText}>
//                 Estimated delivery: {DELIVERY_TIME}
//               </Text>
//             </View>
//             <View style={styles.confirmedDetailRow}>
//               <MaterialDesignIcons
//                 name="email-outline"
//                 size={20}
//                 color={colors.primary}
//               />
//               <Text style={styles.confirmedDetailText}>
//                 Confirmation sent to email
//               </Text>
//             </View>
//           </View>

//           <Text style={styles.thanksText}>Thank you for your purchase! 🛍️</Text>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default OrderSuccessModal;
import React from 'react';
import { View, Text, Modal } from 'react-native';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../screens/Cart/styles';
import { colors } from '../../theme/colors';

const OrderSuccessModal = ({ visible, DELIVERY_TIME, onClose }) => {
  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.confirmedModalOverlay}>
        <View style={styles.confirmedModalContent}>
          <View style={styles.celebrationContainer}>
            <Text style={styles.partyPopper}>🎉</Text>
          </View>

          <Text style={styles.confirmedTitle}>Order Confirmed!</Text>
          <Text style={styles.confirmedSubtitle}>
            Your order has been placed successfully
          </Text>

          <View style={styles.confirmedDetails}>
            <View style={styles.confirmedDetailRow}>
              <MaterialDesignIcons
                name="check-circle"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.confirmedDetailText}>
                Order confirmed and processing
              </Text>
            </View>

            <View style={styles.confirmedDetailRow}>
              <MaterialDesignIcons
                name="truck-delivery"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.confirmedDetailText}>
                Estimated delivery: {DELIVERY_TIME}
              </Text>
            </View>

            <View style={styles.confirmedDetailRow}>
              <MaterialDesignIcons
                name="email-outline"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.confirmedDetailText}>
                Confirmation sent to email
              </Text>
            </View>
          </View>

          <Text style={styles.thanksText}>Thank you for your purchase! 🛍️</Text>
        </View>
      </View>
    </Modal>
  );
};

export default OrderSuccessModal;
