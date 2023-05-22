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
        padding: 20,
        marginVertical: 4,
        borderWidth: 0.2,
        borderColor: 'black',
        borderRadius: 7,
        
    },
    title: {
        fontSize: 18,
    },
});

export const stylesHomeDitails = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 10,
        textAlign: 'center'
    },
    container_name: {
        backgroundColor: '#fff',
        padding: 55,
        marginVertical: 10,
        marginHorizontal: 10,
        shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity:  0.20,
          shadowRadius: 5.62,
          elevation: 8,
          borderRadius:5,
    },

    title_number: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    container_number: {
        backgroundColor: '#fff',
        borderRadius:10,
        padding: 30,
        marginVertical: 5,
        marginHorizontal: 10,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity:  0.20,
        shadowRadius: 5.62,
        elevation: 8
    },

});

