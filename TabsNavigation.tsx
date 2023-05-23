import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './Screens/HomeScreen';
import { SettingsScreen } from './Screens/SettingScreen';
import { Entypo } from '@expo/vector-icons';

export const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: 'list' | 'sound-mix';

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