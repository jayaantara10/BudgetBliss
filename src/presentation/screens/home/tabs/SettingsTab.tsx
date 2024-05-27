import {View, Text, ViewStyle} from 'react-native';
import React, {useState, useTransition} from 'react';
import {useTheme} from '../../../provider/ThemeProvider';
import TextView from '../../../components/textViews/TextView';
import IconView from '../../../components/icons/IconView';
import Button from '../../../components/buttons/Button';
import TextField from '../../../components/textFields/TextField';
import {useOverlay} from '../../../provider/OverlayProvider';
import ConfirmationBottomSheet from '../../../components/bottomSheets/ConfirmationBottomSheet';
import TopAppbar from '../../../components/appbars/TopAppBar';
import {useTranslation} from 'react-i18next';
import SvgUri from 'react-native-svg-uri';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamNavigator} from '../../../navigations/ParamNavigator';
import Page from '../../../components/container/Page';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../HomeScreen';
import SettingsItem from '../../../components/cardItems/SettingsItem';
import Spacer from '../../../components/spacer/Spacer';
import AllertBottomSheet from '../../../components/bottomSheets/AllertBottomSheet';
import {UserServices} from '../../../../infrasturcture/services/UserServices';
import Loading from '../../../components/loading/Loading';
import ChangeNameForm from '../form/ChangeProfileForm';
import {changeLanguage} from 'i18next';

const SettingsTab = () => {
  // UI ==============================================================================================
  // Get theme
  const {colors, spacing} = useTheme();

  // Get translation
  const {t} = useTranslation();

  // Get navigation
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Get bottom overlay
  const {showOverlay, hideOverlay} = useOverlay();

  //Set Title style
  const _titleStyle: ViewStyle = {
    marginTop: spacing.extraLarge,
    marginStart: spacing.medium,
  };

  // Go to Home
  const _goToSignIn = () => {
    navigation.replace('Authentication');
  };

  // LOGIC ==============================================================================================

  // Call user services
  const {signOut, deleteAccount} = UserServices();

  // handle signout
  const _signOut = () => {
    const onSuccess = () => {
      hideOverlay();
      _goToSignIn();
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
      showOverlay(<Loading />);
    };
    signOut({onLoading, onSuccess, onError});
  };

  // handle register
  const _deleteAccount = () => {
    const onSuccess = () => {
      hideOverlay();
      _goToSignIn();
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
      showOverlay(<Loading />);
    };
    deleteAccount({onLoading, onSuccess, onError});
  };

  const showConfirmBs = () => {
    showOverlay(
      <ConfirmationBottomSheet
        title={t('sign_out')}
        description={t('logout_confirm')}
        confirmLabel={t('yes')}
        cancelLabel={t('cancel')}
        onConfirm={function (): void {
          _signOut();
        }}
        onCancel={function (): void {
          hideOverlay();
        }}
      />,
    );
  };

  const showDeleteAccBs = () => {
    showOverlay(
      <ConfirmationBottomSheet
        title={t('delete_account')}
        description={t('delete_account_confirmantion')}
        confirmLabel={t('yes')}
        cancelLabel={t('cancel')}
        onConfirm={function (): void {
          _deleteAccount();
        }}
        onCancel={function (): void {
          hideOverlay();
        }}
      />,
    );
  };

  const showChangeNameBs = () => {
    showOverlay(<ChangeNameForm />);
  };

  return (
    <Page statusBarColor={colors.surface}>
      <View>
        <TextView
          text={t('settings')}
          type="headline-medium"
          style={_titleStyle}
        />
        <Spacer height={spacing.extraLarge} />
        {/* Edit Profile */}
        <SettingsItem
          label={t('edit_profile')}
          iconName={'person'}
          iconSource={'material-icons'}
          onPress={showChangeNameBs}
        />
        {/* Notification */}
        <SettingsItem
          label={t('notification')}
          iconName={'notifications'}
          iconSource={'material-icons'}
          onPress={function (): void {}}
        />
        {/* Appearance */}
        <SettingsItem
          label={t('appearance')}
          iconName={'remove-red-eye'}
          iconSource={'material-icons'}
          onPress={function (): void {}}
        />
        {/* Help Support */}
        <SettingsItem
          label={t('help_support')}
          iconName={'headset'}
          iconSource={'material-icons'}
          onPress={function (): void {}}
        />
        {/* About */}
        <SettingsItem
          label={t('about')}
          iconName={'help'}
          iconSource={'material-icons'}
          onPress={function (): void {}}
        />
        <Spacer height={spacing.extraLarge} />
        {/* Delete Account */}
        <SettingsItem
          label={t('delete_account')}
          iconName={'delete'}
          iconSource={'material-icons'}
          isNegative
          onPress={showDeleteAccBs}
        />
        <SettingsItem
          label={t('sign_out')}
          iconName={'logout'}
          iconSource={'material-icons'}
          isNegative
          onPress={showConfirmBs}
        />
      </View>
    </Page>
  );
};

export default SettingsTab;
