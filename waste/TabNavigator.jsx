// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import StackNavigator from './StackNavigator';
// import ProfileScreen from '../screens/ProfileScreen';

// const Tab = createBottomTabNavigator();
// export default function TabNavigator() {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
//       <Tab.Screen
//         name="HomeTab"
//         component={StackNavigator}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StackNavigator from './StackNavigator';
import ProfileScreen from '../src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={StackNavigator}
        options={{ title: 'Home' }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
