import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {SignUpScreen } from './Screens/SignUpScreen';
import { HomeScreen } from './Screens/HomeScreen';
import { SettingsScreen } from './Screens/SettingScreen';

export const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="SignUp" component={SignUpScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}