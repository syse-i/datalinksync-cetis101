import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import LoginForm from "../LoginForm";
import { AuthDispatchContext, AuthContext } from '../context/ContextLogin';
import * as SecureStore from 'expo-secure-store';

import type { LoginFormProps } from '../LoginForm'

import { REACT_APP_HOST_API } from "@env"

export function SignUpScreen({ navigation }) {
    const auth = useContext(AuthContext)
    const dispatch = useContext(AuthDispatchContext)

    useEffect(() => {
        if (!!auth?.key) {
            navigation.navigate('MyTab');
        }
    }, [auth])

    const clickHandler: LoginFormProps["onClick"] = async (username, password) => {
        const req = await fetch(`${REACT_APP_HOST_API}/api-auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })

        if (req.ok) {
            const data = await req.json()
            await SecureStore.setItemAsync('username', data.key);
            dispatch({ type: 'changed', key: data.key })
            return navigation.navigate('MyTab')
        } else {
            console.error(await req.text())
            alert("error")
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LoginForm onClick={clickHandler} />
        </View>
    );
}

