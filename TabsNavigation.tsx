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
  // const [isLoading, setIsLoading] = React.useState(true)
  // const [auth, dispatch] = React.useReducer(authReducer, { key: null });

  // const checkNetworkConnection = React.useCallback(async () => {
  //   if (isLoading) {
  //     const network = await Network.getNetworkStateAsync()
  //     dispatch({ type: 'setNetwork', network })
  //     setIsLoading(false)
  //   }
  // }, [isLoading])

  // React.useEffect(() => {
  //   // TODO: revisar como hacer para constantemente revisar si existe coneccion a internet
  //   checkNetworkConnection()
  // }, [])

  // if (isLoading) <>Loading...</>
  // console.log('tab')
  // return (
  //   <AuthContext.Provider value={auth}>
  //     <AuthDispatchContext.Provider value={dispatch}>
  //       <Tab.Navigator initialRouteName={'SignUp'}>
  //         <Tab.Screen name="Home" component={HomeScreen} />
  //         <Tab.Screen name="Settings" component={SettingsScreen} />
  //       </Tab.Navigator>
  //     </AuthDispatchContext.Provider>
  //   </AuthContext.Provider>
  // );
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'list'
        } else if (route.name === 'Settings') {
          iconName = 'sound-mix'
        }

        // You can return any component that you like here!
        return <Entypo name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}