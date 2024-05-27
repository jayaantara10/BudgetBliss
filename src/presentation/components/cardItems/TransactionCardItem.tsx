import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import {TransactionModel} from '../../../domain/models/TransactionModel';
import {useTheme} from '../../provider/ThemeProvider';
import TextView from '../textViews/TextView';
import Ripple from 'react-native-material-ripple';
import {
  getColorByCategory,
  getIconByCategory,
} from '../../../core/utils/categoryUtils';
import IconView from '../icons/IconView';
import Spacer from '../spacer/Spacer';
import Divider from '../divider/Divider';
import {formatDate} from '../../../core/utils/dateTimeUtils';
import {formatRupiah} from '../../../core/utils/curencyUtils';

// Make alias for transaction card item
interface TransactionCardItemProps {
  item: TransactionModel;
  onItemPress: () => void;
}

const TransactionCardItem = ({item, onItemPress}: TransactionCardItemProps) => {
  // Get theme
  const {colors, spacing, radius} = useTheme();

  //Set container style
  const _containerStyle: ViewStyle = {
    borderRadius: radius.small,
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    overflow: 'hidden',
  };

  //   Set Ripple style
  const _rippleStyle: ViewStyle = {
    height: 72,
    width: '100%',
    flexDirection: 'row',
  };

  // Set right line style
  const _rightLineStyle: ViewStyle = {
    height: '100%',
    width: 8,
    backgroundColor: item.categoryId
      ? getColorByCategory(item.categoryId)
      : colors.primary,
  };

  //   Set data container style
  const _dataContainerStyle: ViewStyle = {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
  };
  // Set icon container style
  const _iconContainerStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
  };

  //   Set data container style
  const _amountContainerStyle: ViewStyle = {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  };

  return (
    <View style={_containerStyle}>
      <Ripple style={_rippleStyle} onPress={onItemPress}>
        {/* Line */}
        <View style={_rightLineStyle} />
        <Spacer width={spacing.medium} />
        {/* Icon */}
        <View style={_iconContainerStyle}>
          <IconView
            name={
              item.categoryId
                ? getIconByCategory(item.categoryId) ?? 'attach-money'
                : 'attach-money'
            }
            source={'material-icons'}
            size={32}
          />
        </View>
        <Spacer width={spacing.medium} />
        <Divider height="100%" width={1} color={colors.primarySurface} />
        <Spacer width={spacing.medium} />
        {/* Data Container */}
        <View style={_dataContainerStyle}>
          <TextView text={item.title} type="title-medium" />
          <TextView text={formatDate(item.date)} type="body-medium" />
        </View>
        {/* Ammount */}
        <View style={_amountContainerStyle}>
          <TextView
            text={`${item.isIncome ? '+' : '-'} ${formatRupiah(item.amount)}`}
            type="body-small"
            style={{textAlign: 'right'}}
          />
        </View>
        <Spacer width={spacing.medium} />
      </Ripple>
    </View>
  );
};

export default TransactionCardItem;
