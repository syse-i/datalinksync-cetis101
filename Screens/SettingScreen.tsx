import { Text } from "react-native";
import { useContext, } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from '../LoginForm'
import { View, Button } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { AuthContext, AuthDispatchContext } from "../context/ContextLogin";
import { REACT_APP_HOST_API } from "@env"




export const SettingsScreen = ({ navigation }) => {
    const auth = useContext(AuthContext)
    const dispatch = useContext(AuthDispatchContext)

    const logoutHandler = async () => {
        try {
            let kwargs = { method: 'POST', headers: {} }

            if (!!auth?.key) {
                kwargs = {
                    ...kwargs, headers: {
                        'Authorization': `Token ${auth?.key}`
                    }
                }
            }
            console.log("LOGOUT", kwargs)
            await fetch(`${REACT_APP_HOST_API}/api-auth/logout/`, { ...kwargs })
        } catch (e) {
            console.error(e)
        }
        finally {
            dispatch({ type: 'deleted' })
            await SecureStore.deleteItemAsync('username');
            navigation.navigate('Login')
        }
    }
    return (
        <View style={{ margin: 30 }}>
            <Button
                title="Logout"
                onPress={logoutHandler}
            />
        </View>
    )
}