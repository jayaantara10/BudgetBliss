import {
  View,
  Text,
  ViewStyle,
  useWindowDimensions,
  TextStyle,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import TextView from '../../components/textViews/TextView';
import {useTheme} from '../../provider/ThemeProvider';
import Spacer from '../../components/spacer/Spacer';
import {useAuth} from '../../provider/AuthProvder';

// Make alias for on boarding item
export type OnBoardingItem = {
  id: string;
  title: string;
  description: string;
  illustrationSource: string;
};

// Make alias for on boarding page props
interface OnBoardingPageProps {
  item: OnBoardingItem;
}

const OnBoardingPage = ({item}: OnBoardingPageProps) => {
  //Get theme
  const {colors, spacing} = useTheme();

  // Get screen width
  const {width} = useWindowDimensions();

  // Init container style
  const _containerStyle: ViewStyle = {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
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
        source={item.illustrationSource}
        style={_ilustrationStyle}
        autoPlay
        loop
      />
      <Spacer height={spacing.medium} />
      <TextView text={item.title} type="headline-small" style={_titleStyle} />
      <Spacer height={spacing.medium} />
      <TextView
        text={item.description}
        type="body-medium"
        style={_descriptionStyle}
      />
    </View>
  );
};

export default OnBoardingPage;
