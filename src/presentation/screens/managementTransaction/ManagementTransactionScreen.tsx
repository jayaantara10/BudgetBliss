import {View, Text, ViewStyle, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamNavigator} from '../../navigations/ParamNavigator';
import Page from '../../components/container/Page';
import {
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import TopAppbar from '../../components/appbars/TopAppBar';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../../provider/ThemeProvider';
import {useOverlay} from '../../provider/OverlayProvider';
import TextField from '../../components/textFields/TextField';
import Spacer from '../../components/spacer/Spacer';
import Button from '../../components/buttons/Button';
import TransactionTypeCardItem from '../../components/cardItems/TransactionTypeCardItem';
import TextView from '../../components/textViews/TextView';
import {categories} from '../../../core/constant/categoryConstant';
import CategoryCardItem from '../../components/cardItems/CategoryCardItem';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ripple from 'react-native-material-ripple';
import {formatDate} from '../../../core/utils/dateTimeUtils';
import AllertBottomSheet from '../../components/bottomSheets/AllertBottomSheet';
import Loading from '../../components/loading/Loading';
import {TransactionServices} from '../../../infrasturcture/services/TransactionServices';
import {useAuth} from '../../provider/AuthProvder';
// Init navigation prop
type ManagementTransactionScreenNavigationProp = StackNavigationProp<
  ParamNavigator,
  'ManagementTransaction'
>;
// Init route prop
type ManagementTransactionScreenRouteProp = RouteProp<
  ParamNavigator,
  'ManagementTransaction'
>;
const ManagementTransactionScreen = () => {
  // UI ==============================================================================================
  //Get theme
  const {colors, spacing, radius} = useTheme();

  //Get translator
  const {t} = useTranslation();

  // Get screen width
  const {width} = useWindowDimensions();

  // Get navigation
  const navigation = useNavigation<ManagementTransactionScreenNavigationProp>();

  // Get bottom overlay
  const {showOverlay, hideOverlay, showLoading} = useOverlay();

  // Get route
  const route = useRoute<ManagementTransactionScreenRouteProp>();

  // get params
  const {transaction} = route.params;

  // Init container style
  const _containerStyle: ViewStyle = {
    width: '100%',
    padding: spacing.medium,
  };

  // Init button container
  const _buttonContainerStyle: ViewStyle = {
    flexDirection: 'row',
  };

  // Init button padding style for adjust button width and give padding
  const _buttonPaddingStyle: ViewStyle = {
    flex: 1,
  };

  // Set title
  const _titlePage = !transaction
    ? t('add_transaction')
    : t('edit_transaction');

  // Set transaction type container
  const _transactionTypeContainer: ViewStyle = {
    flexDirection: 'row',
  };

  // Set transaction type item container
  const _transactionTypeItemContainer: ViewStyle = {
    flex: 1,
  };

  // Set category list container
  const _categoryContainer: ViewStyle = {
    flex: 1,
  };

  // Set date picker container
  const _datePickerContainer: ViewStyle = {
    borderRadius: radius.small,
    overflow: 'hidden',
  };

  // Handle go back
  const goBack = () => {
    navigation.goBack();
  };
  // LOGIC ==============================================================================================

  // State transaction title
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  // State transaction amount
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');

  // State transaction description
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  // Make state for isIncome status
  const [_isIncome, _setIsIncome] = useState(false);

  // Make state for selected category id
  const [_selectedCategoryId, _setSelectedCategoryId] = useState('');

  // Make state for date picker
  const [_transactionDate, _setTransactionDate] = useState(new Date());

  // Date modal state
  const [_showDatePicker, _setShowDatePicker] = useState(false);

  // Get transaction service
  const {add, update} = TransactionServices();

  // get auth
  const {user} = useAuth();

  // Show date picket
  const _showDatePickerHandler = () => {
    _setShowDatePicker(true);
  };

  // Hide date picker
  const _hideDatePickerHandler = () => {
    _setShowDatePicker(false);
  };

  // Handle submit
  const onSubmit = () => {
    const onSuccess = () => {
      hideOverlay();
      navigation.goBack();
    };
    const onError = (errorMesssage: string) => {
      hideOverlay();
      showOverlay(
        <AllertBottomSheet
          title={t(
            transaction ? 'update_transaction_error' : 'add_transaction_error',
          )}
          description={t(errorMesssage)}
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

    console.log(_selectedCategoryId);

    if (transaction) {
      update(
        transaction.key,
        {
          title: title,
          categoryId: _selectedCategoryId ?? '0',
          isIncome: _isIncome,
          description: description,
          amount: Number(amount),
          date: _transactionDate.toISOString(),
        },
        {onError, onLoading, onSuccess},
      );
    } else {
      add(
        {
          uid: user.uid,
          title: title,
          categoryId: _selectedCategoryId ?? '0',
          isIncome: _isIncome,
          description: description,
          amount: Number(amount),
          date: _transactionDate.toISOString(),
          createdAt: new Date().toISOString(),
        },
        {onError, onLoading, onSuccess},
      );
    }
  };

  // Set initial value if has nav arguments

  useFocusEffect(
    React.useCallback(() => {
      if (transaction) {
        setTitle(transaction.title);
        setAmount(transaction.amount.toString());
        setDescription(transaction.description);
        _setIsIncome(transaction.isIncome);
        if (transaction.categoryId) {
          _setSelectedCategoryId(transaction.categoryId);
        }
        _setTransactionDate(new Date(transaction.date));
      }

      return () => {};
    }, []),
  );

  return (
    <Page>
      <TopAppbar title={_titlePage} onBackPress={goBack} />
      <ScrollView>
        <View style={_containerStyle}>
          <TextView
            text={t('is_income_choose')}
            type="title-small"
            style={{color: colors.onPrimarySurface}}
          />
          <Spacer height={spacing.extraSmall} />
          {/* Type Transaction */}
          <View style={_transactionTypeContainer}>
            <View style={_transactionTypeItemContainer}>
              <TransactionTypeCardItem
                iconName={'trending-up'}
                iconSource={'material-icons'}
                transactionName={t('income')}
                onPress={function (): void {
                  _setIsIncome(true);
                }}
                isActive={_isIncome}
              />
            </View>
            <Spacer width={spacing.small} />
            <View style={_transactionTypeItemContainer}>
              <TransactionTypeCardItem
                iconName={'trending-down'}
                iconSource={'material-icons'}
                transactionName={t('expenses')}
                onPress={function (): void {
                  _setIsIncome(false);
                }}
                isActive={!_isIncome}
              />
            </View>
          </View>
          <Spacer height={spacing.medium} />
          {/* Title Text Field  */}
          <TextField
            value={title}
            inputType="free-text"
            errorMessage={titleError}
            label={t('title')}
            placeholder={t('title_hint')}
            leadingIconName="monetization-on"
            leadingIconSource="material-icons"
            onFocus={() => setTitleError('')}
            onChange={value => setTitle(value)}
          />
          <Spacer height={spacing.medium} />
          {/* Category */}

          {!_isIncome && (
            <TextView
              text={t('category')}
              type="title-small"
              style={{color: colors.onPrimarySurface}}
            />
          )}
          {!_isIncome && <Spacer height={spacing.extraSmall} />}
          {!_isIncome && (
            <FlatList
              key={1}
              keyExtractor={item => item.id}
              numColumns={3}
              data={categories}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              ItemSeparatorComponent={() => <Spacer height={spacing.small} />}
              style={_categoryContainer}
              renderItem={({item}) => (
                <CategoryCardItem
                  item={item}
                  onPress={function (): void {
                    _setSelectedCategoryId(item.id);
                  }}
                  isActive={_selectedCategoryId === item.id}
                />
              )}
            />
          )}
          <Spacer height={spacing.medium} />
          {/* Ammount Text Field */}
          <TextField
            value={amount}
            inputType="number"
            errorMessage={amountError}
            label={t('amount')}
            placeholder={t('amount_hint')}
            leadingIconName="account-balance-wallet"
            leadingIconSource="material-icons"
            onFocus={() => setAmountError('')}
            onChange={value => {
              const numericValue = value.replace(/[^0-9]/g, '');
              setAmount(numericValue);
            }}
          />
          <Spacer height={spacing.medium} />
          {/* Date */}
          <Ripple onPress={_showDatePickerHandler} rippleOpacity={0}>
            <TextField
              value={formatDate(_transactionDate.toISOString())}
              inputType="free-text"
              readonly
              label={t('date')}
              placeholder={t('date_hint')}
              leadingIconName="calendar-month"
              leadingIconSource="material-icons"
            />
          </Ripple>

          <Spacer height={spacing.medium} />
          {/* Description Text Field */}
          <TextField
            value={description}
            inputType="free-text"
            errorMessage={descriptionError}
            label={t('description')}
            placeholder={t('description_hint')}
            maxCharInput={200}
            multiline
            onFocus={() => setDescriptionError('')}
            onChange={value => setDescription(value)}
          />

          <Spacer height={spacing.extraLarge} />

          {/* Buttons */}
          <View style={_buttonContainerStyle}>
            {/* Cancel Button */}
            <View style={_buttonPaddingStyle}>
              <Button label={t('cancel')} type="outlined" onPress={goBack} />
            </View>
            <Spacer width={spacing.medium} />

            {/* Submit Button */}
            <View style={_buttonPaddingStyle}>
              <Button
                label={t('submit')}
                type="filled"
                disabled={title === '' || amount === '' || description === ''}
                onPress={onSubmit}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Date picker */}

      {_showDatePicker && (
        <DateTimePicker
          value={_transactionDate}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            _hideDatePickerHandler();
            _setTransactionDate(selectedDate || _transactionDate);
          }}
        />
      )}
    </Page>
  );
};

export default ManagementTransactionScreen;
