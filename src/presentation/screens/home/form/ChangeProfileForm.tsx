import {View, Text, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../../provider/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {useOverlay} from '../../../provider/OverlayProvider';
import {UserServices} from '../../../../infrasturcture/services/UserServices';
import {
  isConfirmPasswordHasSame,
  isPasswordIsValid,
  isValidEmail,
} from '../../../../core/utils/validationUtils';
import AllertBottomSheet from '../../../components/bottomSheets/AllertBottomSheet';
import Loading from '../../../components/loading/Loading';
import CustomBottomSheet from '../../../components/bottomSheets/CustomBottomSheet';
import TextField from '../../../components/textFields/TextField';
import Spacer from '../../../components/spacer/Spacer';
import Button from '../../../components/buttons/Button';

const ChangeNameForm = () => {
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

  // Call user services
  const {changeName} = UserServices();

  // Handle submit
  const _onSubmit = () => {
    _changeName();
  };

  // handle register
  const _changeName = () => {
    const onSuccess = () => {
      hideOverlay();
    };

    const onError = (errorMesssage: string) => {
      hideOverlay();
      showOverlay(
        <AllertBottomSheet
          title={t('change_name_error')}
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
    changeName(nickname, {onLoading, onSuccess, onError});
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
              label={t('submit')}
              type="filled"
              disabled={nickname === ''}
              onPress={_onSubmit}
            />
          </View>
        </View>
      </View>
    </CustomBottomSheet>
  );
};

export default ChangeNameForm;
