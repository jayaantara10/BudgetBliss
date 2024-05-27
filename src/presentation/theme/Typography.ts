import {TextStyle} from 'react-native';

// Make alias for typography
export type Typography = {
  displayLarge: TextStyle;
  displayMedium: TextStyle;
  displaySmall: TextStyle;
  headlineLarge: TextStyle;
  headlineMedium: TextStyle;
  headlineSmall: TextStyle;
  titleLarge: TextStyle;
  titleMedium: TextStyle;
  titleSmall: TextStyle;
  bodyLarge: TextStyle;
  bodyMedium: TextStyle;
  bodySmall: TextStyle;
  labelLarge: TextStyle;
  labelMedium: TextStyle;
  labelSmall: TextStyle;
};

// Make typography
export const defaultTypography: Typography = {
  displayLarge: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 57,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 45,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 36,
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 32,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 28,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 24,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 22,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
  },
  bodyLarge: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
  },
  labelLarge: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 16,
  },
};
