import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {ParamNavigator} from './ParamNavigator';
import SplashScreen from '../screens/splash/SplashScreen';
import OnBoardingScreen from '../screens/onboarding/OnBoardingScreen';
import AuthenticationScreen from '../screens/authentication/AuthenticationScreen';
import HomeTabNavigator from '../screens/home/HomeScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ManagementTransactionScreen from '../screens/managementTransaction/ManagementTransactionScreen';
import TransactionHistoryScreen from '../screens/transactionHistory/TransactionHistoryScreen';

// Make stack navigation
const Stack = createStackNavigator<ParamNavigator>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
        <Stack.Screen name="Authentication" component={AuthenticationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="ManagementTransaction"
          component={ManagementTransactionScreen}
        />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistoryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
