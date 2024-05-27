import {View, Text, ViewStyle, DimensionValue} from 'react-native';
import React from 'react';
//Make alias for divider props
interface DividerProps {
  height: DimensionValue;
  width: DimensionValue;
  color: string;
}
const Divider = ({height, width, color}: DividerProps) => {
  //Init divider style
  const _style: ViewStyle = {
    borderRadius: 4,
    height: height,
    width: width,
    backgroundColor: color,
  };
  return <View style={_style} />;
};

export default Divider;
