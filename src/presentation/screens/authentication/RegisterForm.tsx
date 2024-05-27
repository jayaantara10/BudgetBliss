import {View, Text, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import CustomBottomSheet from '../../components/bottomSheets/CustomBottomSheet';
import {useTheme} from '../../provider/ThemeProvider';
import TextField from '../../components/textFields/TextField';
import Spacer from '../../components/spacer/Spacer';
import Button from '../../components/buttons/Button';
import {useTranslation} from 'react-i18next';
import {
  isConfirmPasswordHasSame,
  isPasswordIsValid,
  isValidEmail,
} from '../../../core/utils/validationUtils';
import {useOverlay} from '../../provider/OverlayProvider';
import {UserServices} from '../../../infrasturcture/services/UserServices';
import AllertBottomSheet from '../../components/bottomSheets/AllertBottomSheet';
import Loading from '../../components/loading/Loading';

interface RegisterFormProps {
  onSuccessRegisetr: () => void;
}
const RegisterForm = ({onSuccessRegisetr}: RegisterFormProps) => {
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

  // State name
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  // State email
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // State password
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // State confirm password
  const [confPassword, setConfPassword] = useState('');
  const [confPasswordError, setConfPasswordError] = useState('');

  // Call user services
  const {signUp} = UserServices();

  // Handle submit
  const _onSubmit = () => {
    if (!isValidEmail(email)) {
      setEmailError(t('wrong_email_format'));
    }
    if (!isPasswordIsValid(password)) {
      setEmailError(t('wrong_format_passsword'));
    }
    if (!isConfirmPasswordHasSame(password, confPassword)) {
      setEmailError(t('diff_conf_password'));
    }

    if (confPasswordError === '' || emailError === '' || passwordError === '') {
      _signUp();
    }
  };

  // handle register
  const _signUp = () => {
    const onSuccess = () => {
      hideOverlay();
      onSuccessRegisetr();
    };

    const onError = (errorMesssage: string) => {
      hideOverlay();
      showOverlay(
        <AllertBottomSheet
          title={t('register_error')}
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
    signUp(nickname, email, password, {onLoading, onSuccess, onError});
  };

  return (
    <CustomBottomSheet>
      <View style={_containerStyle}>
        {/* Nickname Text Field  */}
        <TextField
          value={nickname}
          inputType="free-text"
          errorMessage={nicknameError}
          label={t('name')}
          placeholder={t('name_hint')}
          leadingIconName="mail"
          leadingIconSource="material-icons"
          onFocus={() => setNicknameError('')}
          onChange={value => setNickname(value)}
        />
        <Spacer height={spacing.medium} />

        {/* Email Text Field */}
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
        <Spacer height={spacing.medium} />

        {/* Confirm Passowrd Text Field */}
        <TextField
          value={confPassword}
          inputType="password"
          errorMessage={confPasswordError}
          label={t('confirm_password')}
          placeholder={t('confirm_password_hint')}
          leadingIconName="lock"
          leadingIconSource="material-icons"
          onFocus={() => setConfPasswordError('')}
          onChange={value => setConfPassword(value)}
        />
        <Spacer height={spacing.extraLarge} />

        {/* Buttons */}
        <View style={_buttonContainerStyle}>
          {/* Cancel Button */}
          <View style={_buttonPaddingStyle}>
            <Button label={t('cancel')} type="outlined" onPress={hideOverlay} />
          </View>
          <Spacer width={spacing.medium} />

          {/* Register Button */}
          <View style={_buttonPaddingStyle}>
            <Button
              label={t('register')}
              type="filled"
              disabled={
                email === '' ||
                nickname === '' ||
                password === '' ||
                confPassword === ''
              }
              onPress={_onSubmit}
            />
          </View>
        </View>
      </View>
    </CustomBottomSheet>
  );
};

export default RegisterForm;
