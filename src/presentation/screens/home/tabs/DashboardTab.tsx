import {
  View,
  Text,
  ViewStyle,
  useWindowDimensions,
  TextStyle,
  ImageURISource,
} from 'react-native';
import React, {useEffect, useState, useTransition} from 'react';
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../HomeScreen';
import {ScrollView} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import Spacer from '../../../components/spacer/Spacer';
import Divider from '../../../components/divider/Divider';
import TransactionCardItem from '../../../components/cardItems/TransactionCardItem';
import {TransactionServices} from '../../../../infrasturcture/services/TransactionServices';
import {TransactionModel} from '../../../../domain/models/TransactionModel';
import AllertBottomSheet from '../../../components/bottomSheets/AllertBottomSheet';
import {useAuth} from '../../../provider/AuthProvder';
import Loading from '../../../components/loading/Loading';
import {
  calculateIncomeAndExpense,
  calculateIncomeAndExpenseForMonth,
} from '../../../../core/utils/incomeUtils';
import {formatRupiah} from '../../../../core/utils/curencyUtils';
import DetailTransaction from '../section/DetailTransaction';
import LogoLight from '../../../../assets/vectors/ic_budget_bliss.svg';
import LogoDark from '../../../../assets/vectors/ic_budget_bliss_dark.svg';
import TulipBlossom from '../../../../assets/vectors/tulip_blossom.svg';
import TulipFlora from '../../../../assets/vectors/tulip_flora.svg';

