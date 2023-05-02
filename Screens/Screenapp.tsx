import { useEffect, useState } from 'react';
import {SectionList,StatusBar} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, TextInput, Button, DrawerLayoutAndroid, TouchableWithoutFeedback } from 'react-native';
import { Text, View } from 'react-native';


const styles = StyleSheet.create({
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

type RootStackParamList = {
    List: undefined;
    Details: { item: {id: string, name: string} };
};

type ListProps = NativeStackScreenProps<RootStackParamList, 'List'>
type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>

const getData = async () => {
    console.log("Consultando datos de la API...")
    const response = await fetch("http://192.168.1.247:8000/v1/CetisAlumnos/", {
        headers: {
            'Authorization': 'Token 3f9157e369bf10e89c5c23d56cb98013c0317c4c',
        }
    })
    return await response.json()
}

const markDataAsSync = async () => {
    console.log("Marcando la pagina API...")
    const response = await fetch("http://192.168.1.247:8000/v1/CetisAlumnos/mark_as_read/", {
        method: 'PATCH',
        headers: {
            'Authorization': 'Token 3f9157e369bf10e89c5c23d56cb98013c0317c4c',
        }
    })
    return await response.text()
}

export const ListScreen: React.FunctionComponent<ListProps> = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [data, setData] = useState(null)

    const callback = async () => {
        try {
            const newData = await getData()
            // concatenar objetos (merge)
            // almacenar en base de datos local
            setData(prevData =>({...prevData, ...newData}))
            console.log("Ahora me toca marcar la pagina como sincronizada", data)
            await markDataAsSync()
        } catch (error) {
            console.error(error)
            setIsError(true)
        }
    }    

    // Constructor
    useEffect(() => {
        console.log("Me estoy ejecutando")

        callback().then(() => {
            setIsLoading(false)
        })
    }, [])

    if (isLoading) return <Text>Cargando datos...</Text>
    if (isError) return <Text>Error...</Text>

    console.log("Datos?",data)

    const onPressHandler = (item: {id: string, name: string}) => {
        return function () {
            //Esto hace navegacion a detalle y agarra las propiedades de item y lo deposita en item gracias a {'item':item}
            return navigation.navigate('Details', { 'item': item })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={[{
                    title: 'CetisAlumnos', 
                    data: data.results //data.results.map(obj => obj.name)
                }]}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    //El touchableWithouFeedback tiene la misma funcion que un botono sin la necesidad de ser un boton
                    <TouchableWithoutFeedback onPress={onPressHandler(item)}>
                        <View style={styles.item}>
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </SafeAreaView>
    );
}

export const DetailsScreen: React.FunctionComponent<DetailsProps> = ({ route }) => {
    const { item } = route.params

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen {item.name}</Text>
        </View>
    );
}