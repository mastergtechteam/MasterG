// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useTheme } from '../../hooks/useTheme';

// export default function AppSafeArea({ children, style }) {
//   const { theme } = useTheme();

//   return (
//     <SafeAreaView
//       style={[
//         {
//           flex: 1,
//           backgroundColor: theme.colors.background,
//         },
//         style,
//       ]}
//     >
//       {children}
//     </SafeAreaView>
//   );
// }
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { StatusBar } from 'react-native';

export default function AppSafeArea({ children, style }) {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
        },
        style,
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      {children}
    </SafeAreaView>
  );
}
