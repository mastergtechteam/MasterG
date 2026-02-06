import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import VoiceScreen from '../screens/Voice/VoiceScreen';
import InsightsScreen from '../screens/Insights/InsightsScreen';
import OrderScreen from '../screens/Order/OrderScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ProductsScreen from '../screens/Product/ProductsScreen';
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Insights" component={InsightsScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Voice" component={VoiceScreen} />
    </Stack.Navigator>
  );
}
