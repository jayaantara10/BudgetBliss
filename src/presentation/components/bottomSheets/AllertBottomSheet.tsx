import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import TextField from '../textFields/TextField';
import {useTheme} from '../../provider/ThemeProvider';
import Divider from '../divider/Divider';
import Spacer from '../spacer/Spacer';
import TextView from '../textViews/TextView';
import Button from '../buttons/Button';

//Make alias for confirmation bottom sheet
interface AllertBottomSheetProps {
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
}

const AllertBottomSheet = ({
  title,
  description,
  confirmLabel,
  onConfirm,
}: AllertBottomSheetProps) => {
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
      <Button label={confirmLabel} onPress={onConfirm} />
    </View>
  );
};

export default AllertBottomSheet;
