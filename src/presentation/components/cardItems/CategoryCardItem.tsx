import {View, Text, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import Ripple from 'react-native-material-ripple';
import IconView, {IconSource} from '../icons/IconView';
import Spacer from '../spacer/Spacer';
import TextView from '../textViews/TextView';
import {useTheme} from '../../provider/ThemeProvider';
import {CategoryModel} from '../../../domain/models/CategoryModel';
import {
  getCategoryById,
  getIconByCategory,
} from '../../../core/utils/categoryUtils';
// Make Alias for transaction type
interface CategoryCardItemProps {
  item: CategoryModel;
  onPress: () => void;
  isActive: boolean;
}
const CategoryCardItem = ({item, onPress, isActive}: CategoryCardItemProps) => {
  // Get colors and typography from provider
  const {colors, typography, spacing, radius} = useTheme();

  // Init container style
  const _containerStyle: ViewStyle = {
    width: 109,
    height: 96,
    borderRadius: radius.small,
    overflow: 'hidden',
    backgroundColor: isActive ? colors.primary : undefined,
    borderWidth: isActive ? 0 : 1.5,
    borderColor: colors.primary,
    padding: spacing.small,
  };

  // Init ripple style
  const _rippleStyle: ViewStyle = {
    ...{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  // Init label style
  const _labelStyle: TextStyle = {
    ...{
      color: isActive ? colors.secondary : colors.onSurcface,
      textAlign: 'center',
    },
  };

  // Init icon color
  const _iconColor: string = isActive ? colors.secondary : colors.onSurcface;

  // Init content spacing
  const _contentSpacing: number = spacing.small;

  return (
    <View style={_containerStyle}>
      <Ripple
        rippleColor={colors.onPrimary}
        style={_rippleStyle}
        onPress={onPress}>
        <IconView
          name={getIconByCategory(item.id) ?? 'rocket'}
          source={'material-icons'}
          color={_iconColor}
          size={48}
        />
        <Spacer width={_contentSpacing} />
        <TextView
          text={getCategoryById(item.id) ?? 'other'}
          style={_labelStyle}
          type="label-medium"
        />
      </Ripple>
    </View>
  );
};

export default CategoryCardItem;
