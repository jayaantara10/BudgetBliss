import {
  View,
  Text,
  ViewStyle,
  Animated,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {OnBoardingItem} from '../../screens/onboarding/OnBoardingPage';
import {useTheme} from '../../provider/ThemeProvider';
// Make alias for page indicator props
interface PageIndicatorProps {
  data: OnBoardingItem[];
  scrollX: Animated.Value;
}
const PageIndicator = ({data, scrollX}: PageIndicatorProps) => {
  //Get theme
  const {colors, spacing, radius} = useTheme();

  // Get screen width
  const {width} = useWindowDimensions();

  // Init container style
  const _containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
  };

  // Init indicator style
  const _indicatorStyle: ViewStyle = {
    height: 8,
    borderRadius: radius.extraSmall,
    backgroundColor: colors.secondary,
    marginHorizontal: spacing.extraSmall,
  };
  return (
    <View style={_containerStyle}>
      {data.map((_, index) => {
        // Calculate input range
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        // Calculate indicator width
        const indicatorWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });

        // Calculate opacity
        const indicatorOpacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={{
              ..._indicatorStyle,
              width: indicatorWidth,
              opacity: indicatorOpacity,
            }}
            key={index.toString()}
          />
        );
      })}
    </View>
  );
};

export default PageIndicator;
