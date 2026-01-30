import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

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
