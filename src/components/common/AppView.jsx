// import { View } from 'react-native';
// import { useTheme } from '../../hooks/useTheme';

// export default function AppView({ children, style }) {
//   const { theme } = useTheme();

//   return (
//     <View
//       style={[
//         {
//           // flex: 1,
//           backgroundColor: theme.colors.background,
//         },
//         style,
//       ]}
//     >
//       {children}
//     </View>
//   );
// }
import { View } from 'react-native';
import { colors } from '../../theme/colors';

export default function AppView({ children, style }) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.background,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
