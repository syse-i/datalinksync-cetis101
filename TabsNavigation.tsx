import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SignUpScreen } from './Screens/SignUpScreen';
import { HomeScreen } from './Screens/HomeScreen';
import { SettingsScreen } from './Screens/SettingScreen';
import { AuthContext, AuthDispatchContext, authReducer } from './context/ContextLogin';
import * as Network from 'expo-network';
import { Entypo } from '@expo/vector-icons';

export const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Alumnos') {
          iconName = 'list'
        } else if (route.name === 'Configuracion') {
          iconName = 'sound-mix'
        }

        // You can return any component that you like here!
        return <Entypo name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="Alumnos" component={HomeScreen} />
      <Tab.Screen name="Configuracion" component={SettingsScreen} />
    </Tab.Navigator>
  )
}