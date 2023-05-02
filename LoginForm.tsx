import React, { FunctionComponent } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

type LoginFormProps = {
    onClick: () => any
}

const LoginForm: FunctionComponent<LoginFormProps> = ({onClick}) => {
    const [username, setUsername] = React.useState('Useless Text');
    const [password, setPassword] = React.useState('');

    const submitHandler = () => {
        onClick()
    }

    return (
        <>
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="useless placeholder"
                keyboardType="visible-password"
            />
            <Button
                onPress={submitHandler}
                title="Login"
                // color="#841584"
                // accessibilityLabel="Learn more about this purple button"
            />
        </SafeAreaView>
        </>
    );
}


export default LoginForm