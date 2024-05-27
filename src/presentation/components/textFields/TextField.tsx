import {
  View,
  Text,
  TextInputBase,
  TextInput,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
  InputModeOptions,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../provider/ThemeProvider';
import IconView, {IconSource} from '../icons/IconView';
import Spacer from '../spacer/Spacer';
import TextView from '../textViews/TextView';
import Ripple from 'react-native-material-ripple';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// Make type for text filed input
type TextFieldInputType =
  | 'free-text'
  | 'password'
  | 'number'
  | 'email'
  | 'username';

// Make alias for text filed props
interface TextFieldProps {
  value: string;
  inputType?: TextFieldInputType;
  label: string;
  placeholder: string;
  leadingIconName?: string;
  leadingIconSource?: IconSource;
  trailingIconName?: string;
  trailingIconSource?: IconSource;
  width?: number;
  required?: boolean;
  multiline?: boolean;
  maxCharInput?: number;
  errorMessage?: string;
  disabled?: boolean;
  readonly?: boolean;
  editable?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmit?: () => void;
  onTrailingIconPress?: () => void;
}
// Make text field
const TextField = ({
  value,
  inputType,
  label,
  placeholder,
  leadingIconName,
  leadingIconSource,
  trailingIconName,
  trailingIconSource,
  width,
  required,
  multiline,
  maxCharInput,
  errorMessage,
  disabled,
  readonly,
  editable,
  onChange,
  onFocus,
  onBlur,
  onSubmit,
  onTrailingIconPress,
}: TextFieldProps) => {
  // Get theme from provider
  const {colors, spacing, radius, typography} = useTheme();

  // Init focussed state
  const [_focussed, _setFocussed] = useState<boolean>(false);

  // Init state password visibility
  const [_passwordVisible, _setPasswordVisible] = useState<boolean>(false);

  // Init text length state
  const [_textLength, _setTextLength] = useState<number>(0);

  // Init input type
  const _inputType: TextFieldInputType = inputType ?? 'free-text';

  // Init disabled
  const _disabled: boolean = disabled ?? false;

  // Init readonly
  const _readonly: boolean = readonly ?? false;

  // Init required
  const _required: boolean = required ?? false;

  // Init multiline
  const _multiline: boolean = multiline ?? false;

  // Init max char
  const _maxChar: number | undefined = maxCharInput ?? undefined;

  // Init container style
  const _containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
    width: width ?? '100%',
    height: _multiline ? 160 : 56,
    paddingHorizontal: spacing.medium,
    borderRadius: radius.small,
    backgroundColor: errorMessage ? colors.errorSurface : colors.primarySurface,
    borderWidth: _focussed ? 1 : 0,
    borderColor: errorMessage ? colors.error : colors.secondary,
  };

  // Init base style
  const _baseStyle: ViewStyle = {
    width: _containerStyle.width,
  };

  // Init label container style
  const _labelContainerStyle: ViewStyle = {
    flexDirection: 'row',
  };

  // Init label style
  const _labelStyle: TextStyle = typography.titleSmall;

  // Init required mark style
  const _requiredMarkStyle: TextStyle = {
    ...typography.titleSmall,
    color: colors.error,
  };

  // Init text style
  const _textStyle: TextStyle = {
    ...typography.bodyLarge,
    ...{
      flex: 1,
      height: multiline ? '100%' : undefined,
      textAlignVertical: multiline ? 'top' : undefined,
      marginTop: spacing.extraSmall,
      color: errorMessage ? colors.onErrorSurface : colors.onPrimarySurface,
    },
  };

  // Init leading icon source
  const _leadingIconSource: IconSource = leadingIconSource ?? 'material-icons';

  // Init leading icon size
  const _leadingIconSize: number = 24;

  // Init leading icon color
  const _leadingIconColor: string = errorMessage
    ? colors.onErrorSurface
    : _focussed
    ? colors.secondary
    : colors.onPrimarySurface;

  // Init trailing icon source
  const _trailingIconSource: IconSource =
    trailingIconSource ?? 'material-icons';

  // Init trailing icon size
  const _trailingIconSize: number = 24;

  // Init trailing icon color
  const _trailingIconColor: string = errorMessage
    ? colors.onErrorSurface
    : _focussed
    ? colors.secondary
    : colors.onPrimarySurface;

  // Init trailing icon ripple style
  const _trailingIconRippleStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    height: _trailingIconSize + 4,
    width: _trailingIconSize + 4,
  };

  // Init error message style
  const _errorMessageStyle: TextStyle = {
    ...typography.bodySmall,
    color: colors.error,
  };

  // Init input mode
  const _inputMode: InputModeOptions =
    inputType == 'number' ? 'numeric' : inputType == 'email' ? 'email' : 'text';

  // Init text counter style
  const _textCounterStyle: TextStyle = {
    ...typography.labelLarge,
    color: errorMessage ? colors.errorSurface : colors.primarySurface,
    width: '100%',
    textAlign: 'right',
  };

  // Handle onFocus
  const _onFocusHandler = () => {
    _setFocussed(true);
    if (onFocus) {
      onFocus();
    }
  };

  // Handle onBlur
  const _onBlurHandler = () => {
    _setFocussed(false);
    if (onBlur) {
      onBlur();
    }
  };

  // Handle on trailing icon press
  const _onTrailingIconPressHandler = () => {
    if (inputType == 'password') {
      _setPasswordVisible(prevVisibility => !prevVisibility);
    }
    if (onTrailingIconPress) {
      onTrailingIconPress();
    }
  };

  // Handle on change
  const _onChangeHandler = (value: string) => {
    if (maxCharInput) {
      _setTextLength(value.length);
    }
    if (onChange) {
      onChange(value);
    }
  };

  // Handle on change
  const _onSubmitHandler = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <View style={_baseStyle}>
      <View style={_labelContainerStyle}>
        <TextView text={label} style={_labelStyle} />
        {required && <TextView text="*" style={_requiredMarkStyle} />}
      </View>
      <Spacer height={spacing.extraSmall} />
      <View style={_containerStyle}>
        {!multiline && leadingIconName && (
          <IconView
            name={leadingIconName}
            source={_leadingIconSource}
            size={_leadingIconSize}
            color={_leadingIconColor}
          />
        )}
        <Spacer width={spacing.small} />
        <TextInput
          value={value}
          placeholder={placeholder}
          // placeholderTextColor={colors.tertiarySurface}
          style={_textStyle}
          inputMode={_inputMode}
          secureTextEntry={inputType == 'password' && !_passwordVisible}
          multiline={_multiline}
          maxLength={_maxChar}
          onFocus={_onFocusHandler}
          onBlur={_onBlurHandler}
          onChangeText={_onChangeHandler}
          onSubmitEditing={onSubmit}
          readOnly={readonly}
          editable={editable}
          keyboardType={inputType == 'number' ? 'numeric' : 'default'}
        />
        {trailingIconName ||
          (inputType == 'password' && !multiline && (
            <Ripple
              style={_trailingIconRippleStyle}
              onPress={_onTrailingIconPressHandler}>
              <IconView
                name={
                  trailingIconName ?? _passwordVisible
                    ? 'visibility-off'
                    : 'visibility'
                }
                source={_trailingIconSource}
                size={_trailingIconSize}
                color={_trailingIconColor}
              />
            </Ripple>
          ))}
      </View>
      {maxCharInput && <Spacer height={spacing.extraSmall} />}
      {maxCharInput && (
        <TextView
          text={`${_textLength}/${maxCharInput}`}
          style={_textCounterStyle}
        />
      )}

      {errorMessage && <Spacer height={spacing.extraSmall} />}
      {errorMessage && (
        <TextView text={errorMessage} style={_errorMessageStyle} />
      )}
    </View>
  );
};

export default TextField;
