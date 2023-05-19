import { StyleSheet, StatusBar } from "react-native";

export const stylesLoginForm = StyleSheet.create({
    input: {
        width: 280,
        height: 50,
        marginVertical: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
    },
});

export const stylesApp = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },
    item: {
        padding: 15,
        marginVertical: 4,
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
    },
});

