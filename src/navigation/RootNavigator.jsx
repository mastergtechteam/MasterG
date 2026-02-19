import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import LanguageSelectionScreen from '../screens/language/LanguageSelectionScreen';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import GetUserLocationScreen from '../screens/GetUserLocation/GetUserLocationScreen';
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen
        name="LanguageSelection"
        component={LanguageSelectionScreen}
      />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="GetLocation" component={GetUserLocationScreen} />
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  );
}
