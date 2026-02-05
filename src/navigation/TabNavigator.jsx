// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import ProfileScreen from '../screens/ProfileScreen';
// import StackNavigator from './StackNavigator';
// const Tab = createBottomTabNavigator();

// export default function SalesTabNavigator() {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
//       <Tab.Screen
//         name="HomeTab"
//         component={StackNavigator}
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="person-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
// import React from 'react';
// import { View, TouchableOpacity } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import ProfileScreen from '../screens/ProfileScreen';

// import StackNavigator from './StackNavigator';
// // import InsightsScreen from '../screens/InsightsScreen';
// // import PaymentScreen from '../screens/PaymentScreen';
// // import OrderScreen from '../screens/OrderScreen';

// const Tab = createBottomTabNavigator();

// function MicButton({ onPress }) {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={{
//         top: -20,
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         backgroundColor: '#111',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Ionicons name="mic" size={28} color="#fff" />
//     </TouchableOpacity>
//   );
// }

// export default function SalesTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: true,
//         tabBarStyle: {
//           height: 70,
//           paddingBottom: 8,
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={StackNavigator}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Insights"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="stats-chart-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       {/* CENTER MIC BUTTON */}
//       <Tab.Screen
//         name="Mic"
//         component={View}
//         options={{
//           tabBarIcon: () => null,
//           tabBarButton: props => (
//             <MicButton {...props} onPress={() => console.log('Mic pressed')} />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Payment"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="card-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Order"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="receipt-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import StackNavigator from './StackNavigator';
import VoiceScreen from '../screens/VoiceScreen';
import InsightsScreen from '../screens/InsightsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import OrderScreen from '../screens/OrderScreen';
import ProductsScreen from '../screens/ProductsScreen';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CartScreen from '../screens/CartScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
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
        name="Categories"
        component={CategoriesScreen}
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
