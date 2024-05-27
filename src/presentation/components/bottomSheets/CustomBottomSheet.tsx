import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import TextField from '../textFields/TextField';
import {useTheme} from '../../provider/ThemeProvider';
import Divider from '../divider/Divider';
import Spacer from '../spacer/Spacer';
import TextView from '../textViews/TextView';
import Button from '../buttons/Button';

//Make alias for confirmation bottom sheet
interface ConfirmationBottomSheetProps {
  children: React.ReactNode;
}

const CustomBottomSheet = ({children}: ConfirmationBottomSheetProps) => {
  const {colors, typography, spacing, radius} = useTheme();

  // Init container style
  const _containerStyle: ViewStyle = {
    width: '100%',
    alignItems: 'center',
    paddingTop: spacing.small,
    paddingBottom: spacing.medium,
    paddingHorizontal: spacing.medium,
    backgroundColor: colors.surface,
    borderTopRightRadius: radius.small,
    borderTopLeftRadius: radius.small,
  };

  return (
    <View style={_containerStyle}>
      {/* Top Devider */}
      <Divider height={4} width={64} color={colors.primarySurface} />
      <Spacer height={spacing.large} />
      {children}
    </View>
  );
};

export default CustomBottomSheet;
