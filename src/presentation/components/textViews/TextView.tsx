import {View, Text, TextStyle} from 'react-native';
import React from 'react';
import {useTheme} from '../../provider/ThemeProvider';
// Make alias for text type
type TextType =
  | 'display-large'
  | 'display-medium'
  | 'display-small'
  | 'headline-large'
  | 'headline-medium'
  | 'headline-small'
  | 'title-large'
  | 'title-medium'
  | 'title-small'
  | 'label-large'
  | 'label-medium'
  | 'label-small'
  | 'body-large'
  | 'body-medium'
  | 'body-small';

// Make alias for text view props
interface TextViewProps {
  text: string;
  type?: TextType;
  style?: TextStyle;
}

// Make text view component
const TextView = ({text, type, style}: TextViewProps) => {
  // provide color and typography from theme provider
  const {colors, typography} = useTheme();

  // Init text type
  const _type: TextType = type ?? 'body-medium';

  // Init text style
  const _style: TextStyle = {
    ...(type == 'display-large'
      ? typography.displayLarge
      : type == 'display-medium'
      ? typography.displayMedium
      : type == 'display-small'
      ? typography.displaySmall
      : type == 'headline-large'
      ? typography.headlineLarge
      : type == 'headline-medium'
      ? typography.headlineMedium
      : type == 'headline-small'
      ? typography.headlineSmall
      : type == 'title-large'
      ? typography.titleLarge
      : type == 'title-medium'
      ? typography.titleMedium
      : type == 'title-small'
      ? typography.titleSmall
      : type == 'body-large'
      ? typography.bodyLarge
      : type == 'body-medium'
      ? typography.bodyMedium
      : type == 'body-small'
      ? typography.bodySmall
      : type == 'label-large'
      ? typography.labelLarge
      : type == 'label-medium'
      ? typography.labelMedium
      : type == 'label-small'
      ? typography.labelSmall
      : typography.bodyMedium),
    ...{color: colors.onSurcface},
    ...style,
  };

  return <Text style={_style}>{text}</Text>;
};

export default TextView;
