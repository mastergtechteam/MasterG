import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

export default function AppSafeArea({ children, style }) {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}
