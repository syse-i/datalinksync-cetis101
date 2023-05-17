import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SignUpScreen } from './Screens/SignUpScreen';
import { HomeScreen } from './Screens/HomeScreen';
import { SettingsScreen } from './Screens/SettingScreen';
import { AuthContext, AuthDispatchContext, authReducer } from './context/ContextLogin';
import * as SecureStore from 'expo-secure-store';

export const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  const [auth, dispatch] = React.useReducer(authReducer, { key: null });
  
  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        <Tab.Navigator initialRouteName={'SignUp'}>
          <Tab.Screen name="Home" component={HomeScreen} />
          {!auth.key && (
            <Tab.Screen name="SignUp" component={SignUpScreen} />
          )}
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}