const DashboardTab = () => {
  // UI ==============================================================================================

  // Get theme
  const {colors, spacing, radius, colorScheme} = useTheme();

  // Get overlay
  const {showOverlay, hideOverlay, showLoading} = useOverlay();

  // Get translation
  const {t} = useTranslation();

  // Get navigation
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Get screen width
  const {width} = useWindowDimensions();

  // Set style for page
  const _pageStyle: ViewStyle = {
    // padding: spacing.medium,
    backgroundColor: colors.primary,
  };

  // Set Style for header
  const _headerStyle: ViewStyle = {
    height: width / 2.5,
    width: width,
    paddingTop: spacing.large,
    paddingHorizontal: spacing.medium,
  };

  // Set style for body
  const _bodyStyle: ViewStyle = {
    width: width,
    padding: spacing.medium,
    backgroundColor: colors.surface,
    borderTopRightRadius: radius.medium,
    borderTopLeftRadius: radius.medium,
  };

  // Set Hello style
  const _helloStyle: TextStyle = {
    color: colors.secondary,
  };

  // Set Card balance style
  const _cardBalanceStyle: ViewStyle = {
    height: width / 3,
    width: width - spacing.medium * 2,
    backgroundColor: colors.surface,
    borderRadius: radius.small,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    position: 'absolute',
    alignSelf: 'center',
    top: -width / 3 / 2,
    overflow: 'hidden',
  };

  // Set logo container style
  const _logoContainerStyle: ViewStyle = {
    position: 'absolute',
    bottom: spacing.medium,
    right: spacing.medium,
  };

  // Set tulip 1 style
  const _tulip1Style: ViewStyle = {
    position: 'absolute',
    bottom: -40,
    right: -24,
    opacity: 0.6,
  };

  // Set tulip 2 style
  const _tulip2Style: ViewStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    opacity: 0.6,
  };

  // Set card top line style
  const _cardTopLineStyle: ViewStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 8,
    width: _cardBalanceStyle.width,
    backgroundColor: colors.secondary,
    borderTopRightRadius: _cardBalanceStyle.borderRadius,
    borderTopLeftRadius: _cardBalanceStyle.borderRadius,
  };

  // Set text balance style
  const _textBalanceStyle: TextStyle = {
    color: colors.onSurcface,
    fontWeight: 'bold',
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.large,
  };

  // Set text balance title style
  const _textBalanceTitleStyle: TextStyle = {
    color: colors.onSurcface,
    fontWeight: 'bold',
    paddingHorizontal: spacing.medium,
    // paddingTop: spacing.large,
  };

  // Set Income outcome container
  const _incomeOutcomeContainer: ViewStyle = {
    flexDirection: 'row',
    width: _cardBalanceStyle.width,
    height: width / 2.5,
  };

  // Set style for income card;
  const _incomeOutcomeCardStyle: ViewStyle = {
    flex: 1,
    borderRadius: radius.small,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    padding: spacing.medium,
  };

  // Set income outcome icon style
  const _incomeOutcomeIconStyle: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Set text income outcome title style
  const _textIncomeOutcomeTitleStyle: TextStyle = {
    fontWeight: 'bold',
    paddingTop: spacing.small,
  };

  // Set recent transaction container
  const _recentTransactionContainer: ViewStyle = {
    width: width,
    minHeight: 400,
    paddingBottom: 96,
  };

  // set list recent transction style
  const _listRecentTransactionStyle: ViewStyle = {
    width: width - spacing.medium * 2,
  };

  // button view more container style
  const _buttonContainerStyle: ViewStyle = {
    width: width - spacing.medium * 2,
  };

  // Go to transaction history
  const _goToTransactionHistory = () => {
    navigation.navigate('TransactionHistory');
  };

  // LOGIC ==============================================================================================

  //Get transaction services
  const {getList} = TransactionServices();

  //Get auth
  const {user} = useAuth();

  const [transaction, setTransaction] = useState<TransactionModel[]>();

  // balance state
  const [balance, setbalance] = useState(0);

  // Month income
  const [monthIncome, setMonthIncome] = useState(0);

  // month expenses
  const [monthExpenses, setMonthExpeses] = useState(0);

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
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      if (transactions) {
        // get total balance
        setbalance(
          calculateIncomeAndExpense(transactions).totalIncome -
            calculateIncomeAndExpense(transactions).totalExpense,
        );

        // get mounthly income and expanses
        setMonthIncome(
          calculateIncomeAndExpenseForMonth(
            transactions,
            currentMonth,
            currentYear,
          ).totalIncome,
        );

        setMonthExpeses(
          calculateIncomeAndExpenseForMonth(
            transactions,
            currentMonth,
            currentYear,
          ).totalExpense,
        );
      }
      setTransaction(transactions?.slice(0, 5));

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

  //Go to edit
  const goToEdit = (item: TransactionModel) => {
    navigation.navigate('ManagementTransaction', {transaction: item});
  };

  // Open detail transaction
  const _openDetailTransaction = (item: TransactionModel) => {
    showOverlay(
      <DetailTransaction
        item={item}
        goToEdit={() => goToEdit(item)}
        refresh={_getList}
      />,
    );
  };

  const name = user.displayName ?? 'Theree';

  return (
    <Page statusBarColor={colors.primary}>
      <ScrollView style={_pageStyle}>
        {/* Header */}
        <View style={_headerStyle}>
          {/* Hello */}

          <TextView
            text={`${t('hello')}, ${name}`}
            type="headline-medium"
            style={_helloStyle}
          />
        </View>
        {/* Body */}
        <View style={_bodyStyle}>
          {/* Card balance */}
          <View style={_cardBalanceStyle}>
            {/* Top Line */}
            <View style={_cardTopLineStyle} />
            {/* Tulip 1 */}
            <View style={_tulip1Style}>
              <TulipBlossom width={160} height={160} fill={colors.secondary} />
            </View>

            {/* Tulip 2 */}
            <View style={_tulip2Style}>
              <TulipFlora width={106} height={106} fill={colors.secondary} />
            </View>

            {/* Logo */}
            <View style={_logoContainerStyle}>
              {colorScheme == 'light' ? (
                <LogoLight width={48} height={48} />
              ) : (
                <LogoDark width={48} height={48} />
              )}
            </View>

            {/* Text balance */}
            <TextView
              text={formatRupiah(balance)}
              type="headline-large"
              style={_textBalanceStyle}
            />
            <TextView
              text={t('available_balance')}
              type="title-medium"
              style={_textBalanceTitleStyle}
            />
          </View>

          {/* Income Outcome */}
          <Spacer height={width / 3 / 2} />
          <Spacer height={spacing.medium} />
          <View style={_incomeOutcomeContainer}>
            {/* Income */}
            <View
              style={{
                ..._incomeOutcomeCardStyle,
                backgroundColor: colors.primarySurface,
              }}>
              <View style={_incomeOutcomeIconStyle}>
                <IconView
                  name={'finance'}
                  source={'material-comunity-icons'}
                  size={64}
                  color={colors.onPrimarySurface}
                />
              </View>

              <Divider
                height={3}
                width={'100%'}
                color={colors.onPrimarySurface}
              />

              <TextView
                text={t('income')}
                type="title-medium"
                style={{
                  ..._textIncomeOutcomeTitleStyle,
                  color: colors.onPrimarySurface,
                }}
              />
              <TextView
                text={`+ ${formatRupiah(monthIncome)}`}
                type="title-small"
                style={{color: colors.onPrimarySurface}}
              />
            </View>
            <Spacer width={spacing.medium} />

            {/* Outcome */}
            <View
              style={{
                ..._incomeOutcomeCardStyle,
                backgroundColor: colors.errorSurface,
              }}>
              <View style={_incomeOutcomeIconStyle}>
                <IconView
                  name={'payments'}
                  source={'material-icons'}
                  size={64}
                  color={colors.error}
                />
              </View>

              <Divider
                height={3}
                width={'100%'}
                color={colors.onErrorSurface}
              />

              <TextView
                text={t('expenses')}
                type="title-medium"
                style={{
                  ..._textIncomeOutcomeTitleStyle,
                  color: colors.onErrorSurface,
                }}
              />
              <TextView
                text={`- ${formatRupiah(monthExpenses)}`}
                type="title-small"
                style={{color: colors.onErrorSurface}}
              />
            </View>
          </View>
          <Spacer height={spacing.large} />
          {/* Recent transaction */}
          <View style={_recentTransactionContainer}>
            {/* Title */}
            <TextView
              text={t('recent_transaction')}
              type="headline-small"
              style={{color: colors.onPrimarySurface}}
            />
            <Spacer height={spacing.medium} />
            {/* List */}
            <View style={_listRecentTransactionStyle}>
              {transaction?.map(item => (
                <View key={item.key}>
                  <TransactionCardItem
                    item={item}
                    onItemPress={() => _openDetailTransaction(item)}
                  />
                  <Spacer height={spacing.small} />
                </View>
              ))}
            </View>
            {/* View More */}
            <Spacer height={spacing.medium} />
            <View style={_buttonContainerStyle}>
              <Button
                label={t('transaction_history')}
                onPress={_goToTransactionHistory}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Page>
  );
};

export default DashboardTab;
