import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  Text,
} from 'react-native';
import AppSafeArea from '../../components/common/AppSafeArea';
import AppText from '../../components/common/AppText';
import AppButton from '../../components/common/AppButton';
import BannerCrousel from '../../components/Home/BannerCrousel';
import Header from '../../components/common/Header';
import ActionCard from '../../components/Home/ActionCard';
import AlertStrip from '../../components/Home/AlertStrip';
import DealsList from '../../components/Home/DealsList';
import InsightCard from '../../components/Home/InsightCard';
import CategoriesSection from '../../components/Home/CategoriesSection';
import { useNavigation } from '@react-navigation/native';
import CartBottomTab from '../../components/common/cartBottomTab';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSpeakOrder = () => {
    navigation.navigate('Mic');
  };
  const handleQuickBuy = () => {
    navigation.navigate('Orders');
  };

  return (
    <AppSafeArea>
      <View style={{ flex: 1, marginBottom: 20 }}>
        <FlatList
          data={[]} // dummy data
          keyExtractor={() => 'key'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
          ListHeaderComponent={
            <>
              <Header />
              <BannerCrousel />

              <CategoriesSection />

              <DealsList />
              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  paddingHorizontal: 16,
                  marginBottom: 16,
                }}
              >
                <ActionCard
                  icon="mic"
                  title="Speak & Order"
                  subtitle="Order in seconds using voice"
                  onPress={handleSpeakOrder}
                />

                <ActionCard
                  icon="cart"
                  title="Quick Buy"
                  subtitle="Buy frequently ordered items"
                  iconBgColor="#143620"
                  onPress={handleQuickBuy}
                />
              </View>
              {/* <AlertStrip /> */}
              {/* <InsightCard /> */}
            </>
          }
        />
        <CartBottomTab />
      </View>
    </AppSafeArea>
  );
};

export default HomeScreen;
