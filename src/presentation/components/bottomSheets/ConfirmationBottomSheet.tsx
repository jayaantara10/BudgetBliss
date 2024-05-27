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
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationBottomSheet = ({
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmationBottomSheetProps) => {
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

      {/* Title */}
      <TextView text={title} type="title-medium" />
      <Spacer height={spacing.medium} />

      {/* Description */}
      <TextView text={description} type="body-medium" />
      <Spacer height={spacing.large} />

      {/* Button */}
      <View style={{flexDirection: 'row', width: '100%'}}>
        {/* Cancel */}
        <View style={{flex: 1}}>
          <Button label={cancelLabel} type="outlined" onPress={onCancel} />
        </View>
        <Spacer width={spacing.medium} />

        {/* Confirm */}
        <View style={{flex: 1}}>
          <Button label={confirmLabel} onPress={onConfirm} />
        </View>
      </View>
    </View>
  );
};

export default ConfirmationBottomSheet;
