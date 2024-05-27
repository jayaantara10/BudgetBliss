import {View, Text, ViewStyle, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamNavigator} from '../../navigations/ParamNavigator';
import Page from '../../components/container/Page';
import TextView from '../../components/textViews/TextView';
import Spacer from '../../components/spacer/Spacer';
import {useOverlay} from '../../provider/OverlayProvider';
import {useTheme} from '../../provider/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import TopAppbar from '../../components/appbars/TopAppBar';
import {FlatList} from 'react-native-gesture-handler';
import {TransactionServices} from '../../../infrasturcture/services/TransactionServices';
import {useAuth} from '../../provider/AuthProvder';
import {TransactionModel} from '../../../domain/models/TransactionModel';
import {
  calculateIncomeAndExpense,
  calculateIncomeAndExpenseForMonth,
} from '../../../core/utils/incomeUtils';
import AllertBottomSheet from '../../components/bottomSheets/AllertBottomSheet';
import TransactionCardItem from '../../components/cardItems/TransactionCardItem';
import Divider from '../../components/divider/Divider';
// Init navigation prop
type TransactionHistoryScreenNavigationProp = StackNavigationProp<
  ParamNavigator,
  'TransactionHistory'
>;
const TransactionHistoryScreen = () => {
  // UI ==============================================================================================
  // Get theme
  const {colors, spacing} = useTheme();

  // Get overlay
  const {showOverlay, hideOverlay, showLoading} = useOverlay();

  // Get translation
  const {t} = useTranslation();

  // Get navigation
  const navigation = useNavigation<TransactionHistoryScreenNavigationProp>();

  // Get screen width
  const {width} = useWindowDimensions();

  // base container style
  const basecontainerStyle: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    marginTop: spacing.medium,
  };
  // container sty;e
  const itemcontainerStyle: ViewStyle = {
    width: width - spacing.medium * 2,
  };

  // LOGIC ==============================================================================================
  //Get transaction services
  const {getList} = TransactionServices();

  //Get auth
  const {user} = useAuth();

  const [transaction, setTransaction] = useState<TransactionModel[]>();

  useFocusEffect(
    React.useCallback(() => {
      console.log('User', user);
      _getList();
      return () => {};
    }, []),
  );
  // handle register
  const _getList = () => {
    const onSuccess = (transactions?: TransactionModel[]) => {
      if (transactions) {
        setTransaction(transactions?.slice(0, 5));
      }
      hideOverlay();
    };

    const onError = (errorMesssage: string) => {
      hideOverlay();
      showOverlay(
        <AllertBottomSheet
          title={t('view_transaction_error')}
          description={t('view_transaction_error_message')}
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
    getList(user.uid, {onLoading, onSuccess, onError});
  };
  return (
    <Page statusBarColor={colors.surface}>
      <TopAppbar title={'Transaction'} onBackPress={navigation.goBack} />
      <View style={basecontainerStyle}>
        <FlatList
          ListFooterComponent={<Spacer height={spacing.large} />}
          data={transaction}
          ItemSeparatorComponent={() => <Spacer height={spacing.small} />}
          renderItem={({item}) => (
            <View style={itemcontainerStyle}>
              <TransactionCardItem item={item} onItemPress={() => {}} />
            </View>
          )}
        />
      </View>
    </Page>
  );
};

export default TransactionHistoryScreen;
