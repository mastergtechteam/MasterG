import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';
import { typography } from '../src/theme/typography';

export const darkTheme = {
  mode: 'dark',

  colors: {
    background: colors.black,
    text: colors.white,
    primary: colors.primary,
    card: colors.gray900,
    border: colors.gray500,
  },

  spacing,
  typography,
};
