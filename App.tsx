import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import ThemeProvider from './src/presentation/provider/ThemeProvider';
import HomeScreen from './src/presentation/screens/home/tabs/DashboardTab';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import OverlayProvider from './src/presentation/provider/OverlayProvider';
import AppNavigator from './src/presentation/navigations/AppNavigator';
import AuthProvder from './src/presentation/provider/AuthProvder';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <OverlayProvider>
          <AuthProvder>
            <AppNavigator />
          </AuthProvder>
        </OverlayProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
