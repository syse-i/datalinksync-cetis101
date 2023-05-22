import React, { FunctionComponent, useContext, useEffect } from 'react';
import { SafeAreaView, TextInput, Button, View, Text } from 'react-native';
import { stylesLoginForm } from './styles/Styles';
import * as SecureStore from 'expo-secure-store';
import { AuthDispatchContext } from './context/ContextLogin';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
<FontAwesome name="unlock-alt" size={24} color="black" />

type LoginFormProps = {
    onClick: (username: string, password: string) => any
}

const LoginForm: FunctionComponent<LoginFormProps> = ({ onClick }) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [isError, setIsError] = React.useState(false)
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const dispatch = useContext(AuthDispatchContext)

    const getValueFor = async () => {
        let result = await SecureStore.getItemAsync('username');
        if (result) {
            dispatch({ type: 'changed', key: result })
            setIsLoading(false)
        } else {
            // TODO: revisar que hacer con esto cuando sucede un error
            setIsError(true)
        }
    }
    useEffect(() => {
        // if(isLoading) {
        getValueFor()
        // }
    }, [isLoading])

    const submitHandler = async () => {
        await onClick(username, password)
    }

    // if (isLoading) return <Text>Cargando datos...</Text>
    // if (isError) return <Text>Error...</Text>

    return (
        <>
            <SafeAreaView>
                <View style={{alignItems:'center', marginBottom:100}}>
                    <FontAwesome name="unlock-alt" size={100} color="black" />
                </View>
                <Text><Ionicons name="mail-open-sharp" size={24} color="black" />   Email</Text>
                <TextInput
                    style={stylesLoginForm.input}
                    onChangeText={setUsername}
                    value={username}
                />
                <Text><FontAwesome name="unlock" size={24} color="black" />  Contraseña</Text>
                <TextInput
                    secureTextEntry={true}
                    style={stylesLoginForm.input}
                    onChangeText={setPassword}
                    value={password}
                />
                <View style={{ marginTop: 15, padding: 20 }}>
                    <Button
                        onPress={submitHandler}
                        title="Acceder"
                        color={'black'}
                    />
                </View>
            </SafeAreaView>
        </>
    );
}

export default LoginForm