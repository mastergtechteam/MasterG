import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../src/screens/HomeScreen';
import DetailsScreen from '../src/screens/DetailsScreen';
import SplashScreen from '../src/screens/splash/SplashScreen';
import RoleSelectionScreen from '../src/screens/common/RoleSelectionScreen';
import RetailerLogin from '../src/screens/auth/RetailerLogin';
import SalesLogin from '../src/screens/auth/SalesLogin';
import SalesHomeScreen from '../src/screens/sales/SalesHomeScreen';
import RetailerHomeScreen from '../src/screens/retailer/RetailerHomeScreen';

const Stack = createNativeStackNavigator();
export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen
        name="RoleSelectionScreen"
        component={RoleSelectionScreen}
      />
      <Stack.Screen name="RetailerLogin" component={RetailerLogin} />
      <Stack.Screen name="SalesLogin" component={SalesLogin} />
      <Stack.Screen name="RetailerHomeScreen" component={RetailerHomeScreen} />
      <Stack.Screen name="SalesHomeScreen" component={SalesHomeScreen} />

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
