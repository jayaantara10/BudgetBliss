import {View, Text, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import IconView, {IconSource} from '../icons/IconView';
import {useTheme} from '../../provider/ThemeProvider';
import Ripple from 'react-native-material-ripple';
import Spacer from '../spacer/Spacer';
import TextView from '../textViews/TextView';
// Make alias for setting item props
interface SettingItemProps {
  label: string;
  iconName: string;
  iconSource: IconSource;
  isNegative?: boolean;
  onPress: () => void;
}
const SettingsItem = ({
  label,
  iconName,
  isNegative = false,
  onPress,
}: SettingItemProps) => {
  // Get colors and typography from provider
  const {colors, typography, spacing, radius} = useTheme();

  // Init container style
  const _containerStyle: ViewStyle = {
    width: '100%',
    height: 52,
    borderRadius: radius.small,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  };

  // Init ripple style
  const _rippleStyle: ViewStyle = {
    ...{
      flex: 1,
      alignItems: 'center',
      //   justifyContent: 'center',
      flexDirection: 'row',
    },
  };

  return (
    <View style={_containerStyle}>
      <Ripple
        rippleColor={colors.onPrimary}
        style={_rippleStyle}
        onPress={onPress}>
        <Spacer width={spacing.medium} />
        <IconView
          name={iconName}
          source={'material-icons'}
          color={isNegative ? colors.error : colors.onSurcface}
          size={24}
        />
        <Spacer width={spacing.medium} />
        <TextView
          text={label}
          type="title-medium"
          style={{
            flex: 1,
            color: isNegative ? colors.error : colors.onSurcface,
          }}
        />
        <IconView
          name={'arrow-forward-ios'}
          source={'material-icons'}
          color={isNegative ? colors.error : colors.onSurcface}
          size={24}
        />
        <Spacer width={spacing.medium} />
      </Ripple>
    </View>
  );
};

export default SettingsItem;
