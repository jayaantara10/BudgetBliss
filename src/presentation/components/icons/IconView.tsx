import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../provider/ThemeProvider';

// Make Alias for icon source type
export type IconSource = 'material-icons' | 'material-comunity-icons';

// Make Alias for icon view props
interface IconViewProps {
  name: string;
  source: IconSource;
  size?: number;
  color?: string;
  backgroundstyle?: ViewStyle;
}
// Make icon view
const IconView = ({
  name,
  source,
  size,
  color,
  backgroundstyle,
}: IconViewProps) => {
  const {colors} = useTheme();

  // Get icon to render
  const _getIcon = (): React.JSX.Element => {
    switch (source) {
      case 'material-icons':
        return (
          <MaterialIcons
            name={name}
            size={size ?? 32}
            color={color ?? colors.onSurcface}
          />
        );
        break;
      case 'material-comunity-icons':
        return (
          <MaterialCommunityIcons
            name={name}
            size={size ?? 32}
            color={color ?? colors.onSurcface}
          />
        );
        break;
    }
  };

  return <View style={backgroundstyle}>{_getIcon()}</View>;
};

export default IconView;
