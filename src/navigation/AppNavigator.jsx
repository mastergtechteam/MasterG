import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ProductsScreen from '../screens/Product/ProductsScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import DealsScreen from '../screens/Deals/DealsScreen';
import ProductsDetailsScreen from '../screens/Product/ProductsDetailsScreen';
import DealProductsScreen from '../screens/Deals/DealProductsScreen';
import CartScreen from '../screens/Cart/CartScreen';
import SearchScreen from '../screens/search/SearchScreen';

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
      <Stack.Screen name="DealProducts" component={DealProductsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
