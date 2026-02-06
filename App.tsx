// import { NavigationContainer } from '@react-navigation/native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import RootNavigator from './src/navigation/RootNavigator';
// import { ThemeProvider } from './src/context/ThemeContext';

// export default function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <NavigationContainer>
//         <ThemeProvider>
//           <RootNavigator />
//         </ThemeProvider>
//       </NavigationContainer>
//     </GestureHandlerRootView>
//   );
// }
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider } from './waste/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <LanguageProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </LanguageProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
