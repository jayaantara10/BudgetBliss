import {View, Text} from 'react-native';
import React from 'react';

// Make Alias for spacer props
interface SpacerProps {
  height?: number;
  width?: number;
}
const Spacer = ({height, width}: SpacerProps) => {
  return <View style={{height: height, width: width}} />;
};

export default Spacer;
