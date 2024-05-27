import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ParamNavigator} from '../../navigations/ParamNavigator';
import {useTheme} from '../../provider/ThemeProvider';
import BottomNavBar from '../../components/navBars/BottomNavBar';
import {StackNavigationProp} from '@react-navigation/stack';
import InsightTab from './tabs/InsightTab';
import PlanningTab from './tabs/PlanningTab';
import DashboardTab from './tabs/DashboardTab';
import SettingsTab from './tabs/SettingsTab';
import {useOverlay} from '../../provider/OverlayProvider';
import RegisterForm from '../authentication/RegisterForm';
import {useNavigation} from '@react-navigation/native';

// Make Tab navigator
const Tab = createBottomTabNavigator();

// Get navigation props alias
export type HomeScreenNavigationProp = StackNavigationProp<
  ParamNavigator,
  'Home'
>;

const HomeScreen = () => {
  // Get theme
  const {colors, spacing, radius} = useTheme();

  // Get overlay
  const {showOverlay} = useOverlay();

  // Get navigation
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Handle on add transaction
  const onAddTransaction = () => {
    navigation.navigate('ManagementTransaction', {});
  };

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={({state, descriptors, navigation}) => (
        <BottomNavBar
          state={state}
          descriptors={descriptors}
          navigation={navigation}
          onAddPress={onAddTransaction}
        />
      )}>
      <Tab.Screen name="Dashboard" component={DashboardTab} />
      <Tab.Screen name="Planning" component={PlanningTab} />
      <Tab.Screen name="Insight" component={InsightTab} />
      <Tab.Screen name="Profile" component={SettingsTab} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
