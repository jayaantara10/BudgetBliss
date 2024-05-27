import {View, Text, ViewStyle, ImageURISource, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamNavigator} from '../../navigations/ParamNavigator';
import SvgUri from 'react-native-svg-uri';
import {useTheme} from '../../provider/ThemeProvider';
import {TextStyle} from 'react-native';
import TextView from '../../components/textViews/TextView';
import {useTranslation} from 'react-i18next';
import Spacer from '../../components/spacer/Spacer';
import {useNavigation} from '@react-navigation/native';
import Page from '../../components/container/Page';
import {useAuth} from '../../provider/AuthProvder';

// Init navigation prop
type SplashScreenNavigationProp = StackNavigationProp<ParamNavigator, 'Splash'>;

const SplashScreen = () => {
  // UI ==============================================================================================
  //Get theme
  const {colors, spacing, colorScheme} = useTheme();

  //Get translator
  const {t} = useTranslation();

  // Get navigation
  const navigation = useNavigation<SplashScreenNavigationProp>();

  // Init logo color
  const _logoColor = colors.secondary;

  // Init app name text style
  const _appName: TextStyle = {
    fontWeight: 'bold',
  };

  // Init quote text style
  const _quoteStyle: TextStyle = {
    textAlign: 'center',
  };

  // Init logo
  const _logo: ImageURISource =
    colorScheme == 'dark'
      ? require('../../../../assets/vectors/ic_budget_bliss_dark.svg')
      : require('../../../../assets/vectors/ic_budget_bliss.svg');

  // Init Fade Animation reff
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  //Running animation
  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  //Quote Animated View Style
  const _animatedStyle: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.extraLarge,
    opacity: fadeAnimation,
  };

  // Go to onboarding
  const goToOnboarding = () => {
    navigation.replace('OnBoarding');
  };

  // Go to onboarding
  const goToHome = () => {
    navigation.replace('Home');
  };

  // LOGIC ==============================================================================================

  // Get auth
  const {user, initializing} = useAuth();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        goToHome();
      }, 4000);
    } else {
      setTimeout(() => {
        goToOnboarding();
      }, 4000);
    }
  }, [initializing]);

  return (
    <Page>
      <Animated.View style={_animatedStyle}>
        <SvgUri width="100" height="100" source={_logo} />
        <Spacer height={spacing.medium} />
        <TextView
          text={t('app_name')}
          type="headline-medium"
          style={_appName}
        />
      </Animated.View>
    </Page>
  );
};

export default SplashScreen;
