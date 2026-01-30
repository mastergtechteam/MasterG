import { useThemeContext } from '../context/ThemeContext';

export const useTheme = () => {
  const { theme, toggleTheme, isDark } = useThemeContext();
  return { theme, toggleTheme, isDark };
};
