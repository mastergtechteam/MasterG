import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider } from './waste/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { routingInstrumentation } from './src/config/sentry';
import { navigationRef } from './src/navigation/navigationRef';
import {
  requestNotificationPermission,
  getFCMToken,
  setupNotificationListeners,
} from './src/config/notifications';

export default function App() {
  useEffect(() => {
    requestNotificationPermission().then(granted => {
      if (granted) {
        getFCMToken();
      }
    });
    return setupNotificationListeners();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <LanguageProvider>
            <NavigationContainer
              ref={navigationRef}
              onReady={() =>
                routingInstrumentation.registerNavigationContainer(
                  navigationRef,
                )
              }
            >
              <RootNavigator />
            </NavigationContainer>
          </LanguageProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
