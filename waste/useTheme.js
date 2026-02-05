import { useThemeContext } from '../../waste/ThemeContext';

export const useTheme = () => {
  const { theme, toggleTheme, isDark } = useThemeContext();
  return { theme, toggleTheme, isDark };
};
