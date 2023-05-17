import React, { FunctionComponent, useContext, useEffect } from 'react';
import { SafeAreaView, TextInput, Button, View, Text} from 'react-native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { stylesLoginForm } from './styles/Styles';
import { REACT_APP_HOST_API } from "@env"
import * as SecureStore from 'expo-secure-store';
import { AuthContext, AuthDispatchContext } from './context/ContextLogin';


type LoginFormProps = {
    onClick: (username: string, password: string) => any
}

const LoginForm: FunctionComponent<LoginFormProps> = ({ onClick }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const auth = useContext(AuthContext)
    const dispatch = useContext(AuthDispatchContext)

    const getValueFor = async () => {
        let result = await SecureStore.getItemAsync('username');
        if (result) {
            alert("key " + result);
            dispatch({type: 'changed', key: result})
            return 
        } else {
            alert("No values stored under that key.");
        }
    }
    useEffect(()=>{
        getValueFor()
    },[])

    const submitHandler = () => {
        onClick(username, password)
    }

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
            const req = await fetch(`${REACT_APP_HOST_API}/api-auth/logout/`, { ...kwargs })
        } catch (e) {
            console.error(e)
        }
        finally {
            dispatch({ type: 'deleted' })
            SecureStore.setItemAsync('username', null);
        }
    }
    return (
        <>
            <SafeAreaView>
                <TextInput
                    style={stylesLoginForm.input}
                    onChangeText={setUsername}
                    value={username}
                />
                <TextInput
                    secureTextEntry={true}
                    style={stylesLoginForm.input}
                    onChangeText={setPassword}
                    value={password}
                />
                <Button
                    onPress={submitHandler}
                    title="Login"
                // color="#841584"
                // accessibilityLabel="Learn more about this purple button"
                />
                <View style={{ marginTop: 20 }}>
                    <Button
                        onPress={logoutHandler}
                        title="Logout"
                    // color="#841584"
                    // accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </SafeAreaView>
        </>
    );
}

export default LoginForm