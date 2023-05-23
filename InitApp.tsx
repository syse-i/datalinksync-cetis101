import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyTabs } from './TabsNavigation';
import { SignUpScreen } from './Screens/SignUpScreen';
import * as Network from 'expo-network';
import { AuthContext, AuthDispatchContext, authReducer } from './context/ContextLogin';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator()

const InitApp = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [auth, dispatch] = React.useReducer(authReducer, { key: null });

    const checkNetworkConnection = React.useCallback(async () => {
        const network = await Network.getNetworkStateAsync()
        dispatch({ type: 'setNetwork', network })
        const value = await SecureStore.getItemAsync('username');
        dispatch({ type: 'changed', key: value });
        setIsLoading(false)

    }, [dispatch])

    React.useEffect(() => {
        if (isLoading) {
            // TODO: revisar como hacer para constantemente revisar si existe coneccion a internet
            checkNetworkConnection()
        }
    }, [isLoading])

    if (isLoading) <>Loading...</>

    return (
        <AuthContext.Provider value={auth}>
            <AuthDispatchContext.Provider value={dispatch}>
                <NavigationContainer independent>
                    <Stack.Navigator initialRouteName={auth?.key ? 'MyTab' : 'Login'}>
                        <Stack.Screen name='Login' component={SignUpScreen} options={{ headerShown: false }} />
                        <Stack.Screen name='MyTab' component={MyTabs} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    )
}

export default InitApp
