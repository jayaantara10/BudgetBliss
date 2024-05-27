import {View, Text, Platform, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import {useTheme} from '../../provider/ThemeProvider';
import TextView from '../textViews/TextView';
import Ripple from 'react-native-material-ripple';
import IconView, {IconSource} from '../icons/IconView';
import Spacer from '../spacer/Spacer';

// Make alias for top app bar props
interface TopAppBarProps {
  title: string;
  actionIconName?: string;
  actionIconSource?: IconSource;
  onBackPress: () => void;
  onActionPress?: () => void;
}

const TopAppbar = ({
  title,
  actionIconName,
  actionIconSource,
  onBackPress,
  onActionPress,
}: TopAppBarProps) => {
  // Get theme
  const {colors, typography, spacing, radius} = useTheme();

  // Init base style
  const _baseStyle: ViewStyle = {
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 4,
  };

  // Init container style
  const _containerStyle: ViewStyle = {
    flex: 1,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  };

  // Init back button style
  const _backButtonStyle: ViewStyle = {
    borderRadius: spacing.medium,
    overflow: 'hidden',
  };

  // Init ripple style
  const _rippleStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing.medium,
  };

  // Init title style
  const _titleStyle: TextStyle = {
    flex: 1,
    paddingTop: spacing.extraSmall,
  };

  // Init action icon source
  const _actionIconSource: IconSource = actionIconSource ?? 'material-icons';
  return (
    <View style={_baseStyle}>
      <View style={_containerStyle}>
        <Spacer width={spacing.medium} />
        <View style={_backButtonStyle}>
          <Ripple style={_rippleStyle} onPress={onBackPress}>
            <IconView name="arrow-back-ios" source="material-icons" size={24} />
          </Ripple>
        </View>

        <Spacer width={spacing.medium} />
        <TextView text={title} type="title-large" style={_titleStyle} />
        <Spacer width={spacing.medium} />

        {actionIconName && (
          <View style={_backButtonStyle}>
            <Ripple style={_rippleStyle} onPress={onActionPress}>
              <IconView
                name={actionIconName}
                source={_actionIconSource}
                size={24}
              />
            </Ripple>
          </View>
        )}

        {!actionIconName && <Spacer width={24} />}
        <Spacer width={spacing.medium} />
      </View>
    </View>
  );
};

export default TopAppbar;
