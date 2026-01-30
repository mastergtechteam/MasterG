import { TouchableOpacity, ActivityIndicator } from 'react-native';
import AppText from './AppText';
import { useTheme } from '../../hooks/useTheme';

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}) {
  const { theme } = useTheme();

  const backgroundColor =
    variant === 'primary' ? theme.colors.primary : theme.colors.card;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        backgroundColor,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.sm,
        borderRadius: 8,
        opacity: disabled ? 0.6 : 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        ...style,
      }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.text} />
      ) : (
        <AppText color="white" style={style}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
}
