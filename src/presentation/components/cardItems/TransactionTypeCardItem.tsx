import {View, Text, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import Ripple from 'react-native-material-ripple';
import IconView, {IconSource} from '../icons/IconView';
import Spacer from '../spacer/Spacer';
import TextView from '../textViews/TextView';
import {useTheme} from '../../provider/ThemeProvider';
// Make Alias for transaction type
interface TransactionTypeCardItemProps {
  iconName: string;
  iconSource: IconSource;
  transactionName: string;
  onPress: () => void;
  isActive: boolean;
}
const TransactionTypeCardItem = ({
  iconName,
  iconSource,
  transactionName,
  onPress,
  isActive,
}: TransactionTypeCardItemProps) => {
  // Get colors and typography from provider
  const {colors, typography, spacing, radius} = useTheme();

  // Init container style
  const _containerStyle: ViewStyle = {
    width: '100%',
    height: 64,
    borderRadius: radius.small,
    overflow: 'hidden',
    backgroundColor: isActive ? colors.primary : undefined,
    borderWidth: isActive ? 0 : 1.5,
    borderColor: colors.primary,
  };

  // Init ripple style
  const _rippleStyle: ViewStyle = {
    ...{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  };

  // Init label style
  const _labelStyle: TextStyle = {
    ...{
      color: isActive ? colors.secondary : colors.onSurcface,
    },
  };

  // Init icon color
  const _iconColor: string = isActive ? colors.secondary : colors.onSurcface;

  // Init content spacing
  const _contentSpacing: number = spacing.small;

  return (
    <View style={_containerStyle}>
      <Ripple
        rippleColor={colors.onPrimary}
        style={_rippleStyle}
        onPress={onPress}>
        <IconView
          name={iconName}
          source={iconSource}
          color={_iconColor}
          size={34}
        />
        <Spacer width={_contentSpacing} />
        <TextView
          text={transactionName}
          style={_labelStyle}
          type="title-medium"
        />
      </Ripple>
    </View>
  );
};

export default TransactionTypeCardItem;
