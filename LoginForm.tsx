import { FunctionComponent, useState } from 'react';
import { SafeAreaView, TextInput, Button, View, Text } from 'react-native';
import { stylesLoginForm } from './styles/Styles';
import { FontAwesome, Ionicons } from '@expo/vector-icons';


export type LoginFormProps = {
    onClick: (username: string, password: string) => any
}

const LoginForm: FunctionComponent<LoginFormProps> = ({ onClick }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async () => {
        await onClick(username, password)
    }

    return (
        <>
            <SafeAreaView>
                <View style={{ alignItems: 'center', marginBottom: 100 }}>
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