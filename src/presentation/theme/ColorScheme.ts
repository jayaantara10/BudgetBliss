// Make Alias for color scheme
export type ColorScheme = {
  primary: string;
  onPrimary: string;
  primarySurface: string;
  onPrimarySurface: string;
  secondary: string;
  onSecondary: string;
  secondarySurface: string;
  onSecondarySurface: string;
  tertiary: string;
  onTertiary: string;
  tertiarySurface: string;
  onTertiarySurface: string;
  surface: string;
  onSurcface: string;
  error: string;
  onError: string;
  errorSurface: string;
  onErrorSurface: string;
  disabled: string;
  onDisabled: string;
  shadow: string;
};

// Make light color scheme
export const lightScheme: ColorScheme = {
  primary: '#033431',
  onPrimary: '#C09561',
  primarySurface: '#BBCCCB',
  onPrimarySurface: '#032E2B',
  secondary: '#C09561',
  onSecondary: '#033431',
  secondarySurface: '#EAE5D7',
  onSecondarySurface: '#544029',
  tertiary: '#F1DECD',
  onTertiary: '#8D6C43',
  tertiarySurface: '#F6F7F3',
  onTertiarySurface: '#574E46',
  surface: '#F8FFFF',
  onSurcface: '#002220',
  error: '#BA1A1A',
  onError: '#F8FFFF',
  errorSurface: '#FFDAD6',
  onErrorSurface: '#BA1A1A',
  disabled: '#BABFBF',
  onDisabled: '#033431',
  shadow: '#000000',
};

// Make Dark color scheme
export const darkScheme: ColorScheme = {
  primary: '#0E3F3C',
  onPrimary: '#BE9A6F',
  primarySurface: '#043C38',
  onPrimarySurface: '#53B4AD',
  secondary: '#BE9A6F',
  onSecondary: '#0E3F3C',
  secondarySurface: '#4A5340',
  onSecondarySurface: '#E3C7A4',
  tertiary: '#F1E3D7',
  onTertiary: '#8D6C43',
  tertiarySurface: '#495B54',
  onTertiarySurface: '#F1E3D7',
  surface: '#002220',
  onSurcface: '#F8FFFF',
  error: '#BA1A1A',
  onError: '#F8FFFF',
  errorSurface: '#41181B',
  onErrorSurface: '#D8000F',
  disabled: '#4D6463',
  onDisabled: '#172C2A',
  shadow: '#00FFF1',
};
