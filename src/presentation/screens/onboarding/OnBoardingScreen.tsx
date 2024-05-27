import {
  View,
  Text,
  ViewStyle,
  FlatList,
  Animated,
  ImageURISource,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamNavigator} from '../../navigations/ParamNavigator';
import OnBoardingPage, {OnBoardingItem} from './OnBoardingPage';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../../provider/ThemeProvider';
import {useNavigation} from '@react-navigation/native';
import PageIndicator from '../../components/indicators/PageIndicator';
import Button from '../../components/buttons/Button';
import SvgUri from 'react-native-svg-uri';
import Page from '../../components/container/Page';
import {useAuth} from '../../provider/AuthProvder';

// Init navigation prop
type OnBoardingScreenNavigationProp = StackNavigationProp<
  ParamNavigator,
  'OnBoarding'
>;

const OnBoardingScreen = () => {
  //Get theme
  const {colors, spacing, colorScheme} = useTheme();

  //Get translator
  const {t} = useTranslation();

  // Get navigation
  const navigation = useNavigation<OnBoardingScreenNavigationProp>();

  //Make list onboarding data
  const onBoardingItems: OnBoardingItem[] = [
    {
      id: '1',
      title: t('on_boarding_1.title'),
      description: t('on_boarding_1.description'),
      illustrationSource: require('../../../../assets/lottie/lottie_business_deadline.json'),
    },
    {
      id: '2',
      title: t('on_boarding_2.title'),
      description: t('on_boarding_2.description'),
      illustrationSource: require('../../../../assets/lottie/lottie_business_sales_profit.json'),
    },
    {
      id: '3',
      title: t('on_boarding_3.title'),
      description: t('on_boarding_3.description'),
      illustrationSource: require('../../../../assets/lottie/lottie_business_target.json'),
    },
  ];

  // Init container style
  const _containerStyle: ViewStyle = {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Init logo
  const _logo: ImageURISource =
    colorScheme == 'dark'
      ? require('../../../../assets/vectors/ic_budget_bliss_dark.svg')
      : require('../../../../assets/vectors/ic_budget_bliss.svg');

  // init incicator and button container style
  const _indicatorContainerStyle: ViewStyle = {
    width: '100%',
    flexDirection: 'row',
    marginBottom: spacing.large,
  };

  // init button container style
  const _buttonContainerStyle: ViewStyle = {
    flex: 1,
    marginHorizontal: spacing.medium,
  };

  // Init reff for scroll animated
  const _scrollX = useRef(new Animated.Value(0)).current;

  // Init slide reff
  const slideReff = useRef(null);

  // Init state for current index
  const [_currentIndex, _setCurrentIndex] = useState(0);

  // Init viewablity config
  const _viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  // Set current index when view is change
  // @ts-ignore
  const viewableItemsChanged = useRef(({viewableItems}) => {
    _setCurrentIndex(viewableItems[0].index);
  }).current;

  // Handle scroll next
  const _scrollNext = () => {
    if (_currentIndex < onBoardingItems.length - 1) {
      if (slideReff.current) {
        // @ts-ignore
        slideReff.current.scrollToIndex({index: _currentIndex + 1});
      }
    }
  };

  // Handle scroll prev
  const _scrollPrev = () => {
    if (_currentIndex > 0) {
      if (slideReff.current) {
        // @ts-ignore
        slideReff.current.scrollToIndex({index: _currentIndex - 1});
      }
    }
  };

  // Go to authentcation screen
  const _goToAuthenticationScreen = () => {
    navigation.replace('Authentication');
  };

  return (
    <Page>
      <View style={_containerStyle}>
        {/* Page */}
        <FlatList
          ref={slideReff}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={32}
          viewabilityConfig={_viewabilityConfig}
          onViewableItemsChanged={viewableItemsChanged}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: _scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          data={onBoardingItems}
          keyExtractor={item => item.id}
          renderItem={({item}) => <OnBoardingPage item={item} />}
        />

        {/* Indicator and button */}
        <View style={_indicatorContainerStyle}>
          {/* Prev button */}
          <View style={_buttonContainerStyle}>
            {_currentIndex != 0 && (
              <Button
                label={t('previous')}
                type="outlined"
                onPress={_scrollPrev}
              />
            )}
          </View>

          {/* Indicator */}
          <PageIndicator data={onBoardingItems} scrollX={_scrollX} />

          {/* Next button */}
          <View style={_buttonContainerStyle}>
            <Button
              label={
                _currentIndex == onBoardingItems.length - 1
                  ? t('start')
                  : t('next')
              }
              type="filled"
              onPress={
                _currentIndex == onBoardingItems.length - 1
                  ? _goToAuthenticationScreen
                  : _scrollNext
              }
            />
          </View>
        </View>
      </View>
    </Page>
  );
};

export default OnBoardingScreen;
