import LoginForm from "../LoginForm";
import { View } from "react-native";

export function SignUpScreen({ navigation }) {
    const clickHandler = () => navigation.navigate('Home')

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LoginForm onClick={clickHandler} />
        </View>
    );
}