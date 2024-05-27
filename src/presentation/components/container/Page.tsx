import {View, Platform, StatusBar, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import {useTheme} from '../../provider/ThemeProvider';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

// Make alias for page props
interface PageProps {
  statusBarColor?: string;
  children: React.ReactNode;
}
const Page = ({statusBarColor, children}: PageProps) => {
  //Get theme
  const {colors, colorScheme} = useTheme();

  // Init Status bar color
  const statusBarBackgroundColor: string = statusBarColor ?? colors.surface;

  // Get color scheme
  const isLight = colorScheme == 'light';

  // Get safe area inset top
  const safeAreaInsetTop = useSafeAreaInsets().top;

  // Costumize status bar
  const CustomStatusBar = ({backgroundColor, ...props}: any) => (
    <>
      {Platform.OS === 'ios' ? (
        <View
          style={[
            {
              height: safeAreaInsetTop,
            },
            {backgroundColor},
          ]}>
          <SafeAreaView
            style={{
              flex: 1,
              paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
            }}>
            <StatusBar
              backgroundColor={'rgba(255, 255, 255, 0)'}
              barStyle={isLight ? 'dark-content' : 'light-content'}
              {...props}
            />
          </SafeAreaView>
        </View>
      ) : (
        <StatusBar
          backgroundColor={backgroundColor}
          barStyle={isLight ? 'dark-content' : 'light-content'}
          {...props}
        />
      )}
    </>
  );

  return (
    <>
      <CustomStatusBar backgroundColor={statusBarColor ?? colors.surface} />

      <SafeAreaView style={{flex: 1, backgroundColor: colors.surface}}>
        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={
              Platform.OS === 'ios' ? useSafeAreaInsets().top : 0
            }
            style={Platform.OS === 'ios' && {flex: 1}}>
            {children}
          </KeyboardAvoidingView>
        ) : (
          <>{children}</>
        )}
      </SafeAreaView>
    </>
  );
};

export default Page;
