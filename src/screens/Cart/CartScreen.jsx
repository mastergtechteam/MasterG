import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/common/Header';
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} from '../../features/cart/cartSlice';

import {
  selectCartItemsArray,
  selectCartTotal,
} from '../../features/cart/cartSelectors';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderConfirmationVisible, setOrderConfirmationVisible] =
    useState(false);
  const [expandedSections, setExpandedSections] = useState({
    billing: false,
    summary: false,
    delivery: false,
  });

  // ✅ ARRAY selector (safe for map)
  const cartItems = useSelector(selectCartItemsArray);
  const total = useSelector(selectCartTotal);

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const DELIVERY_TIME = '3-5 business days';
  const SHIPPING_CHARGE = 50;
  const TAX_RATE = 0.05; // 5% tax
  const taxAmount = Math.round(total * TAX_RATE);
  const finalTotal = total + SHIPPING_CHARGE + taxAmount;

  // Billing details (static)
  const billingAddress = {
    name: 'John Doe',
    phone: '+91 98765 43210',
    email: 'john.doe@example.com',
    address: '123 Green Street, Eco Park',
    city: 'Mumbai, Maharashtra',
    zipCode: '400 001',
  };

  // const handlePaymentMethod = method => {
  //   if (method === 'COD') {
  //     setModalVisible(false);
  //     setOrderPlaced(true);
  //     Alert.alert('Order Placed', 'Your order has been placed successfully!');
  //     setTimeout(() => {
  //       setOrderPlaced(false);
  //     }, 2000);
  //   } else {
  //     Alert.alert(`${method} Payment`, `${method} payment processing...`);
  //   }
  // };

  const handlePaymentMethod = async method => {
    const orderPayload = {
      retailerId: 'RET00001', // ✅ hardcoded

      items: cartItems.map(({ product, quantity }) => ({
        productId: product.id,
        productName: product.name,
        quantity: quantity,
        unit: product.unit || 'UNIT', // fallback if unit not present
        price: product.discountedPrice,
      })),

      billing: {
        deliveryCharge: SHIPPING_CHARGE,
        discount: 0, // you can change later
        tax: taxAmount,
      },

      payment: {
        mode: method, // COD / UPI / Card
      },

      delivery: {
        type: 'HOME_DELIVERY',
        expectedDeliveryTime: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000,
        ).toISOString(), // +3 days
      },
    };

    // ✅ Console original object
    console.log('ORDER PAYLOAD:', orderPayload);

    try {
      const response = await fetch(
        'https://2a0t2oahs8.execute-api.ap-south-1.amazonaws.com/api/v1/order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderPayload),
        },
      );

      const text = await response.text(); // safer than response.json()

      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = {};
      }

      console.log('STATUS:', response.status);
      console.log('API RESPONSE:', data);

      if (response.status >= 200 && response.status < 300) {
        dispatch(clearCart()); // empty cart
        setModalVisible(false);
        setOrderConfirmationVisible(false);
        setOrderPlaced(true);

        setTimeout(() => {
          setOrderPlaced(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'App' }],
          });
        }, 3000);
      } else {
        Alert.alert(
          'Order Failed',
          data?.message || `Server error (${response.status})`,
        );
      }
    } catch (error) {
      console.log('ORDER ERROR:', error);
      Alert.alert('Network Error', 'Please check your internet connection.');
    }
  };

  const ExpandableSection = ({ title, icon, section, children }) => {
    const isExpanded = expandedSections[section];

    return (
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(section)}
          activeOpacity={0.7}
        >
          <View style={styles.sectionHeaderLeft}>
            <View style={styles.sectionIconBox}>{icon}</View>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
          <MaterialIcons
            name={isExpanded ? 'expand-less' : 'expand-more'}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>

        {isExpanded && <View style={styles.sectionContent}>{children}</View>}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {cartItems.length === 0 ? (
        // Empty Cart State
        <View style={styles.emptyCartContainer}>
          <View style={styles.emptyCartIconBox}>
            <MaterialDesignIcons
              name="cart-off"
              size={80}
              color={colors.primary}
            />
          </View>
          <Text style={styles.emptyCartTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptyCartSubtitle}>
            Looks like you haven't added any items yet
          </Text>

          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => navigation.navigate('Categories')}
          >
            <MaterialDesignIcons
              name="shopping-outline"
              size={20}
              color={colors.white}
              style={styles.browseBtnIcon}
            />
            <Text style={styles.browseBtnText}>Browse Categories</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Cart with Items
        <ScrollView style={styles.scrollView}>
          <View style={styles.itemsContainer}>
            {cartItems.map(({ product, quantity }) => (
              <View key={product.id} style={styles.cartItem}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />

                <View style={styles.itemDetails}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.description}>{product.weight}</Text>
                  <Text style={styles.price}>₹{product.discountedPrice}</Text>
                </View>

                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    onPress={() => dispatch(decrementQuantity(product.id))}
                  >
                    <Text style={styles.quantityText}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.quantityValue}>{quantity}</Text>

                  <TouchableOpacity
                    onPress={() => dispatch(incrementQuantity(product.id))}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => dispatch(removeItem(product.id))}
                  style={styles.deleteBtn}
                >
                  <MaterialDesignIcons
                    name="delete-outline"
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Billing Details */}
          <ExpandableSection
            title="Billing Address"
            section="billing"
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
              <Text style={styles.billingAddress}>
                {billingAddress.address}
              </Text>
              <Text style={styles.billingAddress}>{billingAddress.city}</Text>
              <Text style={styles.billingZip}>{billingAddress.zipCode}</Text>
            </View>
          </ExpandableSection>

          {/* Delivery Time */}
          <ExpandableSection
            title="Estimated Delivery"
            section="delivery"
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

          {/* Bill Summary */}
          <ExpandableSection
            title="Bill Summary"
            section="summary"
            icon={
              <MaterialDesignIcons
                name="receipt"
                size={20}
                color={colors.primary}
              />
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

          <TouchableOpacity
            style={styles.placeOrderBtn}
            onPress={() => setOrderConfirmationVisible(true)}
          >
            <Text style={styles.placeOrderText}>Proceed to pay</Text>
            <Text style={styles.placeOrderPrice}>₹{finalTotal}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Order Confirmation Modal */}
      <Modal
        transparent={true}
        visible={orderConfirmationVisible}
        onRequestClose={() => setOrderConfirmationVisible(false)}
      >
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
                <Text style={styles.confirmationDetailValue}>
                  ₹{finalTotal}
                </Text>
              </View>
              <View style={styles.confirmationDivider} />
              <View style={styles.confirmationDetailItem}>
                <Text style={styles.confirmationDetailLabel}>
                  Delivery Time
                </Text>
                <Text style={styles.confirmationDetailValue}>
                  {DELIVERY_TIME}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.placeOrderConfirmBtn}
              onPress={() => {
                setOrderConfirmationVisible(false);
                setModalVisible(true);
              }}
            >
              <MaterialDesignIcons
                name="check-circle"
                size={20}
                color={colors.white}
                style={{ marginRight: spacing.sm }}
              />
              <Text style={styles.placeOrderConfirmText}>Place Order</Text>
            </TouchableOpacity>

            <Pressable
              style={styles.confirmationCancelBtn}
              onPress={() => setOrderConfirmationVisible(false)}
            >
              <Text style={styles.confirmationCancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Order Confirmed Modal */}
      <Modal
        transparent={true}
        visible={orderPlaced}
        onRequestClose={() => setOrderPlaced(false)}
      >
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

            <Text style={styles.thanksText}>
              Thank you for your purchase! 🛍️
            </Text>
          </View>
        </View>
      </Modal>

      {/* Payment Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Payment Method</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
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
                onPress={() => handlePaymentMethod('UPI')}
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
                onPress={() => handlePaymentMethod('Card')}
              >
                <View style={styles.paymentMethodIcon}>
                  <MaterialDesignIcons
                    name="credit-card"
                    style={styles.paymentIcon}
                  />
                </View>
                <View style={styles.paymentMethodInfo}>
                  <Text style={styles.paymentMethodName}>
                    Credit/Debit Card
                  </Text>
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
                onPress={() => handlePaymentMethod('COD')}
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

            <Pressable
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: 50,
  },
  itemsContainer: {
    marginBottom: spacing.lg,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  price: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  deleteBtn: {
    marginLeft: spacing.sm,
    marginRight: spacing.sm,
  },
  deleteIcon: {
    fontSize: 20,
    color: colors.white,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  quantityBtn: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  quantityText: {
    fontSize: typography.fontSize.lg,
    color: colors.primary,
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    marginHorizontal: spacing.sm,
    minWidth: 20,
    textAlign: 'center',
  },

  // Expandable Section Styles
  sectionContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIconBox: {
    marginRight: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  sectionContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.surfaceElevated,
  },

  // Billing Details
  billingDetails: {
    paddingTop: spacing.md,
  },
  billingName: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  billingText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  billingAddress: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    lineHeight: 18,
  },
  billingZip: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },

  // Delivery Time
  deliveryTime: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: '600',
    marginTop: spacing.sm,
  },

  // Bill Summary
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemName: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  itemDesc: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  itemPrice: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  totalLabel: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  totalPrice: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.primary,
  },
  placeOrderBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    marginHorizontal: spacing.md,
    marginBottom: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  placeOrderText: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.black,
  },
  placeOrderPrice: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.black,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  closeIcon: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  paymentAmountBox: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  paymentAmountLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  paymentAmount: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.primary,
  },
  paymentMethodsContainer: {
    marginBottom: spacing.lg,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  paymentMethodIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  paymentIcon: {
    fontSize: 28,
    color: colors.primary,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  paymentMethodDesc: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  chevronIcon: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  modalClose: {
    backgroundColor: colors.border,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  // Order Confirmation Modal Styles
  confirmationModalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  confirmationHeader: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
  },
  confirmationTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  confirmationSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  confirmationDetails: {
    width: '100%',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  confirmationDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  confirmationDetailLabel: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  confirmationDetailValue: {
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    color: colors.primary,
  },
  confirmationDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  placeOrderConfirmBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  placeOrderConfirmText: {
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    color: colors.white,
  },
  confirmationCancelBtn: {
    width: '100%',
    backgroundColor: colors.border,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  confirmationCancelText: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  // Order Confirmed Modal Styles
  confirmedModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmedModalContent: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    marginHorizontal: spacing.lg,
  },
  celebrationContainer: {
    marginBottom: spacing.lg,
  },
  partyPopper: {
    fontSize: 80,
  },
  confirmedTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  confirmedSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  confirmedDetails: {
    width: '100%',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  confirmedDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  confirmedDetailText: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    marginLeft: spacing.md,
    flex: 1,
  },
  thanksText: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
  },
  // Empty Cart Styles
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  emptyCartIconBox: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 100,
  },
  emptyCartTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyCartSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  browseBtn: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  browseBtnIcon: {
    marginRight: spacing.sm,
  },
  browseBtnText: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.white,
  },
});
