import {View, Text, ViewStyle, TextStyle} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../../provider/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {useOverlay} from '../../../provider/OverlayProvider';
import {UserServices} from '../../../../infrasturcture/services/UserServices';
import AllertBottomSheet from '../../../components/bottomSheets/AllertBottomSheet';
import CustomBottomSheet from '../../../components/bottomSheets/CustomBottomSheet';
import TextField from '../../../components/textFields/TextField';
import {TransactionModel} from '../../../../domain/models/TransactionModel';
import TextView from '../../../components/textViews/TextView';
import Spacer from '../../../components/spacer/Spacer';
import Button from '../../../components/buttons/Button';
import {getCategoryById} from '../../../../core/utils/categoryUtils';
import {formatRupiah} from '../../../../core/utils/curencyUtils';
import {formatDate} from '../../../../core/utils/dateTimeUtils';
import {TransactionServices} from '../../../../infrasturcture/services/TransactionServices';

// Make alias for detail transaction
interface DetailTransactionProps {
  item: TransactionModel;
  goToEdit: () => void;
  refresh: () => void;
}

const DetailTransaction = ({
  item,
  goToEdit,
  refresh,
}: DetailTransactionProps) => {
  // UI ==============================================================================================
  // Get theme
  const {spacing} = useTheme();

  //Get translator
  const {t} = useTranslation();

  // Init container style
  const _containerStyle: ViewStyle = {
    width: '100%',
  };

  // Init button container
  const _buttonContainerStyle: ViewStyle = {
    flexDirection: 'row',
  };

  // Init button padding style for adjust button width and give padding
  const _buttonPaddingStyle: ViewStyle = {
    flex: 1,
  };

  // Get overlay
  const {showOverlay, hideOverlay, showLoading} = useOverlay();

  // LOGIC ==============================================================================================

  //   Call transaction services
  const {deleteTransaction} = TransactionServices();

  //   handle register
  const _onDelete = () => {
    const onSuccess = () => {
      hideOverlay();
      refresh();
    };

    const onError = (errorMesssage: string) => {
      hideOverlay();
      showOverlay(
        <AllertBottomSheet
          title={t('delete_transaction_error')}
          description={t('delete_transaction_error')}
          confirmLabel={t('okay')}
          onConfirm={function (): void {
            hideOverlay();
          }}
        />,
      );
    };

    const onLoading = () => {
      showLoading();
    };
    deleteTransaction(item.key, {onLoading, onSuccess, onError});
  };

  return (
    <CustomBottomSheet>
      <View style={_containerStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <TextView text={item.title} type="title-large" />
            <TextView
              text={
                item.categoryId
                  ? `${getCategoryById(item.categoryId)}`
                  : t('income')
              }
              type="title-medium"
            />
          </View>
          <View>
            <TextView
              text={formatRupiah(item.amount)}
              type="title-large"
              style={{flex: 1, textAlign: 'right'}}
            />
            <TextView
              text={formatDate(item.date)}
              type="body-medium"
              style={{flex: 1, textAlign: 'right'}}
            />
          </View>
        </View>

        <Spacer height={spacing.medium} />
        <TextView text={item.description} type="body-medium" />

        <Spacer height={spacing.extraLarge} />
        {/* Buttons */}
        <View style={_buttonContainerStyle}>
          {/* Cancel Button */}
          <View style={_buttonPaddingStyle}>
            <Button label={t('delete')} type="outlined" onPress={_onDelete} />
          </View>
          <Spacer width={spacing.medium} />

          {/* Register Button */}
          <View style={_buttonPaddingStyle}>
            <Button
              label={t('edit')}
              type="filled"
              onPress={() => {
                hideOverlay();
                goToEdit();
              }}
            />
          </View>
        </View>
      </View>
    </CustomBottomSheet>
  );
};

export default DetailTransaction;
