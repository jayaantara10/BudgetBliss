import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LottieView
        source={require('../../../assets/lottie/lottie_loading.json')}
        style={{height: 56, width: 56}}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;
