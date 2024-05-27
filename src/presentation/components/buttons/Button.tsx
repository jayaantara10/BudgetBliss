import {View, Text, ViewStyle, TextStyle, DimensionValue} from 'react-native';
import React from 'react';
import Ripple from 'react-native-material-ripple';
import {useTheme} from '../../provider/ThemeProvider';
import TextView from '../textViews/TextView';
import IconView, {IconSource} from '../icons/IconView';
import Spacer from '../spacer/Spacer';

// Make type button
type ButtonType = 'filled' | 'outlined' | 'icon-or-text-only';

// Make alias for button props
interface ButtonProps {
  label?: string;
  iconName?: string;
  type?: ButtonType;
  height?: DimensionValue;
  width?: DimensionValue;
  iconSource?: IconSource;
  disabled?: boolean;
  onPress: () => void;
}

// Make button component
const Button = ({
  label,
  iconName,
  type,
  height,
  width,
  iconSource,
  disabled,
  onPress,
}: ButtonProps) => {
  // Get colors and typography from provider
  const {colors, typography, spacing, radius} = useTheme();

  // Init button type
  const _type = type ?? 'filled';

  // Init bottom style
  const _buttonStyle: ViewStyle = {
    width: width ?? '100%',
    height: height ?? 48,
    borderRadius: radius.small,
    overflow: 'hidden',
    backgroundColor: disabled
      ? colors.disabled
      : _type == 'filled'
      ? colors.primary
      : undefined,
    borderWidth: _type == 'outlined' ? 1.5 : 0,
    borderColor: colors.secondary,
  };

  // Init ripple style
  const _rippleStyle: ViewStyle = {
    ...{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  // Init label style
  const _labelStyle: TextStyle = {
    ...typography.labelLarge,
    ...{
      color: disabled
        ? colors.onDisabled
        : _type == 'filled'
        ? colors.onPrimary
        : colors.secondary,
    },
  };

  // Init icon size
  const _iconSize: number = 16;

  // Init icon color
  const _iconColor: string = disabled
    ? colors.onDisabled
    : _type == 'filled'
    ? colors.onPrimary
    : colors.primary;

  // Init icon source
  const _iconSource: IconSource = iconSource ?? 'material-icons';

  // Init content spacing
  const _contentSpacing: number = spacing.extraSmall;

  return (
    <View style={_buttonStyle}>
      <Ripple
        rippleColor={colors.onPrimary}
        style={_rippleStyle}
        onPress={onPress}>
        {iconName && (
          <IconView
            name={iconName}
            source={_iconSource}
            color={_iconColor}
            size={_iconSize}
          />
        )}
        {iconName && <Spacer width={_contentSpacing} />}
        {label && <TextView text={label} style={_labelStyle} />}
      </Ripple>
    </View>
  );
};

export default Button;
