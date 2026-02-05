import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddRetailerScreen from '../screens/AddRetailerScreen';
import ViewRetailersScreen from '../screens/ViewRetailersScreen';
import DetailsScreen from '../screens/DetailsScreen';
import VoiceScreen from '../screens/VoiceScreen';
import InsightsScreen from '../screens/InsightsScreen';
import OrderScreen from '../screens/OrderScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductsScreen from '../screens/ProductsScreen';
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="AddRetailer" component={AddRetailerScreen} />
      <Stack.Screen name="ViewRetailers" component={ViewRetailersScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Insights" component={InsightsScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Voice" component={VoiceScreen} />
    </Stack.Navigator>
  );
}
