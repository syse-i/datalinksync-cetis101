import { StyleSheet, StatusBar } from "react-native";

export const stylesLoginForm = StyleSheet.create({
    input: {
        width: 250,
        height: 40,
        margin: 15,
        backgroundColor: '#fff',
        padding: 10,
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
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
});

