import React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import Header from '../../components/common/Header';

import { useCartScreen } from './useCartScreen';
import styles from './styles';

import EmptyCart from '../../components/Cart/EmptyCart';
import CartList from '../../components/Cart/CartList';
import BillingSection from '../../components/Cart/BillingSection';
import DeliverySection from '../../components/Cart/DeliverySection';
import SummarySection from '../../components/Cart/SummarySection';
import PlaceOrderButton from '../../components/Cart/PlaceOrderButton';
import PaymentModal from '../../components/Cart/PaymentModal';
import OrderConfirmationModal from '../../components/Cart/OrderConfirmationModal';
import OrderSuccessModal from '../../components/Cart/OrderSuccessModal';
import OrderProcessingLoader from '../../components/common/OrderProcessingLoader';
import { SafeAreaView } from 'react-native-safe-area-context';

const CartScreen = () => {
  const {
    cartItems,
    total,
    finalTotal,
    taxAmount,
    SHIPPING_CHARGE,
    DELIVERY_TIME,
    billingAddress,
    ShopName,
    expandedSections,
    toggleSection,
    modalVisible,
    setModalVisible,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    orderConfirmationVisible,
    setOrderConfirmationVisible,
    orderPlaced,
    setOrderPlaced,
    navigation,
    dispatch,
    handlePaymentMethod,
    placingOrder,
  } = useCartScreen();

  console.log(cartItems, 11);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {placingOrder ? (
        <OrderProcessingLoader />
      ) : cartItems.length === 0 ? (
        <EmptyCart navigation={navigation} />
      ) : (
        <ScrollView style={styles.scrollView}>
          <CartList cartItems={cartItems} dispatch={dispatch} />

          <BillingSection
            billingAddress={billingAddress}
            ShopName={ShopName}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />

          <DeliverySection
            DELIVERY_TIME={DELIVERY_TIME}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />

          <SummarySection
            total={total}
            SHIPPING_CHARGE={SHIPPING_CHARGE}
            taxAmount={taxAmount}
            finalTotal={finalTotal}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />

          <PlaceOrderButton
            finalTotal={finalTotal}
            onPress={() => setModalVisible(true)}
          />
        </ScrollView>
      )}

      <PaymentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        finalTotal={finalTotal}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        setOrderConfirmationVisible={setOrderConfirmationVisible}
      />

      <OrderConfirmationModal
        visible={orderConfirmationVisible}
        onClose={() => setOrderConfirmationVisible(false)}
        cartItems={cartItems}
        finalTotal={finalTotal}
        DELIVERY_TIME={DELIVERY_TIME}
        onConfirm={() => {
          setOrderConfirmationVisible(false);
          handlePaymentMethod(selectedPaymentMethod);
        }}
      />

      <OrderSuccessModal
        visible={orderPlaced}
        DELIVERY_TIME={DELIVERY_TIME}
        onClose={() => setOrderPlaced(false)}
      />
    </SafeAreaView>
  );
};

export default CartScreen;
