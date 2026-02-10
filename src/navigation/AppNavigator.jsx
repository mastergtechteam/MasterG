import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ProductsScreen from '../screens/Product/ProductsScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import DealsScreen from '../screens/Deals/DealsScreen';
import ProductsDetailsScreen from '../screens/Product/ProductsDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />

      {/* 🔥 GLOBAL SCREENS */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Product-Details" component={ProductsDetailsScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Deals" component={DealsScreen} />
    </Stack.Navigator>
  );
}
