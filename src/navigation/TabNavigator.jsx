import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackNavigator from './StackNavigator';
import VoiceScreen from '../screens/Voice/VoiceScreen';
import InsightsScreen from '../screens/Insights/InsightsScreen';
import CartScreen from '../screens/Cart/CartScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import OrdersScreen from '../screens/Order/OrderScreen';
const Tab = createBottomTabNavigator();

function MicButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.micButton}
    >
      <Ionicons name="mic" size={26} color="#000" />
    </TouchableOpacity>
  );
}

export default function SalesTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: {
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" size={size} color={color} />
          ),
        }}
      />

      {/* CENTER MIC */}
      <Tab.Screen
        name="Mic"
        component={VoiceScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => null,
          tabBarButton: props => <MicButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#1c1c1e', // dark pill background
    borderTopWidth: 0,
    elevation: 10, // Android shadow
    marginHorizontal: 10,
  },
  micButton: {
    top: -30,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
  },
});
