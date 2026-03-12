import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ProductsScreen from '../screens/Product/ProductsScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import DealsScreen from '../screens/Deals/DealsScreen';
import ProductsDetailsScreen from '../screens/Product/ProductsDetailsScreen';
import DealProductsScreen from '../screens/Deals/DealProductsScreen';
import CartScreen from '../screens/Cart/CartScreen';
import SearchScreen from '../screens/search/SearchScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ViewOrderScreen from '../screens/Order/ViewOrderScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import TermsAndConditionsScreen from '../screens/Legal/TermsAndConditionsScreen';
import PrivacyPolicyScreen from '../screens/Legal/PrivacyPolicyScreen';
import RefundPolicyScreen from '../screens/Legal/RefundPolicyScreen';
import FAQScreen from '../screens/Legal/FAQScreen';
import ContactUsScreen from '../screens/Legal/ContactUsScreen';
import ReportScreen from '../screens/Legal/ReportScreen';

const Stack = createNativeStackNavigator();

/**
 * AppNavigator - Main application navigation structure
 *
 * Architecture:
 * ├── Tab Navigator (Bottom-level - Foundation)
 * │   ├── Home (with StackNavigator)
 * │   ├── Insights
 * │   ├── Voice (Mic)
 * │   ├── Orders
 * │   └── Cart
 * └── Global Stack Screens (Accessible from anywhere)
 *     ├── Profile
 *     ├── Settings
 *     ├── Legal Screens (Terms, Privacy, Refund)
 *     ├── Product Details
 *     ├── Search
 *     └── Other global screens
 *
 * Navigation Rules:
 * 1. Tab Navigator is the foundation
 * 2. Global screens overlay on top
 * 3. Settings screen contains navigation to legal screens, edit profile, and logout
 * 4. All detail/modal screens are in global stack
 *
 * Benefits:
 * - Simpler architecture without DrawerNavigator
 * - All settings/legal screens accessible from Settings screen
 * - Cleaner navigation flow
 */
export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        cardOverlayEnabled: true,
      }}
    >
      {/* FOUNDATION: Tab Navigator (5 main tabs) */}
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{
          animationEnabled: false,
        }}
      />

      {/* GLOBAL SCREENS - Accessible from anywhere in the app */}

      {/* Profile & User Screens */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />

      {/* Legal Screens */}
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
      />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="RefundPolicy" component={RefundPolicyScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="ReportIssue" component={ReportScreen} />

      {/* Product Screens */}
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Product-Details" component={ProductsDetailsScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />

      {/* Deals & Offers */}
      <Stack.Screen name="Deals" component={DealsScreen} />
      <Stack.Screen name="DealProducts" component={DealProductsScreen} />

      {/* Shopping */}
      <Stack.Screen name="Cart" component={CartScreen} />

      {/* Search & Discovery */}
      <Stack.Screen name="Search" component={SearchScreen} />

      {/* Authentication & Registration */}
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Orders */}
      <Stack.Screen name="ViewOrder" component={ViewOrderScreen} />
    </Stack.Navigator>
  );
}
