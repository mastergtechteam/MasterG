import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';
import { typography } from '../src/theme/typography';

export const lightTheme = {
  mode: 'light',

  colors: {
    background: colors.white,
    text: colors.gray900,
    primary: colors.primary,
    card: colors.gray100,
    border: colors.gray300,
  },

  spacing,
  typography,
};
