import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddRetailerScreen from '../screens/AddRetailerScreen';
import ViewRetailersScreen from '../screens/ViewRetailersScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function SalesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddRetailer" component={AddRetailerScreen} />
      <Stack.Screen name="ViewRetailers" component={ViewRetailersScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
