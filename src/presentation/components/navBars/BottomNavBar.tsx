import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import {useTheme} from '../../provider/ThemeProvider';
import Ripple from 'react-native-material-ripple';
import IconView from '../icons/IconView';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import LottieView from 'lottie-react-native';
import LogoLight from '../../../assets/vectors/ic_budget_bliss.svg';
import LogoDark from '../../../assets/vectors/ic_budget_bliss_dark.svg';

// Make alias for bottom nav props

interface BottomNavBarProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  onAddPress: () => void;
}
const BottomNavBar = ({
  state,
  descriptors,
  navigation,
  onAddPress,
}: BottomNavBarProps) => {
  // Get theme
  const {colors, spacing, radius, typography, colorScheme} = useTheme();

  // Get screen width
  const {width} = useWindowDimensions();

  // Calculate nav bar container width
  const _containerWidth: number = width - spacing.medium * 2;

  //Init container style
  const _containerStyle: ViewStyle = {
    flexDirection: 'row',
    width: _containerWidth,
    height: 64,
    position: 'absolute',
    bottom: spacing.medium,
    // borderTopWidth: 1,
    // borderTopColor: colors.disabled,
    backgroundColor: colors.primary,
    alignSelf: 'center',
    borderRadius: radius.small,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  };

  // Set button add financial record style
  const _addButtonContainerStyle: ViewStyle = {
    position: 'absolute',
    top: -(_containerWidth / 5) / 3 + 8,
    left: (_containerWidth / 5) * 2 + 8,
    borderRadius: 50,
    overflow: 'hidden',
  };
  // Set button shadow add financial record style
  const _addButtonShadowStyle: ViewStyle = {
    position: 'absolute',
    top: -(_containerWidth / 5) / 3 + 4,
    left: (_containerWidth / 5) * 2 + 4,
    height: _containerWidth / 5 - 8,
    width: _containerWidth / 5 - 8,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: colors.secondary,
  };

  // Set button add financial record shadow style
  const _addButtonRippleStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    height: _containerWidth / 5 - 16,
    width: _containerWidth / 5 - 16,
    backgroundColor: colors.surface,
    borderTopColor: colors.disabled,
  };

  // Set top line style
  const _topLineStyle: ViewStyle = {
    width: _containerWidth,
    height: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: colors.secondary,
  };
  return (
    <View style={_containerStyle}>
      {state.routes.map((route, index) => {
        // Get nav tab options
        const {options} = descriptors[route.key];

        // Set icon base on route name
        const icon =
          route.name == 'Dashboard'
            ? require('../../../assets/lottie/lottie_home.json')
            : route.name == 'Planning'
            ? require('../../../assets/lottie/lottie_cheklist.json')
            : route.name == 'Insight'
            ? require('../../../assets/lottie/lottie_announcment.json')
            : require('../../../assets/lottie/lottie_filter_item.json');

        // detect focussed
        const isFocused = state.index === index;

        //Set container item style
        const _containerItemStyle: ViewStyle = {
          flex: 1,
          marginStart: index == 2 ? _containerWidth / 5 + 8 : 0,
          borderRadius: _containerWidth / 5 / 2,
          overflow: 'hidden',
        };

        /// Set ripple style for item
        const _rippleItemStyle: ViewStyle = {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        };

        // Handle on press
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        // Handle long press
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          // Navbar item
          <View key={index} style={_containerItemStyle}>
            <Ripple
              rippleColor={colors.secondary}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={_rippleItemStyle}>
              <LottieView
                source={icon}
                autoPlay
                loop={isFocused}
                style={{width: 32, height: 32}}
                colorFilters={[
                  {
                    keypath: 'Layer 1 Outlines',
                    color: colors.onPrimary,
                  },
                  {
                    keypath: 'Layer 2 Outlines',
                    color: colors.onPrimary,
                  },
                  {
                    keypath: 'Layer 3 Outlines',
                    color: colors.onPrimary,
                  },
                  {
                    keypath: 'Layer 4 Outlines',
                    color: colors.onPrimary,
                  },
                  {
                    keypath: 'Layer 5 Outlines',
                    color: colors.onPrimary,
                  },
                ]}
              />
            </Ripple>
          </View>
        );
      })}
      <View style={_topLineStyle} />
      <View style={_addButtonShadowStyle} />
      {/* Add button */}
      <View style={_addButtonContainerStyle}>
        <Ripple
          style={_addButtonRippleStyle}
          rippleColor={colors.onPrimary}
          onPress={onAddPress}>
          {colorScheme == 'light' ? (
            <LogoLight width="24" height="24" fill={colors.secondary} />
          ) : (
            <LogoDark width="24" height="24" fill={colors.secondary} />
          )}
        </Ripple>
      </View>
    </View>
  );
};

export default BottomNavBar;
