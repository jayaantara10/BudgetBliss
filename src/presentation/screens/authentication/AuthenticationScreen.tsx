import {View, Text, ViewStyle, TextStyle, ImageURISource} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamNavigator} from '../../navigations/ParamNavigator';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../../provider/ThemeProvider';
import {useNavigation} from '@react-navigation/native';
import TextView from '../../components/textViews/TextView';
import SvgUri from 'react-native-svg-uri';
import Button from '../../components/buttons/Button';
import Spacer from '../../components/spacer/Spacer';
import TextField from '../../components/textFields/TextField';
import {ScrollView} from 'react-native-gesture-handler';
import Page from '../../components/container/Page';
import {useOverlay} from '../../provider/OverlayProvider';
import RegisterForm from './RegisterForm';
import {UserServices} from '../../../infrasturcture/services/UserServices';
import {isValidEmail} from '../../../core/utils/validationUtils';
import AllertBottomSheet from '../../components/bottomSheets/AllertBottomSheet';
import Loading from '../../components/loading/Loading';

// Init navigation prop
export type AuthenticationScreenNavigationProp = StackNavigationProp<
  ParamNavigator,
  'Authentication'
>;

const AuthenticationScreen = () => {
  // UI ==============================================================================================
  //Get theme
  const {colors, spacing, colorScheme} = useTheme();

  //Get translator
  const {t} = useTranslation();

  // Get navigation
  const navigation = useNavigation<AuthenticationScreenNavigationProp>();

  // Get bottom overlay
  const {showOverlay, hideOverlay, showLoading} = useOverlay();

  // Init container style
  const _containerStyle: ViewStyle = {
    flex: 1,
  };

  // Init welcome text style
  const _welcomeTextContainerStyle: TextStyle = {
    width: '100%',
    // height: '30%',
    padding: spacing.large,
    borderBottomRightRadius: 80,
    justifyContent: 'center',
    backgroundColor: colors.primary,
  };
  // Init welcome text style
  const _welcomeTextStyle: TextStyle = {
    letterSpacing: 4,
    fontWeight: 'bold',
    height: 96,
    textAlignVertical: 'center',
    color: colors.secondary,
  };

  // Init welcome text style
  const _welcomeWordStyle: TextStyle = {
    color: colorScheme == 'dark' ? colors.onSurcface : colors.surface,
  };
  // Init logo
  const _logo: ImageURISource =
    colorScheme == 'dark'
      ? require('../../../../assets/vectors/ic_budget_bliss_dark.svg')
      : require('../../../../assets/vectors/ic_budget_bliss.svg');

  // Init logo container style
  const _logoContainer: ViewStyle = {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
  };

  // Init app name text style
  const _appName: TextStyle = {
    fontWeight: 'bold',
  };

  // Open register bottom sheet
  const _openRegisterButtonSheet = () => {
    showOverlay(
      <RegisterForm
        onSuccessRegisetr={() => {
          showOverlay(
            <AllertBottomSheet
              title={t('register_success')}
              description={t('register_success_message')}
              confirmLabel={t('okay')}
              onConfirm={function (): void {
                hideOverlay();
              }}
            />,
          );
        }}
      />,
    );
  };

  // Go to Home
  const _goToHome = () => {
    navigation.replace('Home');
  };

  // LOGIC ==============================================================================================

  // State email
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // State password
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Call user services
  const {signIn} = UserServices();

  // Handle submit
  const _onSignIn = () => {
    if (!isValidEmail(email)) {
      setEmailError(t('wrong_email_format'));
    } else if (email === '') {
      setEmailError(t('empty_email'));
    } else if (password === '') {
      setEmailError(t('empty_password'));
    } else {
      _signIn();
    }
  };

  // handle sign in
  const _signIn = () => {
    const onSuccess = () => {
      hideOverlay();
      _goToHome();
    };

    const onError = (errorMesssage: string) => {
      hideOverlay();
      showOverlay(
        <AllertBottomSheet
          title={t('login_error')}
          description={errorMesssage}
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
    signIn(email, password, {onLoading, onSuccess, onError});
  };
  return (
    <Page statusBarColor={colors.primary}>
      <ScrollView style={_containerStyle}>
        {/* Welcome text */}
        <View style={_welcomeTextContainerStyle}>
          <TextView
            text={t('lets_start')}
            type="headline-large"
            style={_welcomeTextStyle}
          />
          <Spacer height={spacing.small} />
          <TextView
            text={t('welcome_word')}
            type="body-large"
            style={_welcomeWordStyle}
          />
        </View>
        <Spacer height={spacing.extraLarge} />

        {/* Logo And form login*/}
        <View style={_logoContainer}>
          {/* Logo */}
          <SvgUri width="100" height="100" source={_logo} />
          <Spacer height={spacing.small} />
          {/* App Name */}
          <TextView
            text={t('app_name')}
            type="headline-medium"
            style={_appName}
          />
          <Spacer height={spacing.large} />

          {/* EmailText Field */}
          <TextField
            value={email}
            inputType="email"
            errorMessage={emailError}
            label={t('email')}
            placeholder={t('email_hint')}
            leadingIconName="mail"
            leadingIconSource="material-icons"
            onFocus={() => setEmailError('')}
            onChange={value => setEmail(value)}
          />
          <Spacer height={spacing.medium} />

          {/* Password Text Field */}
          <TextField
            value={password}
            inputType="password"
            errorMessage={passwordError}
            label={t('password')}
            placeholder={t('password_hint')}
            leadingIconName="lock"
            leadingIconSource="material-icons"
            onFocus={() => setPasswordError('')}
            onChange={value => setPassword(value)}
          />
          <Spacer height={spacing.extraLarge} />

          {/* Sign in Button */}
          <Button label={t('sign_in')} type="filled" onPress={_onSignIn} />
          <Spacer height={spacing.medium} />

          {/* Sign up Button */}
          <Button
            label={t('sign_up')}
            type="outlined"
            onPress={_openRegisterButtonSheet}
          />
        </View>
      </ScrollView>
    </Page>
  );
};

export default AuthenticationScreen;
