import {
  View,
  Text,
  TextStyle,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import React, {useState, useTransition} from 'react';
import {useTheme} from '../../../provider/ThemeProvider';
import TextView from '../../../components/textViews/TextView';
import IconView from '../../../components/icons/IconView';
import Button from '../../../components/buttons/Button';
import TextField from '../../../components/textFields/TextField';
import {useOverlay} from '../../../provider/OverlayProvider';
import ConfirmationBottomSheet from '../../../components/bottomSheets/ConfirmationBottomSheet';
import TopAppbar from '../../../components/appbars/TopAppBar';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamNavigator} from '../../../navigations/ParamNavigator';
import Page from '../../../components/container/Page';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../HomeScreen';
import LottieView from 'lottie-react-native';
import Spacer from '../../../components/spacer/Spacer';

const PlanningTab = () => {
  //Get theme
  const {colors, spacing} = useTheme();

  // Get screen width
  const {width} = useWindowDimensions();
  // Get translation
  const {t} = useTranslation();

  // Init container style
  const _containerStyle: ViewStyle = {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    flex: 1,
  };

  // Init Ilustration style
  const _ilustrationStyle: ViewStyle = {
    width: '70%',
    height: '30%',
    // backgroundColor: 'black',
  };

  // Init title style
  const _titleStyle: TextStyle = {
    fontWeight: '700',
    textAlign: 'center',
    width: '60%',
  };

  // Init description style
  const _descriptionStyle: TextStyle = {
    textAlign: 'center',
    width: '80%',
  };

  return (
    <View style={_containerStyle}>
      <LottieView
        source={require('../../../../assets/lottie/lottie_under_development.json')}
        style={_ilustrationStyle}
        autoPlay
        loop
      />
      <Spacer height={spacing.medium} />
      <TextView
        text={t('under_dev')}
        type="headline-small"
        style={_titleStyle}
      />
      <Spacer height={spacing.medium} />
      <TextView
        text={t('under_dev_message')}
        type="body-medium"
        style={_descriptionStyle}
      />
    </View>
  );
};

export default PlanningTab;
