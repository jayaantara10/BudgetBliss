import {ColorScheme, darkScheme, lightScheme} from './ColorScheme';
import {Sizing, defaultRadius, defaultSpacing} from './Sizing';
import {Typography, defaultTypography} from './Typography';

// Make alias for theme
export type Theme = {
  lightScheme: ColorScheme;
  darkScheme: ColorScheme;
  typography: Typography;
  spacing: Sizing;
  radius: Sizing;
};

// Make theme
export const defaultTheme: Theme = {
  lightScheme: lightScheme,
  darkScheme: darkScheme,
  typography: defaultTypography,
  spacing: defaultSpacing,
  radius: defaultRadius,
};
